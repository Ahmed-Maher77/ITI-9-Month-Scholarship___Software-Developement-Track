import Simulation from "../../database/models/simulation.model.js";
import * as engine from "./simulation.engine.js";
import { generateAdvice } from "../config/groq.js";
import { getAdvice } from "./simulation.advisor.js";
import { getWhatIf } from "./simulation.whatif.js";

function buildContext(simulation, runtime) {
  const circuits = simulation.circuits.map((c) => ({
    name: c.name,
    devices: c.devices.map((d) => ({
      id: d._id.toString(),
      name: d.name,
      wattage: d.wattage,
      isOn: d.isOn,
    })),
  }));

  return {
    name: simulation.name,
    totalKWh: runtime?.totalKWh || 0,
    currentTier: runtime?.currentTier || 1,
    estimatedBill: runtime?.estimatedBill || 0,
    running: runtime?.running || false,
    circuits,
  };
}

function buildPrompt(context, message) {
  return `انت مساعد ذكي لادارة استهلاك الكهربا في المنازل المصرية. بتتكلم مصري.

البيت الحالي:
- الاسم: ${context.name}
- اجمالي الاستهلاك: ${context.totalKWh} كيلو وات
- الشريحة الحالية: ${context.currentTier}
- الفاتورة: ${context.estimatedBill} جنيه

الدوائر والاجهزة:
${JSON.stringify(context.circuits, null, 2)}

رسالة المستخدم: "${message}"

حدد القصد من الرسالة وارجع JSON فقط:
{
  "intent": "toggle_device" | "query_state" | "advise" | "what_if" | "query_prediction" | "unknown",
  "deviceName": "اسم الجهاز بالظبط من اللي فوق (لو القصد تشغيل/فصل جهاز)",
  "targetState": true | false (لو القصد تشغيل ولا فصل),
  "whatIfChanges": [{"deviceName": "...", "isOn": true}] (لو القصد what-if),
  "whatIfDuration": 60 (الدقائق),
  "reply": "الرد باللهجة المصرية"
}`;
}

async function findDeviceByName(simulation, name) {
  for (const circuit of simulation.circuits) {
    const device = circuit.devices.find(
      (d) => d.name.toLowerCase() === name.toLowerCase()
    );
    if (device) return { device, circuit };
  }
  return null;
}

async function toggleDevice(simulation, deviceId, isOn) {
  for (const circuit of simulation.circuits) {
    const device = circuit.devices.id(deviceId);
    if (device) {
      device.isOn = isOn;
      await simulation.save();
      engine.syncConfig(simulation._id.toString(), simulation.toObject());
      return device;
    }
  }
  return null;
}

function getSummary(context) {
  const onDevices = context.circuits
    .flatMap((c) => c.devices)
    .filter((d) => d.isOn);

  let loadW = 0;
  for (const d of onDevices) loadW += d.wattage;

  return `اجمالي الاستهلاك ${context.totalKWh} كيلو وات في الشريحة ${context.currentTier}. الاجهزة الشغالة حاليا: ${onDevices.map((d) => `${d.name} (${d.wattage} واط)`).join("، ")}. الحمل الحالي ${loadW} واط.`;
}

export async function chat(simulationId, message) {
  const simulation = await Simulation.findById(simulationId);
  if (!simulation) throw new Error("Simulation not found");

  const runtime = engine.getRuntimeState(simulationId);
  const context = buildContext(simulation, runtime);
  const prompt = buildPrompt(context, message);
  const raw = await generateAdvice(prompt);

  let parsed;
  try {
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No JSON found");
    parsed = JSON.parse(match[0]);
  } catch {
    return {
      intent: "unknown",
      reply: "عفوا مش فاهم قصدك. ممكن تقول حاجة زي: شغل التكييف في غرفة النوم، أو كم استهلاكي؟",
      actionTaken: false,
    };
  }

  const { intent, deviceName, targetState, reply, whatIfChanges, whatIfDuration } = parsed;
  let actionResult = null;

  if (intent === "toggle_device" && deviceName) {
    const found = await findDeviceByName(simulation, deviceName);
    if (found) {
      await toggleDevice(simulation, found.device._id, targetState);
      const state = engine.getRuntimeState(simulationId);
      const loadW = state?.currentLoadW || 0;
      actionResult = { device: found.device.name, isOn: targetState, loadW };
    }
  }

  if (intent === "advise") {
    try {
      const advice = await getAdvice(simulationId);
      actionResult = { tips: advice.tips };
    } catch {}
  }

  if (intent === "what_if" && whatIfChanges?.length > 0) {
    const deviceIds = [];
    for (const change of whatIfChanges) {
      const found = await findDeviceByName(simulation, change.deviceName);
      if (found) deviceIds.push({ deviceId: found.device._id.toString(), isOn: change.isOn });
    }
    if (deviceIds.length > 0) {
      try {
        const result = await getWhatIf(simulationId, {
          toggleDevices: deviceIds,
          durationMinutes: whatIfDuration || 60,
        });
        actionResult = result.difference;
      } catch {}
    }
  }

  if (intent === "query_state") {
    actionResult = { summary: getSummary(context) };
  }

  if (intent === "query_prediction") {
    const { getPrediction } = await import("./simulation.predictor.js");
    actionResult = getPrediction(runtime);
  }

  return {
    intent,
    reply: reply || "تم.",
    actionTaken: intent !== "unknown" && intent !== "query_state",
    actionResult,
  };
}
