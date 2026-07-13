import asyncHandler from "../middlewares/asyncHandler.js";
import AppError from "../utils/AppError.js";
import Simulation from "../../database/models/simulation.model.js";
import User from "../../database/models/user.model.js";
import * as engine from "../services/simulation.engine.js";
import { getAdvice } from "../services/simulation.advisor.js";
import { getPrediction } from "../services/simulation.predictor.js";
import { getWhatIf } from "../services/simulation.whatif.js";
import { chat } from "../services/simulation.chat.js";
import { getAutoPilotStatus } from "../services/simulation.autopilot.js";
import { getRecommendations } from "../services/simulation.recommender.js";
import { addClient } from "../services/simulation.broadcaster.js";
import { deductCoins } from "../services/coin.service.js";
import { runWithUserLock } from "../utils/userLock.js";

const DEFAULT_CIRCUITS = [
  {
    name: "Kitchen",
    devices: [
      { name: "Refrigerator", wattage: 200, isOn: true },
      { name: "Microwave", wattage: 1200, isOn: false },
      { name: "Blender", wattage: 300, isOn: false },
    ],
  },
  {
    name: "Living Room",
    devices: [
      { name: "AC Unit", wattage: 2200, isOn: false },
      { name: "TV", wattage: 150, isOn: false },
      { name: "Lights", wattage: 100, isOn: false },
    ],
  },
  {
    name: "Bedroom",
    devices: [
      { name: "AC Unit", wattage: 1500, isOn: false },
      { name: "Fan", wattage: 75, isOn: false },
      { name: "Lights", wattage: 80, isOn: false },
    ],
  },
  {
    name: "Bathroom",
    devices: [
      { name: "Water Heater", wattage: 1500, isOn: false },
      { name: "Washing Machine", wattage: 500, isOn: false },
      { name: "Lights", wattage: 60, isOn: false },
    ],
  },
  {
    name: "Office",
    devices: [
      { name: "PC", wattage: 300, isOn: false },
      { name: "Monitor", wattage: 50, isOn: false },
      { name: "Router", wattage: 15, isOn: true },
      { name: "Lights", wattage: 40, isOn: false },
    ],
  },
];

function formatDoc(doc) {
  const obj = doc.toObject();
  obj.id = obj._id.toString();
  delete obj.__v;
  return obj;
}

// ─── CRUD ───────────────────────────────────────────────

export const createSimulation = asyncHandler(async (req, res) => {
  const { name, autoGenerate } = req.body;
  const circuits = autoGenerate
    ? DEFAULT_CIRCUITS.map(c => ({
        ...c,
        devices: c.devices.map(d => ({ ...d })),
      }))
    : [];

  const simulation = await Simulation.create({
    user: req.user.id,
    name,
    circuits,
  });

  res.status(201).json({ success: true, data: formatDoc(simulation) });
});

export const getSimulations = asyncHandler(async (req, res) => {
  const simulations = await Simulation.find({ user: req.user.id }).sort({ createdAt: -1 });
  const data = simulations.map(formatDoc).map(s => ({
    ...s,
    runtime: engine.getRuntimeState(s.id) || null,
  }));
  res.json({ success: true, data });
});

export const getSimulation = asyncHandler(async (req, res) => {
  const simulation = await Simulation.findById(req.params.id);
  if (!simulation) throw new AppError("Simulation not found", 404);
  if (simulation.user.toString() !== req.user.id) throw new AppError("Not authorized", 403);

  const doc = formatDoc(simulation);
  doc.runtime = engine.getRuntimeState(doc.id) || null;
  res.json({ success: true, data: doc });
});

export const deleteSimulation = asyncHandler(async (req, res) => {
  const simulation = await Simulation.findById(req.params.id);
  if (!simulation) throw new AppError("Simulation not found", 404);
  if (simulation.user.toString() !== req.user.id) throw new AppError("Not authorized", 403);

  engine.removeSimulation(simulation._id.toString());
  await simulation.deleteOne();
  res.json({ success: true, data: { id: req.params.id } });
});

// ─── Circuits ────────────────────────────────────────────

export const addCircuit = asyncHandler(async (req, res) => {
  const simulation = await Simulation.findById(req.params.id);
  if (!simulation) throw new AppError("Simulation not found", 404);
  if (simulation.user.toString() !== req.user.id) throw new AppError("Not authorized", 403);

  const { name, autoGenerate } = req.body;
  let devices = [];

  if (autoGenerate) {
    const template = DEFAULT_CIRCUITS.find(
      c => c.name.toLowerCase() === name.toLowerCase()
    );
    if (template) {
      devices = template.devices.map(d => ({ ...d }));
    }
  }

  simulation.circuits.push({ name, devices });
  await simulation.save();

  engine.syncConfig(simulation._id.toString(), simulation.toObject());
  res.status(201).json({ success: true, data: formatDoc(simulation) });
});

export const updateCircuit = asyncHandler(async (req, res) => {
  const simulation = await Simulation.findById(req.params.id);
  if (!simulation) throw new AppError("Simulation not found", 404);
  if (simulation.user.toString() !== req.user.id) throw new AppError("Not authorized", 403);

  const circuit = simulation.circuits.id(req.params.cid);
  if (!circuit) throw new AppError("Circuit not found", 404);

  if (req.body.name) circuit.name = req.body.name;
  await simulation.save();

  engine.syncConfig(simulation._id.toString(), simulation.toObject());
  res.json({ success: true, data: formatDoc(simulation) });
});

export const deleteCircuit = asyncHandler(async (req, res) => {
  const simulation = await Simulation.findById(req.params.id);
  if (!simulation) throw new AppError("Simulation not found", 404);
  if (simulation.user.toString() !== req.user.id) throw new AppError("Not authorized", 403);

  simulation.circuits.pull({ _id: req.params.cid });
  await simulation.save();

  engine.syncConfig(simulation._id.toString(), simulation.toObject());
  res.json({ success: true, data: formatDoc(simulation) });
});

// ─── Devices ─────────────────────────────────────────────

export const addDevice = asyncHandler(async (req, res) => {
  const simulation = await Simulation.findById(req.params.id);
  if (!simulation) throw new AppError("Simulation not found", 404);
  if (simulation.user.toString() !== req.user.id) throw new AppError("Not authorized", 403);

  const circuit = simulation.circuits.id(req.body.circuitId);
  if (!circuit) throw new AppError("Circuit not found", 404);

  circuit.devices.push({ name: req.body.name, wattage: req.body.wattage, isOn: false });
  await simulation.save();

  engine.syncConfig(simulation._id.toString(), simulation.toObject());
  res.status(201).json({ success: true, data: formatDoc(simulation) });
});

export const updateDevice = asyncHandler(async (req, res) => {
  const simulation = await Simulation.findById(req.params.id);
  if (!simulation) throw new AppError("Simulation not found", 404);
  if (simulation.user.toString() !== req.user.id) throw new AppError("Not authorized", 403);

  let found = false;
  for (const circuit of simulation.circuits) {
    const device = circuit.devices.id(req.params.did);
    if (device) {
      if (req.body.name !== undefined) device.name = req.body.name;
      if (req.body.wattage !== undefined) device.wattage = req.body.wattage;
      if (req.body.isOn !== undefined) device.isOn = req.body.isOn;
      if (req.body.essential !== undefined) device.essential = req.body.essential;
      found = true;
      break;
    }
  }
  if (!found) throw new AppError("Device not found", 404);

  await simulation.save();
  engine.syncConfig(simulation._id.toString(), simulation.toObject());
  res.json({ success: true, data: formatDoc(simulation) });
});

export const deleteDevice = asyncHandler(async (req, res) => {
  const simulation = await Simulation.findById(req.params.id);
  if (!simulation) throw new AppError("Simulation not found", 404);
  if (simulation.user.toString() !== req.user.id) throw new AppError("Not authorized", 403);

  for (const circuit of simulation.circuits) {
    const device = circuit.devices.id(req.params.did);
    if (device) {
      device.deleteOne();
      break;
    }
  }
  await simulation.save();

  engine.syncConfig(simulation._id.toString(), simulation.toObject());
  res.json({ success: true, data: formatDoc(simulation) });
});

// ─── Engine Control ─────────────────────────────────────

export const startSimulation = asyncHandler(async (req, res) => {
  const simulation = await Simulation.findById(req.params.id);
  if (!simulation) throw new AppError("Simulation not found", 404);
  if (simulation.user.toString() !== req.user.id) throw new AppError("Not authorized", 403);

  await engine.startSimulation(simulation._id.toString());
  const state = engine.getRuntimeState(simulation._id.toString());
  res.json({ success: true, data: state });
});

export const pauseSimulation = asyncHandler(async (req, res) => {
  const simulation = await Simulation.findById(req.params.id);
  if (!simulation) throw new AppError("Simulation not found", 404);
  if (simulation.user.toString() !== req.user.id) throw new AppError("Not authorized", 403);

  engine.pauseSimulation(simulation._id.toString());
  const state = engine.getRuntimeState(simulation._id.toString());
  res.json({ success: true, data: state });
});

export const resetSimulation = asyncHandler(async (req, res) => {
  const simulation = await Simulation.findById(req.params.id);
  if (!simulation) throw new AppError("Simulation not found", 404);
  if (simulation.user.toString() !== req.user.id) throw new AppError("Not authorized", 403);

  engine.resetSimulation(simulation._id.toString());
  const state = engine.getRuntimeState(simulation._id.toString());
  res.json({ success: true, data: { ...formatDoc(simulation), runtime: state } });
});

// ─── AI Advisor ────────────────────────────────────────────

export const adviseSimulation = asyncHandler(async (req, res) => {
  const simulation = await Simulation.findById(req.params.id);
  if (!simulation) throw new AppError("Simulation not found", 404);
  if (simulation.user.toString() !== req.user.id) throw new AppError("Not authorized", 403);

  const result = await getAdvice(simulation._id.toString());
  res.json({ success: true, data: result });
});

// ─── Tier Prediction ──────────────────────────────────────

export const predictSimulation = asyncHandler(async (req, res) => {
  const simulation = await Simulation.findById(req.params.id);
  if (!simulation) throw new AppError("Simulation not found", 404);
  if (simulation.user.toString() !== req.user.id) throw new AppError("Not authorized", 403);

  const runtime = engine.getRuntimeState(simulation._id.toString());
  const prediction = getPrediction(runtime);
  res.json({ success: true, data: prediction });
});

// ─── What-If Simulation ───────────────────────────────────

export const whatIfSimulation = asyncHandler(async (req, res) => {
  const simulation = await Simulation.findById(req.params.id);
  if (!simulation) throw new AppError("Simulation not found", 404);
  if (simulation.user.toString() !== req.user.id) throw new AppError("Not authorized", 403);

  const result = await getWhatIf(simulation._id.toString(), req.body);
  res.json({ success: true, data: result });
});

// Idempotency cache for chat messages
const processedMessages = new Map();
const IDEMPOTENCY_CLEANUP_INTERVAL = 5 * 60 * 1000; // 5 minutes

setInterval(() => {
  const now = Date.now();
  for (const [key, val] of processedMessages.entries()) {
    if (now - val.timestamp > IDEMPOTENCY_CLEANUP_INTERVAL) {
      processedMessages.delete(key);
    }
  }
}, IDEMPOTENCY_CLEANUP_INTERVAL).unref();

const getMessageKey = (userId, message, messageId) => {
  if (messageId) {
    return `${userId}:${messageId}`;
  }
  const timeWindow = Math.floor(Date.now() / 5000);
  const sanitizedMsg = (message || "").trim().toLowerCase();
  return `${userId}:${sanitizedMsg}:${timeWindow}`;
};

export const chatSimulation = asyncHandler(async (req, res) => {
  const simulation = await Simulation.findById(req.params.id);
  if (!simulation) throw new AppError("Simulation not found", 404);
  if (simulation.user.toString() !== req.user.id) throw new AppError("Not authorized", 403);

  const { message, messageId } = req.body;
  const key = getMessageKey(req.user.id, message, messageId);

  // Check idempotency cache
  if (processedMessages.has(key)) {
    const cached = processedMessages.get(key);
    return res.json({
      success: true,
      data: {
        ...cached.result,
        coins: cached.coins,
        rolloverCoins: cached.rolloverCoins,
      },
    });
  }

  // Deduct coins and execute chat under user lock
  const result = await runWithUserLock(req.user.id, async () => {
    // Reload user from database inside lock to ensure most fresh balance
    const user = await User.findById(req.user.id);
    if (!user) throw new AppError("User not found", 404);

    // Check balance before calling LLM
    const totalCoins = (user.coins || 0) + (user.rolloverCoins || 0);
    if (totalCoins < 1) {
      throw new AppError("Insufficient coins. Please upgrade your plan or wait for renewal.", 400);
    }

    // Call chat service
    const chatResult = await chat(simulation._id.toString(), message);

    // Deduct 1 coin
    await deductCoins(user, 1);

    // Store in idempotency cache
    processedMessages.set(key, {
      timestamp: Date.now(),
      result: chatResult,
      coins: user.coins,
      rolloverCoins: user.rolloverCoins,
    });

    return {
      ...chatResult,
      coins: user.coins,
      rolloverCoins: user.rolloverCoins,
    };
  });

  res.json({ success: true, data: result });
});

// ─── Auto-Pilot ────────────────────────────────────────────

export const startAutoPilot = asyncHandler(async (req, res) => {
  const simulation = await Simulation.findById(req.params.id);
  if (!simulation) throw new AppError("Simulation not found", 404);
  if (simulation.user.toString() !== req.user.id) throw new AppError("Not authorized", 403);

  if (req.body.monthlyKwhLimit) simulation.consumptionGoal.monthlyKwhLimit = req.body.monthlyKwhLimit;
  if (req.body.targetBillEgp) simulation.consumptionGoal.targetBillEgp = req.body.targetBillEgp;
  simulation.autoPilot.enabled = true;
  simulation.autoPilot.startedAt = new Date();
  simulation.autoPilot.actionsTaken = 0;
  await simulation.save();

  engine.syncConfig(simulation._id.toString(), simulation.toObject());
  res.json({ success: true, data: getAutoPilotStatus(simulation.toObject()) });
});

export const stopAutoPilot = asyncHandler(async (req, res) => {
  const simulation = await Simulation.findById(req.params.id);
  if (!simulation) throw new AppError("Simulation not found", 404);
  if (simulation.user.toString() !== req.user.id) throw new AppError("Not authorized", 403);

  simulation.autoPilot.enabled = false;
  await simulation.save();

  engine.syncConfig(simulation._id.toString(), simulation.toObject());
  res.json({ success: true, data: getAutoPilotStatus(simulation.toObject()) });
});

export const getAutoPilot = asyncHandler(async (req, res) => {
  const simulation = await Simulation.findById(req.params.id);
  if (!simulation) throw new AppError("Simulation not found", 404);
  if (simulation.user.toString() !== req.user.id) throw new AppError("Not authorized", 403);

  res.json({ success: true, data: getAutoPilotStatus(simulation.toObject()) });
});

// ─── Smart Recommendations ──────────────────────────────────

export const recommendSimulation = asyncHandler(async (req, res) => {
  const simulation = await Simulation.findById(req.params.id);
  if (!simulation) throw new AppError("Simulation not found", 404);
  if (simulation.user.toString() !== req.user.id) throw new AppError("Not authorized", 403);

  const runtime = engine.getRuntimeState(simulation._id.toString());
  const result = await getRecommendations(simulation.toObject(), runtime);
  res.json({ success: true, data: result });
});

// ─── SSE Stream ──────────────────────────────────────────

export const streamSimulation = asyncHandler(async (req, res) => {
  const simulation = await Simulation.findById(req.params.id);
  if (!simulation) throw new AppError("Simulation not found", 404);
  if (simulation.user.toString() !== req.user.id) throw new AppError("Not authorized", 403);

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "X-Accel-Buffering": "no",
  });

  const state = engine.getRuntimeState(simulation._id.toString());
  if (state) {
    res.write(`data: ${JSON.stringify(state)}\n\n`);
  }

  addClient(simulation._id.toString(), res);
});
