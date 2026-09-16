import express from 'express'
import cors from 'cors'
import { getMenu } from './api/menu.js'
import { getReviews } from './api/reviews.js'
import { getGallery } from './api/gallery.js'
import { createOrder } from './api/orders.js'
import { sendContact } from './api/contact.js'
import { signup, login } from './api/auth.js'

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.get('/api/menu', getMenu)
app.get('/api/reviews', getReviews)
app.get('/api/gallery', getGallery)
app.post('/api/orders', createOrder)
app.post('/api/contact', sendContact)
app.post('/api/auth/signup', signup)
app.post('/api/auth/login', login)

app.listen(PORT, () => {
  console.log(`Veloura Café API server running on http://localhost:${PORT}`)
})
