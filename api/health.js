export default function handler(req, res) {
  return res.status(200).json({
    status: "online",
    service: "SAGE Backend",
    provider: "Bytez",
    timestamp: new Date().toISOString()
  });
}
