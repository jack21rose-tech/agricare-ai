import { createServerFn } from "@tanstack/react-start";

type Msg = { role: "user" | "assistant"; content: string };

const SYSTEM = `You are KisanAI, a warm, practical AI farming assistant for Indian farmers (Kisans).
- Reply in the SAME language as the user (Hindi, English, Marathi, Tamil, Bengali, Punjabi, etc.).
- Give concise, actionable advice tailored to Indian crops, climate, and commonly-available inputs.
- Cover topics: crop diseases, pests, irrigation, fertilizer, weather, mandi prices, government schemes.
- When relevant, mention specific products available in India (e.g. Mancozeb, Urea, Neem oil) with doses.
- If unsure, say so and recommend consulting the local Krishi Vigyan Kendra (KVK).
- Use short paragraphs, simple language. No markdown headers; bullet points are fine.`;

export const askAssistant = createServerFn({ method: "POST" })
  .inputValidator((input: { messages: Msg[] }) => {
    if (!Array.isArray(input?.messages) || input.messages.length === 0) throw new Error("No messages");
    if (input.messages.length > 40) throw new Error("Conversation too long");
    return input;
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;

    if (!apiKey) throw new Error("AI gateway not configured");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "system", content: SYSTEM }, ...data.messages],
      }),
    });

    if (!res.ok) {
      if (res.status === 429) throw new Error("Rate limit exceeded. Try again shortly.");
      if (res.status === 402) throw new Error("AI credits exhausted.");
      throw new Error(`AI gateway error (${res.status})`);
    }

    const json = await res.json();
    const reply = json.choices?.[0]?.message?.content ?? "Sorry, I couldn't reply just now.";
    return { reply };
  });
