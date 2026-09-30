import Link from "next/link";
import { notFound } from "next/navigation";
import { DEMO_EVENTS } from "@/lib/demo-data";
import { getLiveEvents } from "@/lib/content-live";
import { countOverlaps, formatTime } from "@/lib/events";
import { RegisterButton } from "@/components/register-button";
import { EventCountdown } from "@/components/event-countdown";
import { EventCard } from "@/components/event-card";
import { Badge } from "@/components/ui/badge";

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const { events } = await getLiveEvents();
  const ids = new Set([...events.map((e) => e.id), ...DEMO_EVENTS.map((e) => e.id)]);
  return [...ids].map((id) => ({ id }));
}

export default async function EventDetail({ params }: { params: Promise<{ id: string }> }): Promise<React.JSX.Element> {
  const { id } = await params;
  const { events } = await getLiveEvents();
  const all = events.length > 0 ? events : DEMO_EVENTS;
  const event = all.find((e) => e.id === id);
  if (!event) notFound();
  const clashes = countOverlaps(event, all);
  const related = all.filter((e) => e.id !== event.id && e.societySlug === event.societySlug).slice(0, 2);
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {/* Poster */}
      <div
        aria-hidden="true"
        className="nsut-grid flex h-44 items-end rounded-2xl border p-5"
        style={{ borderColor: "var(--hairline)" }}
      >
        <div className="flex gap-2">
          <Badge variant={event.status === "live" ? "live" : "open"}><EventCountdown startsAt={event.startsAt} endsAt={event.endsAt} /></Badge>
          {event.registrationOpen ? <Badge variant="open">Registration open</Badge> : <Badge variant="muted">Registrations closed</Badge>}
        </div>
      </div>

      <p className="eyebrow mt-6">{event.societyName}</p>
      <h1 className="mt-1 text-4xl font-bold tracking-tighter">{event.title}</h1>

      <dl className="mt-6 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
        <div className="panel rounded-xl p-3"><dt className="opacity-60">Date</dt><dd className="font-semibold">{formatTime(event.startsAt)}</dd></div>
        <div className="panel rounded-xl p-3"><dt className="opacity-60">Ends</dt><dd className="font-semibold">{formatTime(event.endsAt)}</dd></div>
        <div className="panel rounded-xl p-3"><dt className="opacity-60">Venue</dt><dd className="font-semibold">{event.venue}</dd></div>
        <div className="panel rounded-xl p-3"><dt className="opacity-60">Capacity</dt><dd className="font-semibold">{event.capacity ?? "TBA"}</dd></div>
      </dl>

      <dl className="mt-4 grid gap-2 text-sm">
        <div><dt className="opacity-60">Eligibility</dt><dd>{event.eligibility ?? "Not announced"}</dd></div>
      </dl>

      {event.description ? (
        <section aria-label="About this event" className="mt-6">
          <h2 className="font-semibold">About</h2>
          <p className="mt-1 text-sm opacity-80">{event.description}</p>
        </section>
      ) : null}

      {clashes.length > 0 ? (
        <div role="alert" className="mt-4 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4">
          <p className="font-semibold">This event overlaps with {clashes.length} existing event(s).</p>
          <ul className="text-sm">{clashes.map((c) => (<li key={c.id}>• {c.title} — {c.societyName} · {c.venue}</li>))}</ul>
          <p className="mt-1 text-xs opacity-70">For society admins — never auto-cancelled.</p>
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-2">
        <RegisterButton event={event} />
        <Link href={`/societies/${event.societySlug}`} className="rounded-full border px-5 py-2 text-sm" style={{ borderColor: "var(--hairline)" }}>
          {event.societyName} →
        </Link>
      </div>

      {related.length > 0 ? (
        <section aria-label="Related events" className="mt-10">
          <h2 className="font-semibold">Related events</h2>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            {related.map((e) => (<EventCard key={e.id} event={e} />))}
          </div>
        </section>
      ) : null}

      <div className="mt-8"><Link href="/events" className="text-sm underline underline-offset-4">Back to events</Link></div>
    </div>
  );
}
