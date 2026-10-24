# Biz DaVinci

Local business growth platform built with Next.js 15 — free website audits, AI voice agents, operator dashboard, industry landing pages, and free lead-gen tools.

## Quick start

```bash
cp .env.example .env.local
# Add API keys (see .env.example comments)
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Features

| Area | Routes | Notes |
|------|--------|-------|
| Website audit | `/`, `/insights/[jobId]` | Real fetch + 5-pillar scoring; `AUDIT_USE_MOCK=true` for dev |
| Operator dashboard | `/dashboard` | ZIP discovery, bulk audits, demos, outbound calls, social queue |
| Demo sites | `/demo/[slug]` | `noindex` previews with GBP photos, real hours, and scraped site copy |
| Industries | `/industries/[slug]` | 20 vertical landing pages |
| Free tools | `/tools/*` | Missed call calculator, GBP grader, review/post generators |
| Voice | Homepage widget + Vapi webhooks | Requires Vapi keys in `.env.local` |

## Scripts

```bash
npm run dev        # development server
npm run build      # production build
npm run lint       # ESLint
npm run typecheck  # TypeScript
```

## Environment

Copy `.env.example` to `.env.local`. Required for full production:

- `OPENAI_API_KEY`, `FIREBASE_SERVICE_ACCOUNT`, `GOOGLE_PLACES_API_KEY`
- `VAPI_*` keys, `DASHBOARD_PASSWORD`, `CRON_SECRET`, `NEXT_PUBLIC_APP_URL`

Optional: `LATE_API_KEY` (social posting), Upstash Redis, Gmail SMTP.

Startup logs which features are enabled via `src/instrumentation.ts`.

## Compliance

- Outbound calls are human-triggered from the dashboard only
- Demo sites are labeled and `noindex`
- Prospects can be flagged `doNotContact` after opt-out

## Deploy

Deploy to Vercel (or any Node host). Set environment variables in the dashboard and enable Firestore in Firebase.
