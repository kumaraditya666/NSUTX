import Link from "next/link";
import { notFound } from "next/navigation";
import { getSocietyLive } from "@/lib/societies-live";
import { DEMO_ACHIEVEMENTS, DEMO_GALLERY, DEMO_SOCIETY_DETAILS } from "@/lib/demo-data";
import { getLiveAnnouncements, getLiveEvents } from "@/lib/content-live";
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
  const [{ events: liveEvents }, { announcements: liveAnns }] = await Promise.all([
    getLiveEvents(),
    getLiveAnnouncements(),
  ]);
  const events = liveEvents.filter((e) => e.societySlug === slug);
  const announcements = liveAnns.filter((a) => a.societySlug === slug);
  const achievements = DEMO_ACHIEVEMENTS[slug] ?? [];
  const gallery = DEMO_GALLERY.filter((g) => g.societySlug === slug);
  const mission = DEMO_SOCIETY_DETAILS[slug]?.mission;
  return (
    <div>
      <section
        aria-labelledby="society-title"
        className="nsut-grid relative overflow-hidden rounded-2xl border p-8 sm:p-12"
        style={{ borderColor: "var(--hairline)" }}
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

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <section aria-label="Latest announcement" className="rounded-2xl border border-black/10 p-6 dark:border-white/10">
          <h2 className="font-semibold">Latest announcement</h2>
          <div className="mt-3">
            {announcements[0] ? <div><p className="font-medium">{announcements[0].title}</p><p className="text-sm opacity-70">{announcements[0].body}</p></div> : <EmptyState title="No announcements yet." />}
          </div>
        </section>
        <section aria-label="Featured event" className="rounded-2xl border border-black/10 p-6 dark:border-white/10">
          <h2 className="font-semibold">Featured event</h2>
          <div className="mt-3">
            {events[0] ? <EventCard event={events[0]} clashCount={countOverlaps(events[0], liveEvents).length} /> : <EmptyState title="No events announced yet." />}
          </div>
        </section>
        <section aria-label="Latest achievement" className="rounded-2xl border border-black/10 p-6 dark:border-white/10">
          <h2 className="font-semibold">Latest achievement</h2>
          <div className="mt-3">
            {achievements[0] ? <p className="text-sm">{achievements[0].icon} {achievements[0].title} ({achievements[0].year})</p> : <EmptyState title="No achievements yet." />}
          </div>
        </section>
        <section aria-label="Featured gallery" className="rounded-2xl border border-black/10 p-6 dark:border-white/10">
          <h2 className="font-semibold">Featured gallery</h2>
          <div className="mt-3">
            {gallery[0] ? <p className="text-sm">{gallery[0].title} · {gallery[0].year}</p> : <EmptyState title="Memories are coming soon." />}
          </div>
        </section>
      </div>
    </div>
  );
}
