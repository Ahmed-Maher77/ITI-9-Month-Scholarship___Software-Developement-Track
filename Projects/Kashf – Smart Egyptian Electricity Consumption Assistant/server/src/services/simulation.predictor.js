import { TIER_THRESHOLDS } from "../config/tier.constants.js";

export function getPrediction(runtime) {
  const defaultState = { totalKWh: 0, currentLoadW: 0, currentTier: 1, tickCount: 0, running: false };
  const state = runtime || defaultState;

  const { totalKWh, currentLoadW, currentTier, tickCount, running } = state;
  const kWhPerHour = currentLoadW / 1000;

  const threshold = currentTier < 7 ? TIER_THRESHOLDS[currentTier - 1] : Infinity;
  const remainingKWh = Math.max(0, threshold - totalKWh);

  let estimatedHoursToNextTier = null;
  if (kWhPerHour > 0 && currentTier < 7) {
    estimatedHoursToNextTier = remainingKWh / kWhPerHour;
  }

  const percentRemaining = threshold === Infinity
    ? 100
    : (remainingKWh / threshold) * 100;

  let warningLevel = "green";
  if (percentRemaining <= 5) warningLevel = "red";
  else if (percentRemaining <= 10) warningLevel = "orange";
  else if (percentRemaining <= 20) warningLevel = "yellow";

  return {
    currentTier,
    nextTier: currentTier < 7 ? currentTier + 1 : null,
    remainingKWh: +remainingKWh.toFixed(2),
    totalKWh: +totalKWh.toFixed(2),
    estimatedHoursToNextTier: estimatedHoursToNextTier ? +estimatedHoursToNextTier.toFixed(2) : null,
    warningLevel,
    currentLoadW,
    kWhPerHour: +kWhPerHour.toFixed(2),
    running,
    tickCount,
  };
}
