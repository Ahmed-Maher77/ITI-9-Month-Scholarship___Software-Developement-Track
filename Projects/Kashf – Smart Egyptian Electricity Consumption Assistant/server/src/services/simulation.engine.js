import Simulation from "../../database/models/simulation.model.js";
import { computeTier, computeBill } from "../config/tier.constants.js";
import { broadcast } from "./simulation.broadcaster.js";
import { autoPilotTick } from "./simulation.autopilot.js";

const TICK_RATE_MS = 1000;

const runtimes = new Map();

function createRuntime(simulationDoc) {
  return {
    simulationId: simulationDoc._id.toString(),
    config: simulationDoc.toObject(),
    totalKWh: 0,
    currentTier: 1,
    currentLoadW: 0,
    estimatedBill: 0,
    tickCount: 0,
    running: false,
    intervalRef: null,
    startedAt: null,
  };
}

function computeCircuitsLoad(config) {
  let total = 0;
  for (const circuit of config.circuits) {
    circuit.loadW = 0;
    for (const device of circuit.devices) {
      if (device.isOn) {
        circuit.loadW += device.wattage;
      }
    }
    total += circuit.loadW;
  }
  return total;
}

function tick(simulationId) {
  const rt = runtimes.get(simulationId);
  if (!rt || !rt.running) return;

  const totalWatts = computeCircuitsLoad(rt.config);
  const kWhThisTick = totalWatts / 3600;

  rt.totalKWh += kWhThisTick;
  rt.currentLoadW = totalWatts;
  rt.currentTier = computeTier(rt.totalKWh);
  rt.estimatedBill = computeBill(rt.totalKWh);
  rt.tickCount++;

  const apAction = autoPilotTick(simulationId, rt);
  if (apAction) {
    rt.currentLoadW = computeCircuitsLoad(rt.config);
    rt.estimatedBill = computeBill(rt.totalKWh);
  }

  broadcast(simulationId, {
    totalKWh: +rt.totalKWh.toFixed(4),
    currentTier: rt.currentTier,
    currentLoadW: rt.currentLoadW,
    estimatedBill: +rt.estimatedBill.toFixed(2),
    tickCount: rt.tickCount,
    running: true,
    startedAt: rt.startedAt,
    circuits: rt.config.circuits.map(c => ({
      _id: c._id,
      name: c.name,
      loadW: c.loadW || 0,
      deviceCount: c.devices.length,
      devicesOn: c.devices.filter(d => d.isOn).length,
    })),
    timestamp: new Date().toISOString(),
  });
}

export async function ensureLoaded(simulationId) {
  if (runtimes.has(simulationId)) return;
  const doc = await Simulation.findById(simulationId);
  if (!doc) throw new Error("Simulation not found");
  runtimes.set(simulationId, createRuntime(doc));
}

export async function startSimulation(simulationId) {
  await ensureLoaded(simulationId);
  const rt = runtimes.get(simulationId);
  if (rt.running) return;

  rt.running = true;
  rt.startedAt = new Date();
  rt.intervalRef = setInterval(() => tick(simulationId), TICK_RATE_MS);
}

export function pauseSimulation(simulationId) {
  const rt = runtimes.get(simulationId);
  if (!rt || !rt.running) return;
  rt.running = false;
  clearInterval(rt.intervalRef);
  rt.intervalRef = null;
}

export function resetSimulation(simulationId) {
  const rt = runtimes.get(simulationId);
  if (!rt) return;
  pauseSimulation(simulationId);
  rt.totalKWh = 0;
  rt.currentTier = 1;
  rt.currentLoadW = 0;
  rt.estimatedBill = 0;
  rt.tickCount = 0;
  rt.startedAt = null;
}

export function syncConfig(simulationId, config) {
  const rt = runtimes.get(simulationId);
  if (rt) rt.config = config;
}

export function removeSimulation(simulationId) {
  const rt = runtimes.get(simulationId);
  if (rt) {
    clearInterval(rt.intervalRef);
    runtimes.delete(simulationId);
  }
}

export function getRuntimeState(simulationId) {
  const rt = runtimes.get(simulationId);
  if (!rt) return null;
  return {
    totalKWh: +rt.totalKWh.toFixed(4),
    currentTier: rt.currentTier,
    currentLoadW: rt.currentLoadW,
    estimatedBill: +rt.estimatedBill.toFixed(2),
    tickCount: rt.tickCount,
    running: rt.running,
    startedAt: rt.startedAt,
  };
}
