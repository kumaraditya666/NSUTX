import { DEMO_ANNOUNCEMENTS, DEMO_EVENTS, DEMO_OPPORTUNITIES } from "@/lib/demo-data";
import type { Announcement, EventItem, Opportunity } from "@/types/society";
import { EventCard } from "@/components/event-card";
import { countOverlaps, recentlyEnded } from "@/lib/events";

function Column({ label, children }: { label: string; children: React.ReactNode }): React.JSX.Element {
  return (
    <section aria-label={label}>
      <h3 className="mb-2 font-semibold">{label}</h3>
      {children}
    </section>
  );
}

export function LiveSection({
  filter = "all",
  events,
  announcements,
  opportunities,
}: {
  filter?: string;
  events?: EventItem[];
  announcements?: Announcement[];
  opportunities?: Opportunity[];
}): React.JSX.Element {
  const all = events ?? DEMO_EVENTS;
  const anns = announcements ?? DEMO_ANNOUNCEMENTS;
  const opps = opportunities ?? DEMO_OPPORTUNITIES;
  const inFilter = (e: EventItem): boolean =>
    filter === "all" || e.societyName.toLowerCase().includes(filter);
  // Mutually exclusive buckets — no event appears twice.
  const live = all.filter((e) => e.status === "live" && inFilter(e));
  const soon = all.filter((e) => e.status === "starting-soon" && inFilter(e));
  const upcoming = all.filter((e) => e.status === "upcoming" && inFilter(e)).slice(0, 3);
  const ended = recentlyEnded(all.filter(inFilter)).slice(0, 3);
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Column label="🔴 Live now">
          {live.length === 0 ? <p className="text-sm opacity-60">Nothing live right now.</p> : live.map((e) => (
            <EventCard key={e.id} event={e} clashCount={countOverlaps(e, all).length} />
          ))}
        </Column>
        <Column label="🟡 Starting soon">
          {soon.length === 0 ? <p className="text-sm opacity-60">Nothing starting soon.</p> : soon.map((e) => (
            <EventCard key={e.id} event={e} clashCount={countOverlaps(e, all).length} />
          ))}
        </Column>
        <Column label="📅 Upcoming">
          {upcoming.length === 0 ? <p className="text-sm opacity-60">Nothing upcoming.</p> : upcoming.map((e) => (
            <EventCard key={e.id} event={e} clashCount={countOverlaps(e, all).length} />
          ))}
        </Column>
        <Column label="🏁 Recently ended">
          {ended.length === 0 ? <p className="text-sm opacity-60">Nothing recently ended.</p> : ended.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </Column>
      </div>
      <p className="mt-3 text-xs opacity-60">{anns.length} updates · {opps.length} opportunities on NSUTX.</p>
    </div>
  );
}

