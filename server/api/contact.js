// POST /api/contact — demo in-memory contact message handling.
const messages = []

export function sendContact(req, res) {
  const { name, email, phone, message } = req.body || {}

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Missing required contact fields.' })
  }

  messages.push({ name, email, phone, message, createdAt: new Date().toISOString() })

  res.json({ success: true, message: 'Message sent successfully' })
}
