# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Run both frontend and backend (from root)
npm run dev

# Run frontend only
cd client && npm run dev

# Run backend only
cd server && npm run dev

# Lint frontend
cd client && npm run lint

# Seed the database (run from server/)
cd server && npm run db:seed

# Build for production
npm run build
```

## Architecture

This is a monorepo with three `package.json` files: root (dev orchestration), `client/` (React SPA), and `server/` (Express API).

### Two entry points for the server

- **Local dev**: `server/index.js` — starts Express listening on port 3000, connects to MongoDB
- **Vercel production**: `api/[...path].js` — a catch-all serverless function that imports the same Express `app` from `server/app.js` and calls `connectAll()` on each cold start. MongoDB connection is cached between warm invocations via a module-level promise in `server/db.js`.

### Data pipeline

1. **Scrapers** (`server/scraping/`) pull data from SARB and JSE websites using Puppeteer (for JS-rendered tables) or Cheerio/axios (for static HTML). `sarbTimelineScraper` specifically clicks interactive table links on SARB pages to reveal historical data.
2. **Seed script** (`server/scripts/seed.js`) runs all scrapers and upserts into MongoDB. Run manually when data needs refreshing: `cd server && npm run db:seed`.
3. **Models** (`server/model/`) define 15 Mongoose schemas — one per data series (repo rate, FX, gold, GDP, unemployment, JSE indices, etc.).
4. **Controllers** (`server/controllers/`) read from MongoDB and return JSON — no live scraping happens on API requests.
5. **Redis cache** (`server/middleware/cacheMiddleware.js`) wraps every route (except `/test`) with a 7-day TTL using Upstash (HTTP-based, stateless). Cache key is `req.originalUrl`.

### Frontend data fetching

`client/hooks/useSarbData.js` fires all 15 API endpoints in parallel using `useQueries` from TanStack Query with a 7-day `staleTime`. The `Dashboard` component waits for all queries before rendering (shows `CardSkeleton` while loading).

Vite proxies `/api/*` to `http://localhost:3000` in dev — no CORS issues locally.

The `@` alias resolves to `client/src/`.

### Environment variables (server/.env)

| Variable | Purpose |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST endpoint |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis auth token |
| `ORIGIN_1`, `ORIGIN_2` | Allowed CORS origins in production |
| `NODE_ENV` | `development` or `production` |

### Adding a new data series

Follow the existing pattern:
1. Add a scraper in `server/scraping/` and export from `server/scraping/index.js`
2. Add a Mongoose model in `server/model/` and export from `server/model/index.js`
3. Add a controller in `server/controllers/` and export from `server/controllers/index.js`
4. Register a route in `server/routes/govRoute.js` with `cacheMiddleware`
5. Add the endpoint to the `endpoints` array in `client/hooks/useSarbData.js` and expose it in the return value
6. Add the new scraper+model to `server/scripts/seed.js`
