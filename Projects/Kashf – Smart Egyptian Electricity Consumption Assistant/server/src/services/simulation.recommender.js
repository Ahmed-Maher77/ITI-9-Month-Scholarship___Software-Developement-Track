import { generateAdvice } from "../config/groq.js";
import { computeTier, TIER_THRESHOLDS, TIER_RATES } from "../config/tier.constants.js";

function getLoadDistribution(config) {
  return config.circuits.map((c) => {
    const loadW = c.devices.filter((d) => d.isOn).reduce((s, d) => s + d.wattage, 0);
    return { name: c.name, loadW, deviceCount: c.devices.length, devicesOn: c.devices.filter((d) => d.isOn).length };
  });
}

function getDeviceProfile(config) {
  return config.circuits.flatMap((c) =>
    c.devices.map((d) => ({ name: d.name, wattage: d.wattage, isOn: d.isOn, circuit: c.name, essential: d.essential }))
  );
}

function analyzePatterns(simulation, runtime) {
  const circuits = getLoadDistribution(simulation);
  const totalLoadW = circuits.reduce((s, c) => s + c.loadW, 0);
  const devices = getDeviceProfile(simulation);
  const tier = runtime?.currentTier || 1;
  const totalKWh = runtime?.totalKWh || 0;

  const tierThreshold = TIER_THRESHOLDS[tier - 1] || Infinity;
  const remainingKWh = Math.max(0, tierThreshold - totalKWh);
  const tierProgress = tierThreshold > 0 ? ((totalKWh / tierThreshold) * 100).toFixed(1) : 0;

  const highLoadDevices = devices.filter((d) => d.isOn && d.wattage >= 1000).sort((a, b) => b.wattage - a.wattage);
  const essentialOn = devices.filter((d) => d.isOn && d.essential);
  const nonEssentialOn = devices.filter((d) => d.isOn && !d.essential);
  const offDevices = devices.filter((d) => !d.isOn);

  const heaviestCircuit = [...circuits].sort((a, b) => b.loadW - a.loadW)[0] || null;

  return {
    totalLoadW,
    circuits,
    tier,
    totalKWh,
    remainingKWh,
    tierProgress: +tierProgress,
    nextTierRate: TIER_RATES[Math.min(tier, 6)],
    highLoadDevices: highLoadDevices.map((d) => ({ name: d.name, wattage: d.wattage, circuit: d.circuit })),
    essentialOn: essentialOn.map((d) => d.name),
    nonEssentialOn: nonEssentialOn.map((d) => d.name),
    offDevices: offDevices.map((d) => d.name),
    heaviestCircuit: heaviestCircuit ? { name: heaviestCircuit.name, loadW: heaviestCircuit.loadW } : null,
  };
}

function buildPrompt(analysis) {
  return `انت خبير توفير كهرباء للمنازل المصرية. حلل البيانات دي وقدم توصيات ذكية.

التحليل الحالي:
- اجمالي الحمل: ${analysis.totalLoadW} واط
- اجمالي الاستهلاك: ${analysis.totalKWh} كيلو وات
- الشريحة الحالية: ${analysis.tier}
- المتبقي للشريحة الجاية: ${analysis.remainingKWh} كيلو وات
- نسبة التقدم في الشريحة: ${analysis.tierProgress}%
- سعر الشريحة الجاية: ${analysis.nextTierRate} جنيه/كيلو وات

الدوائر:
${JSON.stringify(analysis.circuits, null, 2)}

الأجهزة العالية (>1000 واط والشغالة):
${JSON.stringify(analysis.highLoadDevices, null, 2)}

الأجهزة الشغالة غير الأساسية:
${JSON.stringify(analysis.nonEssentialOn, null, 2)}

الأجهزة المطفية:
${JSON.stringify(analysis.offDevices, null, 2)}

اطلب JSON فقط بالشكل ده (مافيش حاجة تانية):
{
  "findings": [
    {
      "category": "peak" | "efficiency" | "tier_saving" | "device_swap" | "anomaly",
      "title": "عنوان قصير",
      "description": "شرح المشكلة بالتفصيل",
      "impact": "تأثير المشكلة (مثلاً: 50 جنيه زيادة)",
      "suggestion": "اقتراح عملي للحل"
    }
  ],
  "quickWins": [
    "حاجة تقدر تعملها دلوقتي"
  ],
  "priority": "low" | "medium" | "high"
}`;
}

export async function getRecommendations(simulation, runtime) {
  const analysis = analyzePatterns(simulation, runtime);
  const prompt = buildPrompt(analysis);
  const raw = await generateAdvice(prompt);

  let parsed;
  try {
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No JSON found");
    parsed = JSON.parse(match[0]);
  } catch {
    return {
      analysis,
      recommendations: null,
      generatedAt: new Date().toISOString(),
    };
  }

  return {
    analysis,
    recommendations: parsed,
    generatedAt: new Date().toISOString(),
  };
}
