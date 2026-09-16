// POST /api/orders — demo in-memory order handling (no database required).
const orders = []

export function createOrder(req, res) {
  const { customerName, phone, items, total } = req.body || {}

  if (!customerName || !phone || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ success: false, message: 'Missing required order fields.' })
  }

  orders.push({ customerName, phone, items, total, createdAt: new Date().toISOString() })

  res.json({ success: true, message: 'Order placed successfully' })
}
