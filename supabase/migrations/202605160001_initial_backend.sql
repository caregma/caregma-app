create extension if not exists "pgcrypto";

create type public.user_role as enum ('family', 'advocate', 'admin');
create type public.credential_type as enum ('RN', 'RN_CERT', 'NP', 'PharmD', 'MD', 'LCSW');
create type public.relationship_type as enum ('self', 'family', 'legal_caregiver');
create type public.session_format as enum ('virtual', 'phone', 'inperson');
create type public.session_status as enum (
  'pending_payment',
  'pending_match',
  'matched',
  'intake_pending',
  'ready',
  'in_progress',
  'completed',
  'note_pending',
  'approved',
  'cancelled'
);
create type public.advocate_status as enum ('pending_verification', 'contract_pending', 'active', 'deactivated');
create type public.payment_status as enum ('pending', 'paid', 'failed', 'refunded', 'partially_refunded');
create type public.payout_status as enum ('blocked', 'ready', 'scheduled', 'paid', 'failed');
create type public.refund_status as enum ('pending', 'approved', 'rejected', 'processed');

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.next_display_id(prefix text, sequence_name text)
returns text
language plpgsql
as $$
declare
  n bigint;
begin
  execute format('select nextval(%L)', sequence_name) into n;
  return prefix || '-' || lpad(n::text, 4, '0');
end;
$$;

create sequence if not exists public.session_display_seq start with 2049;
create sequence if not exists public.document_display_seq start with 21;
create sequence if not exists public.payment_display_seq start with 1;
create sequence if not exists public.payout_display_seq start with 1;
create sequence if not exists public.refund_display_seq start with 1;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text not null default '',
  phone text,
  role public.user_role not null default 'family',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.patients (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name_initial text not null default '',
  year_of_birth integer not null check (year_of_birth between 1900 and extract(year from now())::integer),
  condition_tags text[] not null default '{}',
  hospital_address text,
  is_hospitalized boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.patient_relationships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  patient_id uuid not null references public.patients(id) on delete cascade,
  relationship public.relationship_type not null,
  relationship_label text not null default '',
  verbal_consent_at timestamptz,
  created_at timestamptz not null default now(),
  unique (user_id, patient_id)
);

create table public.advocate_profiles (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  display_name text not null,
  initials text not null,
  credentials_display text not null,
  credential_type public.credential_type not null,
  license_number text not null,
  license_state text not null,
  years_experience integer not null check (years_experience >= 0),
  bio text not null default '',
  specialty_tags text[] not null default '{}',
  certifications text[] not null default '{}',
  session_rate_cents integer not null check (session_rate_cents >= 0),
  nursys_verified_at timestamptz,
  rating numeric(2,1),
  rating_count integer,
  status public.advocate_status not null default 'pending_verification',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.sessions (
  id uuid primary key default gen_random_uuid(),
  display_id text not null unique default public.next_display_id('C', 'public.session_display_seq'),
  patient_id uuid not null references public.patients(id),
  advocate_id uuid references public.advocate_profiles(user_id),
  family_user_id uuid not null references public.profiles(id),
  status public.session_status not null default 'pending_payment',
  format public.session_format not null default 'virtual',
  scheduled_at timestamptz not null,
  duration_min integer not null check (duration_min between 30 and 180),
  clinician_rate_cents integer not null check (clinician_rate_cents >= 0),
  platform_fee_cents integer not null check (platform_fee_cents >= 0),
  total_cents integer not null check (total_cents >= 0),
  service_type text not null,
  appointment_date timestamptz not null,
  appointment_provider text not null,
  family_goals text not null,
  stripe_checkout_session_id text,
  daily_room_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.intakes (
  session_id uuid primary key references public.sessions(id) on delete cascade,
  concerns text not null,
  goals text[] not null default '{}',
  medications text not null default '',
  prior_visit_notes text,
  submitted_at timestamptz,
  updated_at timestamptz not null default now()
);

create table public.session_notes (
  session_id uuid primary key references public.sessions(id) on delete cascade,
  plain_language_summary text not null,
  questions_raised text[] not null default '{}',
  suggested_followups text[] not null default '{}',
  submitted_at timestamptz,
  approved_at timestamptz,
  returned_at timestamptz,
  qa_feedback text,
  updated_at timestamptz not null default now()
);

create table public.documents (
  id uuid primary key default gen_random_uuid(),
  display_id text not null unique default public.next_display_id('DOC', 'public.document_display_seq'),
  owner_user_id uuid not null references public.profiles(id),
  related_session_id uuid references public.sessions(id) on delete set null,
  filename text not null,
  storage_path text not null unique,
  mime_type text not null,
  size_bytes integer not null check (size_bytes >= 0),
  uploaded_at timestamptz not null default now()
);

create table public.advocate_availability_blocks (
  id uuid primary key default gen_random_uuid(),
  advocate_id uuid not null references public.advocate_profiles(user_id) on delete cascade,
  weekday integer not null check (weekday between 0 and 6),
  start_time time not null,
  end_time time not null,
  timezone text not null default 'America/Chicago',
  repeats_weekly boolean not null default true,
  created_at timestamptz not null default now(),
  check (start_time < end_time)
);

create table public.advocate_time_off (
  id uuid primary key default gen_random_uuid(),
  advocate_id uuid not null references public.advocate_profiles(user_id) on delete cascade,
  starts_on date not null,
  ends_on date not null,
  reason text,
  sync_to_calendar boolean not null default true,
  created_at timestamptz not null default now(),
  check (starts_on <= ends_on)
);

create table public.calendar_connections (
  id uuid primary key default gen_random_uuid(),
  advocate_id uuid not null references public.advocate_profiles(user_id) on delete cascade,
  provider text not null check (provider in ('google', 'microsoft', 'ical')),
  provider_account_email text,
  encrypted_refresh_token text,
  last_synced_at timestamptz,
  disconnected_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  display_id text not null unique default public.next_display_id('PMT', 'public.payment_display_seq'),
  session_id uuid not null references public.sessions(id),
  family_user_id uuid not null references public.profiles(id),
  stripe_payment_intent_id text,
  stripe_checkout_session_id text,
  amount_cents integer not null,
  status public.payment_status not null default 'pending',
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.payouts (
  id uuid primary key default gen_random_uuid(),
  display_id text not null unique default public.next_display_id('PAY', 'public.payout_display_seq'),
  advocate_id uuid not null references public.advocate_profiles(user_id),
  session_id uuid references public.sessions(id),
  amount_cents integer not null,
  status public.payout_status not null default 'blocked',
  stripe_transfer_id text,
  scheduled_for date,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.refunds (
  id uuid primary key default gen_random_uuid(),
  display_id text not null unique default public.next_display_id('REF', 'public.refund_display_seq'),
  session_id uuid not null references public.sessions(id),
  requested_by uuid not null references public.profiles(id),
  amount_cents integer not null,
  reason text not null,
  status public.refund_status not null default 'pending',
  stripe_refund_id text,
  processed_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.platform_settings (
  key text primary key,
  value jsonb not null,
  updated_by uuid references public.profiles(id),
  updated_at timestamptz not null default now()
);

create table public.audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references public.profiles(id),
  action text not null,
  entity_table text not null,
  entity_id text not null,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create or replace function public.current_user_role()
returns public.user_role
stable
language sql
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid()
$$;

create or replace function public.is_admin()
returns boolean
stable
language sql
security definer
set search_path = public
as $$
  select coalesce(public.current_user_role() = 'admin', false)
$$;

create or replace function public.is_related_to_patient(patient uuid)
returns boolean
stable
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.patient_relationships
    where patient_relationships.patient_id = patient
    and patient_relationships.user_id = auth.uid()
  )
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce((new.raw_user_meta_data ->> 'role')::public.user_role, 'family')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create trigger profiles_set_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger patients_set_updated_at before update on public.patients for each row execute function public.set_updated_at();
create trigger advocate_profiles_set_updated_at before update on public.advocate_profiles for each row execute function public.set_updated_at();
create trigger sessions_set_updated_at before update on public.sessions for each row execute function public.set_updated_at();
create trigger intakes_set_updated_at before update on public.intakes for each row execute function public.set_updated_at();
create trigger session_notes_set_updated_at before update on public.session_notes for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.patients enable row level security;
alter table public.patient_relationships enable row level security;
alter table public.advocate_profiles enable row level security;
alter table public.sessions enable row level security;
alter table public.intakes enable row level security;
alter table public.session_notes enable row level security;
alter table public.documents enable row level security;
alter table public.advocate_availability_blocks enable row level security;
alter table public.advocate_time_off enable row level security;
alter table public.calendar_connections enable row level security;
alter table public.payments enable row level security;
alter table public.payouts enable row level security;
alter table public.refunds enable row level security;
alter table public.platform_settings enable row level security;
alter table public.audit_events enable row level security;

create policy "profiles self or admin read" on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy "profiles self update" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());
create policy "profiles admin all" on public.profiles for all using (public.is_admin()) with check (public.is_admin());

create policy "patients related family or assigned advocate read" on public.patients
for select using (
  public.is_admin()
  or public.is_related_to_patient(id)
  or exists (select 1 from public.sessions where sessions.patient_id = patients.id and sessions.advocate_id = auth.uid())
);
create policy "patients family insert" on public.patients for insert with check (public.current_user_role() = 'family');
create policy "patients related family update" on public.patients for update using (public.is_related_to_patient(id) or public.is_admin());

create policy "relationships own or admin read" on public.patient_relationships for select using (user_id = auth.uid() or public.is_admin());
create policy "relationships own insert" on public.patient_relationships for insert with check (user_id = auth.uid() or public.is_admin());
create policy "relationships own update" on public.patient_relationships for update using (user_id = auth.uid() or public.is_admin());

create policy "active advocates public read" on public.advocate_profiles for select using (status = 'active' or user_id = auth.uid() or public.is_admin());
create policy "advocate own update" on public.advocate_profiles for update using (user_id = auth.uid() or public.is_admin());
create policy "advocate own insert" on public.advocate_profiles for insert with check (user_id = auth.uid() or public.is_admin());
create policy "advocate admin all" on public.advocate_profiles for all using (public.is_admin()) with check (public.is_admin());

create policy "sessions participant or admin read" on public.sessions
for select using (family_user_id = auth.uid() or advocate_id = auth.uid() or public.is_admin());
create policy "sessions family insert" on public.sessions for insert with check (family_user_id = auth.uid() or public.is_admin());
create policy "sessions participant update" on public.sessions
for update using (family_user_id = auth.uid() or advocate_id = auth.uid() or public.is_admin());

create policy "intakes participant read" on public.intakes
for select using (
  public.is_admin()
  or exists (select 1 from public.sessions where sessions.id = intakes.session_id and (sessions.family_user_id = auth.uid() or sessions.advocate_id = auth.uid()))
);
create policy "intakes family upsert" on public.intakes
for all using (exists (select 1 from public.sessions where sessions.id = intakes.session_id and sessions.family_user_id = auth.uid()) or public.is_admin())
with check (exists (select 1 from public.sessions where sessions.id = intakes.session_id and sessions.family_user_id = auth.uid()) or public.is_admin());

create policy "notes participant read" on public.session_notes
for select using (
  public.is_admin()
  or exists (select 1 from public.sessions where sessions.id = session_notes.session_id and (sessions.family_user_id = auth.uid() or sessions.advocate_id = auth.uid()))
);
create policy "notes advocate write" on public.session_notes
for all using (exists (select 1 from public.sessions where sessions.id = session_notes.session_id and sessions.advocate_id = auth.uid()) or public.is_admin())
with check (exists (select 1 from public.sessions where sessions.id = session_notes.session_id and sessions.advocate_id = auth.uid()) or public.is_admin());

create policy "documents participant read" on public.documents
for select using (
  owner_user_id = auth.uid()
  or public.is_admin()
  or exists (select 1 from public.sessions where sessions.id = documents.related_session_id and sessions.advocate_id = auth.uid())
);
create policy "documents owner insert" on public.documents for insert with check (owner_user_id = auth.uid() or public.is_admin());
create policy "documents owner update" on public.documents for update using (owner_user_id = auth.uid() or public.is_admin());

create policy "availability active read" on public.advocate_availability_blocks
for select using (
  public.is_admin()
  or advocate_id = auth.uid()
  or exists (select 1 from public.advocate_profiles where advocate_profiles.user_id = advocate_availability_blocks.advocate_id and advocate_profiles.status = 'active')
);
create policy "availability advocate write" on public.advocate_availability_blocks
for all using (advocate_id = auth.uid() or public.is_admin()) with check (advocate_id = auth.uid() or public.is_admin());

create policy "time off advocate read write" on public.advocate_time_off
for all using (advocate_id = auth.uid() or public.is_admin()) with check (advocate_id = auth.uid() or public.is_admin());

create policy "calendar owner only" on public.calendar_connections
for all using (advocate_id = auth.uid() or public.is_admin()) with check (advocate_id = auth.uid() or public.is_admin());

create policy "payments family or admin read" on public.payments for select using (family_user_id = auth.uid() or public.is_admin());
create policy "payments service/admin write" on public.payments for all using (public.is_admin()) with check (public.is_admin());

create policy "payouts advocate or admin read" on public.payouts for select using (advocate_id = auth.uid() or public.is_admin());
create policy "payouts admin write" on public.payouts for all using (public.is_admin()) with check (public.is_admin());

create policy "refunds requester or admin read" on public.refunds for select using (requested_by = auth.uid() or public.is_admin());
create policy "refunds requester insert" on public.refunds for insert with check (requested_by = auth.uid() or public.is_admin());
create policy "refunds admin update" on public.refunds for update using (public.is_admin()) with check (public.is_admin());

create policy "platform settings admin all" on public.platform_settings for all using (public.is_admin()) with check (public.is_admin());
create policy "audit admin read" on public.audit_events for select using (public.is_admin());
create policy "audit participant insert" on public.audit_events for insert with check (actor_user_id = auth.uid() or public.is_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'caregma-documents',
  'caregma-documents',
  false,
  10485760,
  array['application/pdf', 'image/jpeg', 'image/png']
)
on conflict (id) do nothing;

create policy "document object owner read"
on storage.objects for select
using (
  bucket_id = 'caregma-documents'
  and (
    owner = auth.uid()
    or public.is_admin()
    or exists (
      select 1 from public.documents
      join public.sessions on sessions.id = documents.related_session_id
      where documents.storage_path = storage.objects.name
      and sessions.advocate_id = auth.uid()
    )
  )
);

create policy "document object owner write"
on storage.objects for insert
with check (bucket_id = 'caregma-documents' and owner = auth.uid());

insert into public.platform_settings (key, value)
values
  ('marketplace', '{"platform_fee_percent": 20, "stripe_processing_offset_percent": 2.9}'::jsonb),
  ('operations', '{"active_state": "Texas", "match_sla_hours": 6, "note_deadline_hours": 24, "qa_requirement": "first_50_cases_per_clinician"}'::jsonb),
  ('rate_bands', '{
    "RN": {"floor": 12900, "suggested_min": 14900, "suggested_max": 17900, "ceiling": 22900},
    "RN_CERT": {"floor": 17900, "suggested_min": 22900, "suggested_max": 27900, "ceiling": 34900},
    "NP": {"floor": 17900, "suggested_min": 22900, "suggested_max": 27900, "ceiling": 34900},
    "PharmD": {"floor": 12900, "suggested_min": 14900, "suggested_max": 19900, "ceiling": 27900},
    "MD": {"floor": 29900, "suggested_min": 34900, "suggested_max": 44900, "ceiling": 59900},
    "LCSW": {"floor": 12900, "suggested_min": 14900, "suggested_max": 19900, "ceiling": 24900}
  }'::jsonb)
on conflict (key) do update set value = excluded.value, updated_at = now();
