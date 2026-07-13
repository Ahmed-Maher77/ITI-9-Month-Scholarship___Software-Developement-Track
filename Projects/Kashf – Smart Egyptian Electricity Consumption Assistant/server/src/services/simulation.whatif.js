import Simulation from "../../database/models/simulation.model.js";
import * as engine from "./simulation.engine.js";
import { computeTier, computeBill } from "../config/tier.constants.js";

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function applyChanges(config, changes) {
  const clone = deepClone(config);

  for (const toggle of changes.toggleDevices || []) {
    for (const circuit of clone.circuits) {
      const device = circuit.devices.find((d) => d._id === toggle.deviceId);
      if (device) {
        device.isOn = toggle.isOn;
        break;
      }
    }
  }

  return clone;
}

function computeLoad(circuits) {
  let total = 0;
  for (const circuit of circuits) {
    for (const device of circuit.devices) {
      if (device.isOn) total += device.wattage;
    }
  }
  return total;
}

export async function getWhatIf(simulationId, changes) {
  const simulation = await Simulation.findById(simulationId);
  if (!simulation) throw new Error("Simulation not found");

  const runtime = engine.getRuntimeState(simulationId);
  const currentKWh = runtime?.totalKWh || 0;
  const currentTierVal = runtime?.currentTier || 1;
  const currentBill = runtime?.estimatedBill || 0;
  const running = runtime?.running || false;

  const config = simulation.toObject();
  const currentLoadW = computeLoad(config.circuits);

  const changedConfig = applyChanges(config, changes);
  const newLoadW = computeLoad(changedConfig.circuits);

  const durationHours = (changes.durationMinutes || 60) / 60;
  const projectedKWhDelta = (newLoadW / 1000) * durationHours;

  const currentProjectedKWh = currentKWh + (currentLoadW / 1000) * durationHours;
  const whatIfProjectedKWh = currentKWh + projectedKWhDelta;

  return {
    current: {
      totalKWh: +currentKWh.toFixed(4),
      totalLoadW: currentLoadW,
      tier: currentTierVal,
      bill: +currentBill.toFixed(2),
      projectedKWhAfter: +currentProjectedKWh.toFixed(4),
      projectedTierAfter: computeTier(currentProjectedKWh),
      projectedBillAfter: +computeBill(currentProjectedKWh).toFixed(2),
    },
    whatIf: {
      totalLoadW: newLoadW,
      projectedKWhAfter: +whatIfProjectedKWh.toFixed(4),
      projectedTierAfter: computeTier(whatIfProjectedKWh),
      projectedBillAfter: +computeBill(whatIfProjectedKWh).toFixed(2),
    },
    difference: {
      loadWDiff: newLoadW - currentLoadW,
      kWhDiff: +(whatIfProjectedKWh - currentProjectedKWh).toFixed(4),
      billDiff: +(computeBill(whatIfProjectedKWh) - computeBill(currentProjectedKWh)).toFixed(2),
      tierDiff: computeTier(whatIfProjectedKWh) - computeTier(currentProjectedKWh),
    },
    changes: {
      durationMinutes: changes.durationMinutes || 60,
      togglesApplied: changes.toggleDevices?.length || 0,
    },
    running,
  };
}
