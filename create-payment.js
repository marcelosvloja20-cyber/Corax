export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { amount, product } = req.body;
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Valor inválido" });
  }

  const encodedProduct = encodeURIComponent(product || "Produto NEONEX");
  const link = `https://neonex-pay.vercel.app/?amount=${amount}&product=${encodedProduct}`;

  return res.status(200).json({ link });
}