import Link from "next/link";
import { notFound } from "next/navigation";
import { getSocietyLive } from "@/lib/societies-live";
import { DEMO_ACHIEVEMENTS, DEMO_GALLERY, DEMO_SOCIETY_DETAILS } from "@/lib/demo-data";
import { getLiveAnnouncements, getLiveEvents, getLiveOpportunities } from "@/lib/content-live";
import { getSocietyConfig } from "@/lib/society-config";
import { VerifiedBadge } from "@/components/verified-badge";
import { EmptyState } from "@/components/states";
import { FALLBACK_TEXT } from "@/lib/constants";
import { FollowButton } from "@/components/follow-button";
import { EventCard } from "@/components/event-card";
import { countOverlaps } from "@/lib/events";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const { SEED_SOCIETIES } = await import("@/lib/seed-societies");
  return SEED_SOCIETIES.map((s) => ({ slug: s.slug }));
}

export default async function SocietyHome({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<React.JSX.Element> {
  const { slug } = await params;
  const society = await getSocietyLive(slug);
  if (!society) notFound();
  const [{ events: liveEvents }, { announcements: liveAnns }, { opportunities: liveOpps }] = await Promise.all([
    getLiveEvents(),
    getLiveAnnouncements(),
    getLiveOpportunities(),
  ]);
  const config = getSocietyConfig(society);
  const events = liveEvents.filter((e) => e.societySlug === slug);
  const announcements = liveAnns.filter((a) => a.societySlug === slug);
  const opps = liveOpps.filter((o) => o.societySlug === slug && o.status !== "closed");
  const achievements = DEMO_ACHIEVEMENTS[slug] ?? [];
  const gallery = DEMO_GALLERY.filter((g) => g.societySlug === slug);
  const mission = DEMO_SOCIETY_DETAILS[slug]?.mission;
  return (
    <div>
      <section
        aria-labelledby="society-title"
        className="nsut-grid relative overflow-hidden rounded-2xl border p-8 sm:p-12"
        style={{ borderColor: "var(--hairline)", background: `linear-gradient(140deg, ${config.accentSoft}, transparent 55%)` }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-1.5"
          style={{ background: `linear-gradient(90deg, ${society.accentColor}, transparent)` }}
        />
        <p className="eyebrow">{society.category}</p>
        <div className="mt-2 flex flex-wrap items-center gap-4">
          <span aria-hidden="true" className="flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ backgroundColor: society.accentColor }}>
            {society.name.slice(0, 1)}
          </span>
          <div>
            <h1 id="society-title" className="text-4xl font-bold tracking-tighter sm:text-5xl">{society.name}</h1>
            <p className="mt-1 opacity-70">{society.shortDescription}</p>
          </div>
        </div>
        <p className="mt-4 max-w-2xl">{mission ?? society.description ?? FALLBACK_TEXT}</p>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Link href={`/societies/${slug}/events`} className="rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background">
            Explore
          </Link>
          <FollowButton slug={society.slug} name={society.name} />
          <Link href={`/societies/${slug}/opportunities`} className="rounded-full border px-5 py-2 text-sm font-medium" style={{ borderColor: "var(--hairline)" }}>
            Join
          </Link>
          <VerifiedBadge verified={society.verified} />
        </div>
      </section>

      {/* Featured event — full width */}
      <section aria-label="Featured event" className="mt-8">
        <p className="eyebrow">Featured event</p>
        <div className="mt-3">
          {events[0] ? <EventCard event={events[0]} clashCount={countOverlaps(events[0], liveEvents).length} /> : <EmptyState title="No events announced yet." />}
        </div>
        {config.socials.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            {config.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="rounded-full border px-3 py-1 opacity-80 hover:opacity-100" style={{ borderColor: "var(--hairline)" }}>
                {s.label} →
              </a>
            ))}
          </div>
        ) : null}
      </section>

      {/* About preview */}
      <section aria-label="About preview" className="mt-8">
        <p className="eyebrow">About</p>
        <p className="mt-2 max-w-2xl text-lg leading-relaxed">{mission ?? society.description}</p>
        <Link href={`/societies/${slug}/about`} className="mt-2 inline-block text-sm underline underline-offset-4">More about {society.name}</Link>
      </section>

      {/* Updates + opportunities */}
      <div className="mt-8 grid gap-8 md:grid-cols-5">
        <section aria-label="Latest updates" className="md:col-span-3">
          <p className="eyebrow">Latest updates</p>
          <div className="mt-3 space-y-3">
            {announcements.length === 0 ? <EmptyState title="No announcements yet." /> : announcements.slice(0, 3).map((a) => (
              <article key={a.id} className="panel rounded-2xl p-4">
                <p className="font-semibold">{a.pinned ? "📌 " : ""}{a.title}</p>
                <p className="text-sm opacity-70">{a.body}</p>
              </article>
            ))}
          </div>
          <Link href={`/societies/${slug}/updates`} className="mt-3 inline-block text-sm underline underline-offset-4">All updates</Link>
        </section>
        <section aria-label="Open opportunities" className="md:col-span-2">
          <p className="eyebrow">Open opportunities</p>
          <div className="mt-3 space-y-3">
            {opps.length === 0 ? <EmptyState title="No open opportunities right now." /> : opps.slice(0, 2).map((o) => (
              <article key={o.id} className="panel rounded-2xl p-4">
                <p className="text-xs opacity-60">{o.type}</p>
                <p className="font-semibold">{o.title}</p>
              </article>
            ))}
          </div>
          <Link href={`/societies/${slug}/opportunities`} className="mt-3 inline-block text-sm underline underline-offset-4">All opportunities</Link>
        </section>
      </div>

      {/* Team preview strip */}
      <section aria-label="Team preview" className="mt-8">
        <p className="eyebrow">Team</p>
        {society.departments.length > 0 ? (
          <ul className="mt-3 flex flex-wrap gap-2">
            {society.departments.slice(0, 6).map((d) => (
              <li key={d} className="rounded-full border px-3 py-1 text-sm" style={{ borderColor: "var(--hairline)" }}>{d}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm opacity-60">Team details coming soon.</p>
        )}
        <Link href={`/societies/${slug}/team`} className="mt-3 inline-block text-sm underline underline-offset-4">Meet the team</Link>
      </section>

      {/* Gallery + achievements strips */}
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <section aria-label="Latest achievement">
          <p className="eyebrow">Latest achievement</p>
          <div className="mt-3">
            {achievements[0] ? <p className="text-sm">{achievements[0].icon} {achievements[0].title} ({achievements[0].year})</p> : <EmptyState title="No achievements yet." />}
          </div>
          <Link href={`/societies/${slug}/achievements`} className="mt-3 inline-block text-sm underline underline-offset-4">Full timeline</Link>
        </section>
        <section aria-label="Featured gallery">
          <p className="eyebrow">Featured gallery</p>
          <div className="mt-3">
            {gallery[0] ? <p className="text-sm">{gallery[0].title} · {gallery[0].year}</p> : <EmptyState title="Memories are coming soon." />}
          </div>
          <Link href={`/societies/${slug}/gallery`} className="mt-3 inline-block text-sm underline underline-offset-4">Open gallery</Link>
        </section>
      </div>
    </div>
  );
}
