# Caregma — Next.js Frontend

Real Next.js 15 + TypeScript + Tailwind app for Caregma, converted from the HTML prototype. It now includes a Supabase/Stripe-ready backend foundation while preserving seed-data fallback for local UI review.

## Setup

```bash
pnpm install   # or npm install / yarn install
pnpm dev       # starts on http://localhost:3000
```

Then open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command           | What it does                                   |
| ----------------- | ---------------------------------------------- |
| `pnpm dev`        | Run dev server with hot reload                 |
| `pnpm build`      | Production build (catches TypeScript errors)   |
| `pnpm start`      | Run the production build locally               |
| `pnpm typecheck`  | TypeScript check without emitting              |
| `pnpm lint`       | Run Next.js ESLint                             |

## Stack

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript strict**
- **Tailwind CSS 3.4** with custom Caregma palette
- **Fraunces** (serif headings) + **Geist** (sans UI) + **Geist Mono** — all via `next/font/google`
- **lucide-react** for icons
- **clsx + tailwind-merge** for class merging

Backend scaffolding now exists. The app still falls back to `src/lib/seed-data.ts`
when Supabase env vars are not configured, so the UI remains reviewable without a
database.

See `BACKEND.md` for the current backend setup, migration, routes, and next
implementation passes.

## Routes

### Public
- `/` — landing
- `/pricing`
- `/about`
- `/for-guides` — clinician recruiting page
- `/for-guides/apply` → `/2`, `/3`, `/4`, `/5`, `/done` — 5-step application

### Authentication
- `/login` — family magic-link + Google
- `/login/sent` — magic-link confirmation
- `/login/care-guide` — clinician variant

### Booking flow
- `/book` — step 1 (who is this for)
- `/book/care-moment` — step 2 (visit details, hospitalization toggle)
- `/book/guides` — step 3 (choose care guide)
- `/book/schedule` — step 4 (day + time)
- `/book/format` — step 5 (virtual/phone/in-person)
- `/book/confirmed` — step 6 (confirmation)

### Family portal
- `/dashboard` — upcoming session + prep checklist + past sessions
- `/dashboard/sessions/[id]` — past session detail with structured note
- `/dashboard/sessions/[id]/intake` — intake form
- `/dashboard/care-team`
- `/dashboard/documents`
- `/dashboard/account`

### Care guide portal
- `/advocate` — dashboard with KPIs, today's sessions, notes due
- `/advocate/cases` — case list
- `/advocate/cases/[sessionId]` — case detail with intake + scope banner + note template
- `/advocate/schedule` — Google Calendar integration UI, time blocks, time off (interactive)
- `/advocate/earnings` — payout history

### Admin console
- `/admin` — overview
- `/admin/matching` — suggested matches with scores
- `/admin/notes` — note QA queue
- `/admin/guides` — active + pending applicants
- `/admin/guides/[id]` — guide detail
- `/admin/applicants/[id]/review` — verification checklist
- `/admin/applicants/[id]/contract` — Documenso tracking
- `/admin/payouts`
- `/admin/refunds`
- `/admin/platform` — rate bands + economics
- `/admin/legal` — BAAs + policy docs

## Project structure

```
src/
├── app/                      # App Router routes
│   ├── layout.tsx            # Root layout with fonts
│   ├── globals.css           # Tailwind + component styles
│   ├── page.tsx              # Landing
│   ├── (public routes...)
│   ├── dashboard/            # Family
│   ├── advocate/             # Care guides
│   └── admin/                # Admin
├── components/
│   ├── ui/button.tsx
│   ├── logo.tsx
│   ├── top-nav.tsx           # Includes PublicNav, FamilyNav presets
│   ├── app-sidebar.tsx       # Includes AdvocateSidebar, AdminSidebar
│   ├── advocate-layout.tsx
│   ├── admin-layout.tsx
│   ├── page-header.tsx
│   ├── kpi-card.tsx
│   ├── avatar.tsx
│   ├── panel.tsx
│   ├── status-badge.tsx
│   └── case-row.tsx
└── lib/
    ├── types.ts              # Mirrors the 8-table Supabase schema
    ├── seed-data.ts          # All mock data (the layer to swap for Supabase)
    └── utils.ts              # cn() helper
```

## Design system

The Tailwind config in `tailwind.config.ts` defines the Caregma palette:

- `bg` — warm off-white background (#F5F1E8)
- `ink` — navy text (#1C2628)
- `teal` — primary action color (#0F6E56)
- `coral` — urgency / alerts (#C8553D)
- `warn`, `danger`, `line` — supporting shades

Fonts are loaded via `next/font/google` in the root layout:

- `font-serif` → Fraunces (display headings)
- `font-sans` → Geist (UI text)
- `font-mono` → Geist Mono (eyebrows, IDs)

Component classes in `globals.css`: `.btn`, `.btn-primary`, `.btn-teal`, `.btn-secondary`, `.btn-ghost`, `.panel`, `.card`, `.field-label`, `.tag`, `.eyebrow`.

## Backend hooks

| Location | Current backend hook |
| --- | --- |
| `src/app/login/page.tsx` | Supabase magic link + Google OAuth, with seed/prototype fallback if env is absent |
| `src/app/login/care-guide/page.tsx` | Supabase magic link + Google OAuth for advocates |
| Guide/admin guide data reads | `src/lib/backend/data.ts` reads Supabase, falling back to `seed-data` when unconfigured |
| Booking flow — submit | `POST /api/bookings` → create session, redirect to Stripe Checkout |
| Intake — save/submit | `POST /api/intakes` |
| Advocate notes — save/submit | `POST /api/session-notes` |
| Document upload | `POST /api/documents/upload` → private Supabase Storage |
| Calendar availability | `GET/PUT /api/advocate/availability`; OAuth token sync still needs vendor setup |

## Build order from here (the 9-slice plan)

1. **Finish form wiring** — connect booking, intake, notes, applications, documents, and availability UI to existing routes
2. **Admin mutations** — matching, note QA, guide verification, contracts, payouts, refunds
3. **Vendor setup** — Stripe Checkout/Connect, Daily.co, Postmark, Documenso, Google Calendar
4. **Hardening** — generated Supabase types, Sentry with PHI scrub, rate limiting, CSP, E2E tests, RLS audit

## HIPAA constraints (non-negotiable)

- PHI only in Supabase. **Never** in Stripe metadata, email bodies, Sentry logs, URLs, localStorage, or analytics
- Emails are notification-only: "you have a new message in Caregma" — never the message itself
- All tables RLS-enabled, default-deny
- BAAs required with every vendor handling PHI (see `/admin/legal`)

---

Built from the prototype `caregma_app_v2.html`. If something looks off, the prototype is the design source of truth — fix the Next.js version to match.
