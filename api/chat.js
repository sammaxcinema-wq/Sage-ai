import Bytez from "bytez.js";

const bytez = new Bytez(process.env.BYTEZ_API_KEY);

const allowedOrigins = [
  "https://sammaxcinema-wq.github.io",
  "https://sage-ai-rho.vercel.app"
];

export default async function handler(req, res) {

  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Vary", "Origin");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  if (!process.env.BYTEZ_API_KEY) {
    return res.status(500).json({
      error: "BYTEZ_API_KEY is not configured"
    });
  }

  try {

    const {
      message,
      model
    } = req.body || {};

    if (!message) {
      return res.status(400).json({
        error: "Message is required"
      });
    }

    const selectedModel =
      model ||
      process.env.BYTEZ_DEFAULT_MODEL;

    if (!selectedModel) {
      return res.status(500).json({
        error: "BYTEZ_DEFAULT_MODEL is not configured"
      });
    }

    const aiModel = bytez.model(selectedModel);

    const { error, output } =
      await aiModel.run(message);

    if (error) {
      console.error("Bytez error:", error);

      return res.status(502).json({
        error: "AI provider request failed"
      });
    }

    return res.status(200).json({
      success: true,
      model: selectedModel,
      response: output
    });

  } catch (error) {

    console.error("SAGE backend error:", error);

    return res.status(500).json({
      error: "SAGE backend error"
    });
  }
}
