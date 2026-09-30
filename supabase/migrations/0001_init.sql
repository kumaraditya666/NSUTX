-- NSUT Hub Phase 1 schema. Apply with Supabase SQL editor or `supabase db push`.
-- All tables have RLS enabled. Policies follow least-privilege.

-- Roles
do $$ begin
  create type app_role as enum ('super_admin', 'society_admin', 'society_editor', 'user');
exception when duplicate_object then null; end $$;

-- Profiles (extends auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  year text,
  created_at timestamptz default now()
);
alter table public.profiles enable row level security;

-- Societies
create table if not exists public.societies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  category text not null,
  description text default 'Information coming soon.',
  logo_url text,
  cover_url text,
  accent_color text default '#0ea5e9',
  website text,
  email text,
  recruitment_status text default 'unknown',
  created_year int,
  verified boolean default false,
  created_at timestamptz default now()
);
alter table public.societies enable row level security;

-- Society admins
create table if not exists public.society_admins (
  society_id uuid references public.societies(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  role text default 'society_admin',
  approved boolean default false,
  primary key (society_id, user_id)
);
alter table public.society_admins enable row level security;

-- Departments / members / events / announcements / opportunities / gallery / achievements / follows / etc.
create table if not exists public.society_departments (
  id uuid primary key default gen_random_uuid(),
  society_id uuid references public.societies(id) on delete cascade,
  name text not null
);
alter table public.society_departments enable row level security;

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  society_id uuid references public.societies(id) on delete cascade,
  title text not null,
  description text default 'Information coming soon.',
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  venue text default 'Information coming soon.',
  registration_link text,
  registration_deadline timestamptz,
  eligibility text,
  capacity int,
  created_at timestamptz default now()
);
alter table public.events enable row level security;

create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  society_id uuid references public.societies(id) on delete cascade,
  title text not null,
  body text default '',
  pinned boolean default false,
  archived boolean default false,
  publish_at timestamptz default now(),
  created_at timestamptz default now()
);
alter table public.announcements enable row level security;

create table if not exists public.opportunities (
  id uuid primary key default gen_random_uuid(),
  society_id uuid references public.societies(id) on delete cascade,
  title text not null,
  description text default '',
  type text default 'recruitment',
  deadline timestamptz,
  eligibility text,
  application_link text,
  status text default 'open',
  created_at timestamptz default now()
);
alter table public.opportunities enable row level security;

create table if not exists public.follows (
  user_id uuid references public.profiles(id) on delete cascade,
  society_id uuid references public.societies(id) on delete cascade,
  notify boolean default true,
  primary key (user_id, society_id)
);
alter table public.follows enable row level security;

-- Public read policies (verified + unverified seed readable, writes via admins only)
drop policy if exists "public read societies" on public.societies;
create policy "public read societies" on public.societies for select to anon, authenticated using (true);

drop policy if exists "public read events" on public.events;
create policy "public read events" on public.events for select to anon, authenticated using (true);

drop policy if exists "public read announcements" on public.announcements;
create policy "public read announcements" on public.announcements for select to anon, authenticated using (true);

drop policy if exists "public read opportunities" on public.opportunities;
create policy "public read opportunities" on public.opportunities for select to anon, authenticated using (true);

drop policy if exists "public read departments" on public.society_departments;
create policy "public read departments" on public.society_departments for select to anon, authenticated using (true);
