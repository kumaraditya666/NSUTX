import { EventCard } from "@/components/event-card";
import { ClashDetector } from "@/components/clash-detector";
import { SectionHeading } from "@/components/states";
import { getLiveEvents } from "@/lib/content-live";
import { countOverlaps } from "@/lib/events";

export default async function EventsPage(): Promise<React.JSX.Element> {
  const { events, live } = await getLiveEvents();
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <SectionHeading title="All Events" description="Automatic overlap detection. Admins decide — never auto-cancel." />
      <p className="mb-4 text-xs opacity-60" role="status">{live ? "● Live database" : "○ Demo fallback"}</p>
      <ClashDetector events={events} />
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {events.map((e) => (<EventCard key={e.id} event={e} clashCount={countOverlaps(e, events).length} />))}
      </div>
    </div>
  );
}
