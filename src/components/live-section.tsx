import { DEMO_ANNOUNCEMENTS, DEMO_EVENTS, DEMO_OPPORTUNITIES } from "@/lib/demo-data";
import { EventCard } from "@/components/event-card";
import { countOverlaps } from "@/lib/events";

export function LiveSection({ filter = "all" }: { filter?: string }): React.JSX.Element {
  const live = DEMO_EVENTS.filter((e) => e.status === "live");
  const soon = DEMO_EVENTS.filter((e) => e.status === "starting-soon");
  const open = DEMO_EVENTS.filter((e) => e.registrationOpen);
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <section aria-label="Live now">
        <h3 className="mb-2 font-semibold">🔴 Happening now</h3>
        {live.filter((e) => filter === "all" || e.societyName.toLowerCase().includes(filter)).map((e) => (
          <EventCard key={e.id} event={e} clashCount={countOverlaps(e, DEMO_EVENTS).length} />
        ))}
        {live.length === 0 ? <p className="text-sm opacity-60">Nothing live right now.</p> : null}
      </section>
      <section aria-label="Starting soon">
        <h3 className="mb-2 font-semibold">🟡 Starting soon</h3>
        {soon.map((e) => (
          <EventCard key={e.id} event={e} clashCount={countOverlaps(e, DEMO_EVENTS).length} />
        ))}
        {soon.length === 0 ? <p className="text-sm opacity-60">Nothing starting soon.</p> : null}
      </section>
      <section aria-label="Registration open">
        <h3 className="mb-2 font-semibold">🟢 Registration open</h3>
        {open.slice(0, 3).map((e) => (
          <EventCard key={e.id} event={e} />
        ))}
        <p className="mt-3 text-xs opacity-60">{DEMO_ANNOUNCEMENTS.length} updates · {DEMO_OPPORTUNITIES.length} opportunities in demo data.</p>
      </section>
    </div>
  );
}
