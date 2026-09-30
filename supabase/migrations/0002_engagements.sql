-- NSUT Hub migration 0002: registrations, team, gallery, achievements, prefs.
create table if not exists public.event_registrations (
  event_id uuid references public.events(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (event_id, user_id)
);
alter table public.event_registrations enable row level security;

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  society_id uuid references public.societies(id) on delete cascade,
  name text not null,
  role text not null,
  department text default '',
  created_at timestamptz default now()
);
alter table public.team_members enable row level security;

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  society_id uuid references public.societies(id) on delete cascade,
  title text not null,
  year int,
  category text default '',
  kind text default 'photo',
  created_at timestamptz default now()
);
alter table public.gallery_items enable row level security;

create table if not exists public.achievements (
  id uuid primary key default gen_random_uuid(),
  society_id uuid references public.societies(id) on delete cascade,
  year int not null,
  title text not null,
  detail text default '',
  created_at timestamptz default now()
);
alter table public.achievements enable row level security;

create table if not exists public.notification_prefs (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  updates boolean default true,
  deadlines boolean default true,
  events boolean default true
);
alter table public.notification_prefs enable row level security;

-- Public reads for new content tables
drop policy if exists "public read team" on public.team_members;
create policy "public read team" on public.team_members for select to anon, authenticated using (true);

drop policy if exists "public read gallery" on public.gallery_items;
create policy "public read gallery" on public.gallery_items for select to anon, authenticated using (true);

drop policy if exists "public read achievements" on public.achievements;
create policy "public read achievements" on public.achievements for select to anon, authenticated using (true);

-- Authenticated users manage own registrations/follows/prefs
drop policy if exists "own registrations" on public.event_registrations;
create policy "own registrations" on public.event_registrations for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

drop policy if exists "own follows" on public.follows;
create policy "own follows" on public.follows for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

drop policy if exists "own prefs" on public.notification_prefs;
create policy "own prefs" on public.notification_prefs for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
