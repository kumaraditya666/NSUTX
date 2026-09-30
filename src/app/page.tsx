import Link from "next/link";
import { SITE_HERO_LINES, SITE_HERO_SUB, SITE_HERO_TITLE } from "@/lib/constants";
import { getLiveSocieties } from "@/lib/societies-live";
import { getLiveAnnouncements, getLiveEvents, getLiveOpportunities } from "@/lib/content-live";
import { buildCardActivity } from "@/lib/society-config";
import { DEMO_GALLERY } from "@/lib/demo-data";
import { SocietyCard } from "@/components/society-card";
import { SectionHeading } from "@/components/states";
import { Button } from "@/components/ui/button";
import { HeroActions } from "@/components/hero-actions";
import { HeroVisual } from "@/components/hero-visual";
import { Reveal } from "@/components/reveal";
import { SocietyRadar } from "@/components/society-radar";
import { LiveSection } from "@/components/live-section";
import { EventCard } from "@/components/event-card";
import { InstallPrompt } from "@/components/extras";
import { countOverlaps } from "@/lib/events";

function SectionLink({ href, label }: { href: string; label: string }): React.JSX.Element {
  return (
    <Link href={href} className="text-sm font-medium opacity-70 transition-opacity hover:opacity-100">
      {label} <span aria-hidden="true">→</span>
    </Link>
  );
}

export default async function Home(): Promise<React.JSX.Element> {
  const [{ societies }, { events }, { announcements }, { opportunities }] = await Promise.all([
    getLiveSocieties(),
    getLiveEvents(),
    getLiveAnnouncements(),
    getLiveOpportunities(),
  ]);
  const activityBySlug = new Map<string, number>();
  const cardActivity = buildCardActivity(societies, events, opportunities);
  for (const s of societies) {
    const score =
      events.filter((e) => e.societySlug === s.slug && e.status !== "past").length * 3 +
      announcements.filter((a) => a.societySlug === s.slug).length * 2 +
      opportunities.filter((o) => o.societySlug === s.slug && o.status !== "closed").length * 2;
    activityBySlug.set(s.slug, Math.min(1, 0.2 + score * 0.15));
  }
  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* 1. HERO */}
      <section aria-labelledby="hero-heading" className="pb-10 pt-12 text-center sm:pt-16">
        <p className="eyebrow">Netaji Subhas University of Technology</p>
        <h1 id="hero-heading" className="mx-auto mt-3 text-6xl font-bold tracking-tighter sm:text-8xl">
          {SITE_HERO_TITLE}
        </h1>
        <p className="mx-auto mt-2 text-lg font-medium uppercase tracking-[0.2em] opacity-80 sm:text-xl">
          {SITE_HERO_SUB}
        </p>
        <div className="mx-auto mt-4 max-w-xl space-y-0.5 text-sm opacity-60">
          {SITE_HERO_LINES.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <HeroActions />
        <div className="mt-10">
          <HeroVisual />
        </div>
        <p className="mx-auto mt-4 inline-flex items-center gap-2 text-xs opacity-60">
          NSUT Delhi · Digital Campus <InstallPrompt />
        </p>
      </section>

      {/* 2. NSUT LIVE */}
      <section aria-label="NSUT Live" className="py-10">
        <div className="mb-4 flex items-end justify-between gap-4">
          <SectionHeading title="NSUT Live" description="Happening now · Starting soon · Registration open" />
          <SectionLink href="/live" label="Command center" />
        </div>
        <LiveSection events={events} announcements={announcements} opportunities={opportunities} />
      </section>

      {/* 3. TODAY AT NSUT */}
      <section aria-label="Today at NSUT" className="py-10">
        <div className="mb-4 flex items-end justify-between gap-4">
          <SectionHeading title="Today at NSUT" description="Overlap warnings on. Admins decide." />
          <SectionLink href="/events" label="All events" />
        </div>
        <div className="hscroll">
          {events.slice(0, 6).map((e) => (
            <EventCard key={e.id} event={e} clashCount={countOverlaps(e, events).length} />
          ))}
        </div>
      </section>

      {/* 4. EXPLORE */}
      <Reveal label="Explore">
        <div className="py-10">
          <div className="mb-4 flex items-end justify-between gap-4">
            <SectionHeading title="Explore" description={`${societies.length} societies · Each one a mini-website`} />
            <SectionLink href="/explore" label="All societies" />
          </div>
          <div className="hscroll">
            {societies.slice(0, 8).map((s) => {
              const activity = cardActivity.get(s.slug);
              return activity === undefined ? (
                <SocietyCard key={s.slug} society={s} />
              ) : (
                <SocietyCard key={s.slug} society={s} activity={activity} />
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* 5. NSUT RADAR */}
      <Reveal label="NSUT Radar">
        <div className="py-10">
          <div className="mb-4 flex items-end justify-between gap-4">
            <SectionHeading title="NSUT Radar" description="Activity visualization — not a ranking." />
            <SectionLink href="/explore" label="Find your society" />
          </div>
          <SocietyRadar activityBySlug={activityBySlug} />
        </div>
      </Reveal>

      {/* 6. NSUT MODE */}
      <section aria-label="NSUT Mode" className="py-10">
        <div className="panel flex flex-col gap-4 rounded-2xl p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow">Personal</p>
            <h2 className="mt-1 text-3xl font-bold tracking-tight">NSUT Mode</h2>
            <p className="mt-1 max-w-md opacity-70">
              Your year, your interests, your societies. {opportunities.length} open opportunities waiting.
            </p>
          </div>
          <Link href="/nsut-mode">
            <Button size="lg">Enter NSUT Mode</Button>
          </Link>
        </div>
      </section>

      {/* 7. MEMORY WALL */}
      <section aria-label="Memory Wall" className="py-10">
        <div className="mb-4 flex items-end justify-between gap-4">
          <SectionHeading title="Memory Wall" description="Moksha 2026 + society highlights." />
          <SectionLink href="/memories" label="All memories" />
        </div>
        <div className="hscroll">
          {DEMO_GALLERY.slice(0, 5).map((g) => (
            <div key={g.id} className="panel rounded-2xl p-5">
              <p className="font-semibold">{g.title}</p>
              <p className="mt-1 text-xs opacity-60">{g.societyName} · {g.year}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
