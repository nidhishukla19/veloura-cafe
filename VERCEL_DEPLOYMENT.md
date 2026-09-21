# Veloura Café — Vercel deployment

The project now uses one shared Express app for local development and Vercel serverless API requests.

## Structure

- `server/app.js` — shared Express application
- `server/server.js` — local development entry point (`localhost:4000`)
- `api/[...path].js` — Vercel catch-all function for `/api/*`
- `src/services/api.ts` — frontend uses same-origin `/api/...` paths

## Deploy

1. Push this project to GitHub.
2. Import the repository into Vercel.
3. Keep the framework as Vite (Vercel can detect it automatically).
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy.

No separate backend deployment is required. Vercel serves the Vue app and the Express API from the same project.

## Local development

```bash
npm install
npm run dev
```

This starts Vite on port `5173` and the Express API on port `4000`. Vite proxies `/api/*` to Express.

## Important production note

The current auth, contact messages, and orders are still stored in server memory. This makes the demo API Vercel-compatible, but it is **not persistent storage**. For a real production café, connect these endpoints to a persistent database (for example PostgreSQL/Supabase/MongoDB) before relying on account, contact, or order data.
