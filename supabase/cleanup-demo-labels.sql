-- Remove DEMO: label prefixes from seeded content (one-time cleanup).
update public.events set description = regexp_replace(description, '^DEMO:\s*', '') where description like 'DEMO:%';
update public.announcements set body = regexp_replace(body, '^DEMO:\s*', '') where body like 'DEMO:%';
update public.opportunities set description = regexp_replace(description, '^DEMO:\s*', '') where description like 'DEMO:%';
