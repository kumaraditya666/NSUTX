import Link from "next/link";
import { SITE_HERO_SUB, SITE_HERO_TITLE } from "@/lib/constants";
import { getLiveSocieties } from "@/lib/societies-live";
import { getLiveAnnouncements, getLiveEvents, getLiveOpportunities } from "@/lib/content-live";
import { DEMO_GALLERY } from "@/lib/demo-data";
import { SocietyCard } from "@/components/society-card";
import { SectionHeading } from "@/components/states";
import { Button } from "@/components/ui/button";
import { HeroActions } from "@/components/hero-actions";
import { HeroVisual } from "@/components/hero-visual";
import { SocietyRadar } from "@/components/society-radar";
import { LiveSection } from "@/components/live-section";
import { DailyDigest } from "@/components/daily-digest";
import { EventCard } from "@/components/event-card";
import { OpportunityCard } from "@/components/opportunity-card";
import { FindYourSociety } from "@/components/find-your-society";
import { EasterEgg, InstallPrompt } from "@/components/extras";
import { countOverlaps } from "@/lib/events";

export default async function Home(): Promise<React.JSX.Element> {
  const [{ societies }, { events }, { announcements }, { opportunities }] = await Promise.all([
    getLiveSocieties(),
    getLiveEvents(),
    getLiveAnnouncements(),
    getLiveOpportunities(),
  ]);
  const featured = societies.slice(0, 6);
  return (
    <div className="mx-auto max-w-6xl px-4">
      <section aria-labelledby="hero-heading" className="py-12 text-center sm:py-16">
        <HeroVisual />
        <p className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1 text-xs dark:border-white/15">
          NSUT Delhi · Digital Campus <InstallPrompt />
        </p>
        <h1 id="hero-heading" className="mx-auto mt-4 max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
          {SITE_HERO_TITLE}
        </h1>
        <p className="mx-auto mt-3 max-w-xl opacity-70">{SITE_HERO_SUB}</p>
        <HeroActions />
      </section>

      <section aria-label="NSUT Live" className="py-8">
        <SectionHeading title="NSUT Live" description="Happening now · Starting soon · Registration open" />
        <LiveSection />
        <div className="mt-3"><Link href="/live" className="underline underline-offset-4">Open Live →</Link></div>
      </section>

      <section aria-label="Society Radar" className="py-8">
        <SectionHeading title="Society Radar" description="Activity visualization — not a ranking." />
        <SocietyRadar />
      </section>

      <section aria-label="Today's Events" className="py-8">
        <SectionHeading title="Today's Events" description="Includes overlap warnings. Admins decide." />
        <div className="grid gap-4 md:grid-cols-2">
          {events.slice(0, 4).map((e) => (
            <EventCard key={e.id} event={e} clashCount={countOverlaps(e, events).length} />
          ))}
        </div>
      </section>

      <section aria-label="NSUT Daily" className="py-8">
        <SectionHeading title="NSUT Daily" description="Daily campus digest." />
        <DailyDigest />
        <div className="mt-3"><Link href="/daily" className="underline underline-offset-4">Open Daily →</Link></div>
      </section>

      <section aria-label="Trending" className="py-8">
        <SectionHeading title="Trending / Recent Updates" />
        <ul className="grid gap-3 md:grid-cols-2">
          {announcements.slice(0, 4).map((a) => (
            <li key={a.id} className="rounded-2xl border border-black/10 p-4 dark:border-white/10">
              <p className="text-xs opacity-60">{a.societyName}{a.pinned ? " · 📌" : ""}</p>
              <p className="font-semibold">{a.title}</p>
              <p className="text-sm opacity-70">{a.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Opportunities" className="py-8">
        <SectionHeading title="Open Opportunities" />
        <div className="grid gap-4 md:grid-cols-2">
          {opportunities.slice(0, 4).map((o) => (
            <OpportunityCard key={o.id} opportunity={o} />
          ))}
        </div>
        <div className="mt-4"><Link href="/opportunities"><Button variant="secondary">Browse opportunities</Button></Link></div>
      </section>

      <section aria-label="Explore" className="py-8">
        <SectionHeading title="Explore Societies" description={`${societies.length} seed entries. Admin verification required.`} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s) => (<SocietyCard key={s.slug} society={s} />))}
        </div>
        <div className="mt-4"><Link href="/explore" className="underline underline-offset-4">Explore all societies</Link></div>
      </section>

      <section aria-label="Find your society" className="py-8">
        <FindYourSociety />
      </section>

      <section aria-label="Memory Wall" className="py-8">
        <SectionHeading title="Memory Wall" description="Moksha 2026 + society highlights (demo)." />
        <div className="grid gap-3 sm:grid-cols-3">
          {DEMO_GALLERY.slice(0, 3).map((g) => (
            <div key={g.id} className="rounded-2xl border border-black/10 p-4 dark:border-white/10">
              <p className="font-semibold">{g.title}</p>
              <p className="text-xs opacity-60">{g.societyName} · {g.year}</p>
            </div>
          ))}
        </div>
        <div className="mt-3"><Link href="/search?q=moksha" className="underline underline-offset-4">Open memories →</Link></div>
      </section>

      <section aria-label="Major events" className="py-8">
        <SectionHeading title="Upcoming Major Events" />
        <div className="grid gap-3 md:grid-cols-3">
          {["Moksha", "Innovision", "Resonanz"].map((f) => (
            <div key={f} className="rounded-2xl border border-black/10 p-5 dark:border-white/10">
              <p className="font-bold">{f}</p>
              <p className="text-sm opacity-60">Information coming soon. Verified dates only.</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-label="NSUT Mode" className="py-8">
        <SectionHeading title="NSUT Mode preview" description="Personalized student dashboard." />
        <Link href="/nsut-mode"><Button>Open NSUT Mode</Button></Link>
        <div className="mt-6"><EasterEgg /></div>
      </section>
    </div>
  );
}

