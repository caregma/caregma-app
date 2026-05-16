# Caregma Backend Foundation

This app now has a production-shaped backend foundation while preserving seed-data fallback for local UI review.

## What was added

- Supabase SSR/browser/admin clients
- Supabase auth callback route and session-refresh middleware
- Initial Supabase migration with tables, enums, RLS, storage bucket, and platform defaults
- Typed backend data layer that reads Supabase when configured and falls back to `src/lib/seed-data.ts`
- API routes for booking, intake save/submit, session notes, document upload, advocate availability, guide applications, and Stripe webhooks
- Environment template in `.env.example`

## Setup

1. Install dependencies after package manager access is available:

```bash
npm install
```

2. Create a Supabase project and fill:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

3. Apply the migration:

```bash
supabase db push
```

4. Configure auth redirect URLs in Supabase:

```text
http://localhost:3000/auth/callback
https://your-domain.com/auth/callback
```

5. Add Stripe keys when ready:

```bash
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

## HIPAA guardrails in this foundation

- PHI stays in Supabase tables/storage.
- Stripe metadata only stores `session_id`; patient details are not sent to Stripe.
- Document storage bucket is private with RLS-backed access policies.
- API routes check role ownership before writes.
- Calendar/email/video/Documenso credentials are placeholders until BAAs and vendor setup are complete.

## Next implementation passes

- Wire booking pages to persist draft state and call `POST /api/bookings`.
- Wire intake and note forms to their API routes.
- Add admin actions for matching, note approval, refunds, guide verification, and contract status.
- Generate Supabase types from the live project after migration and replace the hand-authored table map.
- Add E2E tests for auth, booking, RLS, and note approval.
