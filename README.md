# Pastebin Lite

Simple Pastebin-like app with TTL and view limits.

## Run locally
```bash
npm install
npm run dev
```

## Persistence
Uses Vercel KV (Redis) for persistence across serverless requests.

## Design notes
- Deterministic time supported via TEST_MODE and x-test-now-ms header
- Minimal API-first design to satisfy automated tests
