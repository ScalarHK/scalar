-- Run this in your Supabase SQL editor to create the waitlist table

create table if not exists waitlist (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  name        text,
  business_type text,
  created_at  timestamptz not null default now()
);

-- Index for fast duplicate-check lookups
create index if not exists waitlist_email_idx on waitlist (email);

-- Enable Row Level Security (no public reads)
alter table waitlist enable row level security;

-- Only the service role (server-side) can insert and read
create policy "service role full access"
  on waitlist
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
