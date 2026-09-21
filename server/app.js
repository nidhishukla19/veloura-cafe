import express from 'express'
import cors from 'cors'
import { getMenu } from './api/menu.js'
import { getReviews } from './api/reviews.js'
import { getGallery } from './api/gallery.js'
import { createOrder } from './api/orders.js'
import { sendContact } from './api/contact.js'
import { signup, login } from './api/auth.js'

// Shared Express application.
// - Local development: server/server.js calls app.listen().
// - Vercel: api/[...path].js exports this app as a serverless function.
const app = express()

app.disable('x-powered-by')
app.use(cors())
app.use(express.json({ limit: '100kb' }))

app.get('/api/menu', getMenu)
app.get('/api/reviews', getReviews)
app.get('/api/gallery', getGallery)
app.post('/api/orders', createOrder)
app.post('/api/contact', sendContact)
app.post('/api/auth/signup', signup)
app.post('/api/auth/login', login)

app.use('/api', (_req, res) => {
  res.status(404).json({ success: false, message: 'API endpoint not found.' })
})

export default app
