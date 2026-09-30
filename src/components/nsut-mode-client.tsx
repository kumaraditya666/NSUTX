"use client";

import { INTEREST_OPTIONS } from "@/lib/constants";
import { SEED_SOCIETIES } from "@/lib/seed-societies";
import { DEMO_ANNOUNCEMENTS, DEMO_EVENTS, DEMO_OPPORTUNITIES, DEMO_SOCIETY_DETAILS } from "@/lib/demo-data";
import { SocietyCard } from "@/components/society-card";
import { EventCard } from "@/components/event-card";
import { DailyDigest } from "@/components/daily-digest";
import { useNsutModeStore } from "@/stores/nsut-mode";
import { countOverlaps } from "@/lib/events";

const YEARS = ["1st", "2nd", "3rd", "4th"];

export function NsutModeClient(): React.JSX.Element {
  const year = useNsutModeStore((s) => s.year);
  const setYear = useNsutModeStore((s) => s.setYear);
  const interests = useNsutModeStore((s) => s.interests);
  const toggleInterest = useNsutModeStore((s) => s.toggleInterest);
  const followedSlugs = useNsutModeStore((s) => s.followedSlugs);

  const followed = SEED_SOCIETIES.filter((s) => followedSlugs.includes(s.slug));
  const feed = DEMO_ANNOUNCEMENTS.filter((a) => followedSlugs.includes(a.societySlug));
  const myEvents = DEMO_EVENTS.filter((e) => followedSlugs.includes(e.societySlug));
  const recommended = SEED_SOCIETIES.filter((s) => {
    if (followedSlugs.includes(s.slug)) return false;
    const tags = DEMO_SOCIETY_DETAILS[s.slug]?.interests ?? [s.category];
    return interests.length === 0 || interests.some((i) => tags.includes(i));
  }).slice(0, 3);

  return (
    <div>
      <h1 className="text-3xl font-bold">Good morning 👋</h1>
      <p className="opacity-70">Your NSUT today — live events, upcoming, society updates, registrations, opportunities.</p>

      <div className="mt-6"><DailyDigest personalizedSlugs={followedSlugs} /></div>

      <section aria-label="My events" className="mt-8">
        <h2 className="font-semibold">My Events — Registered · Upcoming · Past</h2>
        {myEvents.length === 0 ? <p className="mt-2 text-sm opacity-70">Follow societies to see their events here. Registrations save locally (Supabase sync in production).</p> : (
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            {myEvents.map((e) => (<EventCard key={e.id} event={e} clashCount={countOverlaps(e, DEMO_EVENTS).length} />))}
          </div>
        )}
      </section>

      <section aria-label="Society updates" className="mt-8">
        <h2 className="font-semibold">📢 Society updates</h2>
        {feed.length === 0 ? <p className="mt-2 text-sm opacity-70">No updates from followed societies yet.</p> : (
          <ul className="mt-2 space-y-2">
            {feed.map((a) => (<li key={a.id} className="rounded-2xl border p-3 text-sm"><strong>{a.societyName}:</strong> {a.title}</li>))}
          </ul>
        )}
      </section>

      <section aria-label="Opportunities" className="mt-8">
        <h2 className="font-semibold">💼 Opportunities for you</h2>
        <ul className="mt-2 space-y-2">
          {DEMO_OPPORTUNITIES.filter((o) => followedSlugs.includes(o.societySlug)).map((o) => (
            <li key={o.id} className="rounded-2xl border p-3 text-sm"><strong>{o.title}</strong> — {o.societyName}</li>
          ))}
        </ul>
      </section>

      <section aria-label="My societies" className="mt-8">
        <h2 className="font-semibold">My Societies</h2>
        {followed.length === 0 ? <p className="mt-2 text-sm opacity-70">Follow societies from any society page.</p> : (
          <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{followed.map((s) => (<SocietyCard key={s.slug} society={s} />))}</div>
        )}
      </section>

      <section aria-label="Recommended" className="mt-8">
        <h2 className="font-semibold">Recommended</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{recommended.map((s) => (<SocietyCard key={s.slug} society={s} />))}</div>
      </section>

      <section aria-label="Onboarding" className="mt-8">
        <h2 className="font-semibold">Year</h2>
        <div className="mt-2 flex gap-2">
          {YEARS.map((y) => (
            <button key={y} type="button" onClick={() => setYear(y)} aria-pressed={year === y} className={year === y ? "rounded-full bg-foreground px-4 py-1.5 text-sm text-background" : "rounded-full border px-4 py-1.5 text-sm"}>{y}</button>
          ))}
        </div>
        <h2 className="mt-6 font-semibold">Interests</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {INTEREST_OPTIONS.map((o) => {
            const active = interests.includes(o.id);
            return (<button key={o.id} type="button" onClick={() => toggleInterest(o.id)} aria-pressed={active} className={active ? "rounded-full bg-foreground px-3 py-1.5 text-sm text-background" : "rounded-full border px-3 py-1.5 text-sm"}><span aria-hidden="true">{o.icon} </span>{o.label}</button>);
          })}
        </div>
      </section>
    </div>
  );
}
