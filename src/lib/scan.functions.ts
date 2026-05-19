import { createServerFn } from "@tanstack/react-start";

/**
 * Forwards a base64 leaf image to your Python model API and returns the
 * diagnosis. Configure the API URL via the PYTHON_API_URL secret (and
 * optionally PYTHON_API_KEY for a shared-secret header).
 *
 * Expected response shape from the Python API:
 * {
 *   disease: string, confidence: number, severity: "Mild"|"Moderate"|"Severe"|"None",
 *   healthy: boolean, causes: string, treatment: string, prevention: string
 * }
 */
export const analyzeCropImage = createServerFn({ method: "POST" })
  .inputValidator((input: { imageDataUrl: string }) => {
    if (!input?.imageDataUrl?.startsWith("data:image/")) throw new Error("Invalid image");
    return input;
  })
  .handler(async ({ data }) => {
    const apiUrl = process.env.PYTHON_API_URL;
    if (!apiUrl) throw new Error("PYTHON_API_URL not configured. Add it in project secrets.");

    const apiKey = process.env.PYTHON_API_KEY; // optional

    const res = await fetch(`${apiUrl.replace(/\/+$/, "")}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey ? { "X-API-Key": apiKey } : {}),
      },
      body: JSON.stringify({ image: data.imageDataUrl }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Model API error (${res.status}): ${text || res.statusText}`);
    }

    const json = await res.json();
    return json as {
      disease: string;
      confidence: number;
      severity: "Mild" | "Moderate" | "Severe" | "None";
      healthy: boolean;
      causes: string;
      treatment: string;
      prevention: string;
    };
  });
