# Pastebin Lite

A simple pastebin application with time-to-live (TTL) and view count limits, built as a take-home assignment.

## 🚀 Live Demo

**Deployed URL:** https://pastebin-create-mup4.vercel.app

## 📋 Features

- Create text pastes with shareable URLs
- Optional time-based expiry (TTL in seconds)
- Optional view count limits
- RESTful API endpoints
- Clean, responsive UI
- Deterministic time testing support

## 🛠️ Tech Stack

- **Framework:** Next.js 14.2.5
- **Language:** TypeScript
- **Database:** Upstash Redis (serverless KV store)
- **Hosting:** Vercel
- **Styling:** Inline CSS

## 🏃 Run Locally

1. Clone the repository:
```bash
git clone https://github.com/Sakshi983-cmd/PASTEBIN-CREATE.git
cd PASTEBIN-CREATE
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with:
```
KV_REST_API_URL=your_upstash_url
KV_REST_API_TOKEN=your_upstash_token
TEST_MODE=1
```

4. Run development server:
```bash
npm run dev
```

5. Open http://localhost:3000

## 💾 Persistence Layer

**Upstash Redis** is used for data persistence across serverless function invocations. This ensures:
- Fast read/write operations
- Automatic TTL support
- Reliable storage in serverless environments
- No cold-start database connection issues

## 🎯 Design Decisions

1. **Serverless-First Architecture:** Built for Vercel's edge runtime with stateless API routes
2. **Deterministic Testing:** `TEST_MODE` + `x-test-now-ms` header for reproducible expiry tests
3. **Atomic View Counting:** Increments happen after successful paste retrieval
4. **Simple ID Generation:** `nanoid` for short, URL-safe paste IDs
5. **Error-First Design:** All edge cases return proper HTTP status codes and JSON errors

## 📡 API Endpoints

### Health Check
```
GET /api/healthz
Response: {"ok": true}
```

### Create Paste
```
POST /api/pastes
Body: {
  "content": "string",
  "ttl_seconds": 60,     // optional
  "max_views": 5          // optional
}
Response: {
  "id": "abc123",
  "url": "https://pastebin-create-mup4.vercel.app/p/abc123"
}
```

### Fetch Paste (API)
```
GET /api/pastes/:id
Response: {
  "content": "string",
  "remaining_views": 4,
  "expires_at": "2026-01-29T12:00:00.000Z"
}
```

### View Paste (HTML)
```
GET /p/:id
Response: HTML page with paste content
```

## 🧪 Testing

The application supports deterministic time testing via:
- Environment variable: `TEST_MODE=1`
- Request header: `x-test-now-ms: <epoch_milliseconds>`

## 📦 Project Structure
```
├── app/
│   ├── api/
│   │   ├── healthz/route.ts       # Health check endpoint
│   │   └── pastes/
│   │       ├── route.ts            # Create paste
│   │       └── [id]/route.ts       # Fetch paste
│   ├── p/[id]/page.tsx             # View paste HTML
│   ├── layout.tsx                  # Root layout
│   └── page.tsx                    # Home page UI
├── lib/
│   └── storage.ts                  # Redis storage logic
└── Configuration files
```

#
```
Used Upstash Redis for serverless persistence. Implemented deterministic time testing with TEST_MODE. All functional requirements met including TTL, view limits, and proper error handling.
