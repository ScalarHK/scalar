-- Founder Systems Audit results table
-- Run this in the Supabase SQL Editor for project ecahrbpuawesdynkqdlg

create table if not exists public.audit_results (
  id                    uuid primary key default gen_random_uuid(),
  audit_id              uuid not null unique,
  total_score           smallint not null default 0 check (total_score between 0 and 300),
  band                  text not null default 'chaos' check (band in ('chaos','messy','growth','scalable')),
  section_scores        jsonb not null default '{}',
  answers               jsonb not null default '{}',

  -- Contact (filled after email capture)
  email                 text,
  first_name            text,
  company_name          text,
  website_or_linkedin   text,
  founder_type          text,
  wants_score_feedback  text,
  consent_given         boolean default false,

  -- Tracking
  referrer_url          text,
  landing_page_url      text,
  started_at            timestamptz,
  completed_at          timestamptz,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

-- Indexes
create index if not exists idx_audit_results_email  on public.audit_results (email);
create index if not exists idx_audit_results_band   on public.audit_results (band);
create index if not exists idx_audit_results_created on public.audit_results (created_at desc);

-- Auto-update updated_at
create or replace function public.handle_audit_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists audit_results_updated_at on public.audit_results;
create trigger audit_results_updated_at
  before update on public.audit_results
  for each row execute function public.handle_audit_updated_at();

-- RLS: service role only (matches waitlist pattern)
alter table public.audit_results enable row level security;

-- No anon/authenticated policies — service_role key bypasses RLS
