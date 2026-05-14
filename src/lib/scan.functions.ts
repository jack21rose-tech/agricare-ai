import { createServerFn } from "@tanstack/react-start";

const SYSTEM = `You are an expert plant pathologist analyzing crop leaf images for Indian farmers.
Identify the most likely disease (or confirm healthy). Return JSON ONLY matching the tool schema.
Treatments must reference commonly available products in India (Mancozeb, Copper Oxychloride, Neem oil, etc.).
Be concise and practical — farmers will read this in the field.`;

export const analyzeCropImage = createServerFn({ method: "POST" })
  .inputValidator((input: { imageDataUrl: string }) => {
    if (!input?.imageDataUrl?.startsWith("data:image/")) throw new Error("Invalid image");
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
        messages: [
          { role: "system", content: SYSTEM },
          {
            role: "user",
            content: [
              { type: "text", text: "Diagnose this crop. Return JSON via the tool." },
              { type: "image_url", image_url: { url: data.imageDataUrl } },
            ],
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "report_diagnosis",
              description: "Report the crop disease diagnosis.",
              parameters: {
                type: "object",
                properties: {
                  disease: { type: "string", description: "Disease name, or 'Healthy'" },
                  confidence: { type: "number", description: "0 to 1" },
                  severity: { type: "string", enum: ["Mild", "Moderate", "Severe", "None"] },
                  healthy: { type: "boolean" },
                  causes: { type: "string", description: "1-2 sentences on likely causes" },
                  treatment: { type: "string", description: "Practical treatment with product + dose" },
                  prevention: { type: "string", description: "Practical prevention tips" },
                },
                required: ["disease", "confidence", "severity", "healthy", "causes", "treatment", "prevention"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "report_diagnosis" } },
      }),
    });

    if (!res.ok) {
      if (res.status === 429) throw new Error("Rate limit exceeded. Please try again in a moment.");
      if (res.status === 402) throw new Error("AI credits exhausted. Please top up in Lovable workspace.");
      throw new Error(`AI gateway error (${res.status})`);
    }

    const json = await res.json();
    const args = json.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    if (!args) throw new Error("No diagnosis returned");
    return JSON.parse(args);
  });
