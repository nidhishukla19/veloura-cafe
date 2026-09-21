// Vercel catch-all serverless function for every /api/* request.
// The same Express app is used locally and in production.
import app from '../server/app.js'

export default app
