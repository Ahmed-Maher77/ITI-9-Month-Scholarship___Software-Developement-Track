import { computeBill } from "../config/tier.constants.js";
import Simulation from "../../database/models/simulation.model.js";
import { broadcast } from "./simulation.broadcaster.js";

const TICKS_PER_MONTH = 2592000;

function findBestDeviceOff(config) {
  let best = null;
  for (const circuit of config.circuits) {
    for (const device of circuit.devices) {
      if (device.isOn && !device.essential) {
        if (!best || device.wattage > best.wattage) {
          best = { ...device, circuitName: circuit.name };
        }
      }
    }
  }
  return best;
}

export function autoPilotTick(simulationId, rt) {
  if (!rt.config.autoPilot?.enabled) return null;

  const goalKwh = rt.config.consumptionGoal?.monthlyKwhLimit;
  if (!goalKwh) return null;

  const kWhThisTick = rt.currentLoadW / 3600;
  const remainingTicks = TICKS_PER_MONTH - rt.tickCount;
  const projectedKwh = rt.totalKWh + kWhThisTick * remainingTicks;

  if (projectedKwh <= goalKwh) return null;

  const target = findBestDeviceOff(rt.config);
  if (!target) return null;

  for (const circuit of rt.config.circuits) {
    for (const device of circuit.devices) {
      if (device._id.toString() === target._id.toString()) {
        device.isOn = false;
        break;
      }
    }
  }

  rt.config.autoPilot.actionsTaken = (rt.config.autoPilot.actionsTaken || 0) + 1;

  Simulation.findById(simulationId).then(doc => {
    if (!doc) return;
    for (const circuit of doc.circuits) {
      const dev = circuit.devices.id(target._id);
      if (dev) { dev.isOn = false; break; }
    }
    doc.autoPilot.actionsTaken = rt.config.autoPilot.actionsTaken;
    return doc.save();
  }).catch(() => {});

  const action = {
    action: "turned_off",
    device: target.name,
    circuit: target.circuitName,
    wattage: target.wattage,
    reason: `projected_${+projectedKwh.toFixed(1)}kWh_exceeds_goal_${goalKwh}kWh`,
  };

  broadcast(simulationId, { event: "auto-pilot", ...action });

  return action;
}

export function getAutoPilotStatus(config) {
  if (!config.autoPilot?.enabled) {
    return { enabled: false };
  }
  return {
    enabled: true,
    startedAt: config.autoPilot.startedAt,
    actionsTaken: config.autoPilot.actionsTaken || 0,
    goal: config.consumptionGoal || {},
  };
}
