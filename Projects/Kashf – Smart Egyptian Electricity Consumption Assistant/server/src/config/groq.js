import OpenAI from "openai";
import AppError from "../utils/AppError.js";

let client = null;

function getClient() {
  if (client) return client;

  const apiKey = process.env.GROQ_API_KEY;
  const model = process.env.GROQ_MODEL;

  if (!apiKey || !model) {
    throw new AppError(
      "AI advisor is not configured. Set GROQ_API_KEY and GROQ_MODEL in .env.",
      503
    );
  }

  client = new OpenAI({
    apiKey,
    baseURL: "https://api.groq.com/openai/v1",
  });

  return client;
}

export async function getGroqModel() {
  return process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
}

export async function generateAdvice(prompt) {
  const groq = getClient();
  const model = await getGroqModel();

  const response = await groq.chat.completions.create({
    model,
    messages: [
      {
        role: "system",
        content:
          "You are a helpful energy-saving advisor for Egyptian homes. Respond in Egyptian Arabic (Ammiya). Be specific, practical, and reference actual devices and wattages.",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
    max_tokens: 600,
  });

  return response.choices[0]?.message?.content || "";
}
