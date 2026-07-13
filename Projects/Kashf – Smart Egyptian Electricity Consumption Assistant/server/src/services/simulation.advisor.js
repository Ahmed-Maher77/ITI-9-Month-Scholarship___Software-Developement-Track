import Simulation from "../../database/models/simulation.model.js";
import * as engine from "./simulation.engine.js";
import { generateAdvice } from "../config/groq.js";

function buildCircuitsTable(circuits) {
  return circuits
    .map((c) => {
      const onDevices = c.devices.filter((d) => d.isOn);
      const topDevice = onDevices.sort((a, b) => b.wattage - a.wattage)[0];
      const load = c.loadW || 0;
      return `- ${c.name}: ${load}W${topDevice ? ` (اعلى جهاز: ${topDevice.name} ${topDevice.wattage}W)` : ""}`;
    })
    .join("\n");
}

function buildPrompt(simulation, runtime) {
  const circuits = runtime?.config?.circuits || simulation.circuits;
  const circuitsTable = buildCircuitsTable(circuits);

  return `انت مستشار توفير الطاقة للمنازل المصرية.

حالة المنزل الحالية:
- اجمالي الاستهلاك: ${runtime?.totalKWh?.toFixed(2) || 0} كيلو وات
- الشريحة الحالية: ${runtime?.currentTier || 1}
- الفاتورة المتوقعة: ${runtime?.estimatedBill?.toFixed(2) || 0} جنيه

الدوائر والاجهزة:
${circuitsTable}

اطلب 3 نصائح للتوفير باللهجة المصرية.

رد فقط بـ JSON array من غير اي شرح اضافي:
[
  {
    "device": "اسم الجهاز",
    "advice": "النصيحة باللهجة المصرية",
    "savings": "التوفير المتوقع"
  }
]`;
}

function parseTips(raw) {
  try {
    const jsonMatch = raw.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((t) => ({
          device: t.device || "",
          advice: t.advice || "",
          savings: t.savings || "",
        }));
      }
    }
  } catch {}

  return [{ device: "عام", advice: raw.slice(0, 500), savings: "" }];
}

export async function getAdvice(simulationId) {
  const simulation = await Simulation.findById(simulationId);
  if (!simulation) throw new Error("Simulation not found");

  const runtime = engine.getRuntimeState(simulationId);
  const prompt = buildPrompt(simulation, runtime);
  const raw = await generateAdvice(prompt);
  const tips = parseTips(raw);

  return { tips, generatedAt: new Date().toISOString() };
}
