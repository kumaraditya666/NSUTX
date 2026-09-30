-- Starter content for template review. Replace with verified society content.
-- Run after 0001 + 0002 in Supabase SQL Editor.
insert into public.events (society_id, title, description, starts_at, ends_at, venue, eligibility, capacity)
select s.id, 'ACM Workshop: Intro to Systems', 'systems basics.', now() - interval '1 hour', now() + interval '1 hour', 'CS Block', 'All NSUT students', 120 from public.societies s where s.slug = 'ieee'
union all
select s.id, 'Edge AI Workshop', 'edge AI hands-on.', now() + interval '5 hours', now() + interval '7 hours', 'APJ Hall', '1st-3rd year', 80 from public.societies s where s.slug = 'ieee'
union all
select s.id, 'Photo Walk', 'campus photo walk.', now() + interval '5 hours' + interval '30 minutes', now() + interval '7 hours', 'Admin Block', 'All levels', 60 from public.societies s where s.slug = 'junoon'
union all
select s.id, 'Markets 101', 'markets intro.', now() + interval '26 hours', now() + interval '28 hours', 'Seminar Hall', null, null from public.societies s where s.slug = 'fes';

insert into public.announcements (society_id, title, body, pinned)
select s.id, 'Edge AI workshop registrations open', '80 seats, APJ Hall.', true from public.societies s where s.slug = 'ieee'
union all
select s.id, 'Photo walk this weekend', 'Admin Block meetup.', true from public.societies s where s.slug = 'junoon'
union all
select s.id, 'Markets 101 session', 'intro session.', false from public.societies s where s.slug = 'fes';

insert into public.opportunities (society_id, title, description, type, deadline, eligibility, status)
select s.id, 'Core team applications', 'tech, PR, design, ops.', 'Core team', now() + interval '3 days', '2nd year+', 'open' from public.societies s where s.slug = 'ieee'
union all
select s.id, 'Robotics recruitment', 'mech, embedded, software.', 'Recruitment', now() + interval '1 day', null, 'closing-soon' from public.societies s where s.slug = 'ares'
union all
select s.id, 'Fest photography volunteers', 'cover Moksha.', 'Volunteers', null, null, 'open' from public.societies s where s.slug = 'junoon';

