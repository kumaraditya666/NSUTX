import { DEMO_ANNOUNCEMENTS, DEMO_EVENTS, DEMO_OPPORTUNITIES } from "@/lib/demo-data";
import type { Announcement, EventItem, Opportunity } from "@/types/society";
import { EventCard } from "@/components/event-card";
import { countOverlaps } from "@/lib/events";

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
  const live = all.filter((e) => e.status === "live");
  const soon = all.filter((e) => e.status === "starting-soon");
  const open = all.filter((e) => e.registrationOpen);
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <section aria-label="Live now">
        <h3 className="mb-2 font-semibold">🔴 Happening now</h3>
        {live.filter((e) => filter === "all" || e.societyName.toLowerCase().includes(filter)).map((e) => (
          <EventCard key={e.id} event={e} clashCount={countOverlaps(e, all).length} />
        ))}
        {live.length === 0 ? <p className="text-sm opacity-60">Nothing live right now.</p> : null}
      </section>
      <section aria-label="Starting soon">
        <h3 className="mb-2 font-semibold">🟡 Starting soon</h3>
        {soon.map((e) => (
          <EventCard key={e.id} event={e} clashCount={countOverlaps(e, all).length} />
        ))}
        {soon.length === 0 ? <p className="text-sm opacity-60">Nothing starting soon.</p> : null}
      </section>
      <section aria-label="Registration open">
        <h3 className="mb-2 font-semibold">🟢 Registration open</h3>
        {open.slice(0, 3).map((e) => (
          <EventCard key={e.id} event={e} />
        ))}
        <p className="mt-3 text-xs opacity-60">{anns.length} updates · {opps.length} opportunities on NSUTX.</p>
      </section>
    </div>
  );
}
