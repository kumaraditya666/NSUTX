import { notFound } from "next/navigation";
import { getSocietyLive } from "@/lib/societies-live";
import { getLiveEvents } from "@/lib/content-live";
import { EventCard } from "@/components/event-card";
import { ClashDetector } from "@/components/clash-detector";
import { EmptyState } from "@/components/states";
import { countOverlaps } from "@/lib/events";
import { CreateEventForm } from "@/components/publish-forms";

export default async function SocietyEvents({ params }: { params: Promise<{ slug: string }> }): Promise<React.JSX.Element> {
  const { slug } = await params;
  const society = await getSocietyLive(slug);
  if (!society) notFound();
  const { events: all } = await getLiveEvents();
  const mine = all.filter((e) => e.societySlug === slug);
  const upcoming = mine.filter((e) => e.status !== "past");
  const past = mine.filter((e) => e.status === "past");
  return (
    <div>
      <h1 className="text-2xl font-bold">Events</h1>
      <div className="mt-4"><ClashDetector events={all} /></div>
      <CreateEventForm societySlug={slug} />
      <h2 className="mb-2 mt-6 font-semibold">Upcoming Events</h2>
      {upcoming.length === 0 ? <EmptyState title="No events announced yet." /> : <div className="grid gap-4 md:grid-cols-2">{upcoming.map((e) => (<EventCard key={e.id} event={e} clashCount={countOverlaps(e, all).length} />))}</div>}
      <h2 className="mb-2 mt-6 font-semibold">Past Events</h2>
      {past.length === 0 ? <EmptyState title="No past events." /> : <div className="grid gap-4 md:grid-cols-2">{past.map((e) => (<EventCard key={e.id} event={e} />))}</div>}
    </div>
  );
}
