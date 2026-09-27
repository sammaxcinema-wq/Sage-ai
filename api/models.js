export default function handler(req, res) {

  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://sammaxcinema-wq.github.io"
  );

  return res.status(200).json({
    success: true,

    models: [
      {
        id: process.env.BYTEZ_DEFAULT_MODEL,
        name: "SAGE Default Model",
        type: "chat"
      }
    ]
  });
}
