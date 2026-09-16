// Demo in-memory auth (no database — swap `users` for a real table before
// shipping). Passwords are hashed with bcrypt, so they are never stored or
// compared in plain text, even in this demo store.
import bcrypt from 'bcryptjs'

const users = []
const SALT_ROUNDS = 10

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function signup(req, res) {
  try {
    const { name, email, phone, password } = req.body || {}

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password are required.' })
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' })
    }
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long.' })
    }

    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
    if (existing) {
      return res.status(409).json({ success: false, message: 'An account with this email already exists.' })
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)
    users.push({ name, email, phone: phone || '', passwordHash })

    res.json({ success: true, message: 'Account created successfully', user: { name, email } })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Something went wrong while creating your account.' })
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body || {}

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' })
    }

    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
    const passwordMatches = user ? await bcrypt.compare(password, user.passwordHash) : false

    if (!user || !passwordMatches) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' })
    }

    res.json({ success: true, message: 'Logged in successfully', user: { name: user.name, email: user.email } })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Something went wrong while logging in.' })
  }
}
