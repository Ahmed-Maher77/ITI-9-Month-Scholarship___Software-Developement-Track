export const TIER_THRESHOLDS = [50, 100, 200, 350, 650, 1000];

export const TIER_RATES = [0.58, 0.78, 1.08, 1.28, 1.58, 1.78, 2.08];

const BRACKETS = [
  { limit: 50, rate: 0.58 },
  { limit: 50, rate: 0.78 },
  { limit: 100, rate: 1.08 },
  { limit: 150, rate: 1.28 },
  { limit: 300, rate: 1.58 },
  { limit: 350, rate: 1.78 },
];

export function computeTier(kWh) {
  for (let i = 0; i < TIER_THRESHOLDS.length; i++) {
    if (kWh <= TIER_THRESHOLDS[i]) return i + 1;
  }
  return 7;
}

export function computeBill(kWh) {
  let bill = 0;
  let remaining = kWh;

  for (const bracket of BRACKETS) {
    const used = Math.min(remaining, bracket.limit);
    bill += used * bracket.rate;
    remaining -= used;
    if (remaining <= 0) break;
  }

  if (remaining > 0) bill += remaining * 2.08;
  return bill;
}
