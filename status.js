let payments = JSON.parse(
  global.payments || "[]"
); // temporário, ideal: banco real

export default async function handler(req, res) {
  const { hash } = req.query;
  if (!hash) return res.status(400).json({ error: "Hash necessária" });

  const payment = payments.find(p => p.hash === hash);
  if (!payment) return res.status(404).json({ error: "Transação não encontrada" });

  return res.status(200).json(payment);
}