import app from './app.js'

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Veloura Café API server running on http://localhost:${PORT}`)
})
