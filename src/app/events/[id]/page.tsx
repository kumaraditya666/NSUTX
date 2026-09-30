import Link from "next/link";
import { notFound } from "next/navigation";
import { DEMO_EVENTS } from "@/lib/demo-data";
import { countOverlaps, formatTime } from "@/lib/events";
import { RegisterButton } from "@/components/register-button";
import { Badge } from "@/components/ui/badge";

export async function generateStaticParams(): Promise<{ id: string }[]> {
  return DEMO_EVENTS.map((e) => ({ id: e.id }));
}

export default async function EventDetail({ params }: { params: Promise<{ id: string }> }): Promise<React.JSX.Element> {
  const { id } = await params;
  const event = DEMO_EVENTS.find((e) => e.id === id);
  if (!event) notFound();
  const clashes = countOverlaps(event, DEMO_EVENTS);
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="flex gap-2">
        <Badge variant={event.status === "live" ? "live" : "open"}>{event.status}</Badge>
        {event.registrationOpen ? <Badge variant="open">Registration open</Badge> : null}
      </div>
      <h1 className="mt-3 text-3xl font-bold">{event.title}</h1>
      <p className="mt-1 opacity-70">{event.societyName} · {event.venue}</p>
      <p className="text-sm opacity-70">{formatTime(event.startsAt)} → {formatTime(event.endsAt)}</p>
      <dl className="mt-4 grid gap-2 text-sm">
        <div><dt className="opacity-60">Eligibility</dt><dd>{event.eligibility ?? "Information coming soon."}</dd></div>
        <div><dt className="opacity-60">Capacity</dt><dd>{event.capacity ?? "Information coming soon."}</dd></div>
      </dl>
      {clashes.length > 0 ? (
        <div role="alert" className="mt-4 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4">
          <p className="font-semibold">WARNING: This event overlaps with {clashes.length} existing event(s).</p>
          <ul className="text-sm">{clashes.map((c) => (<li key={c.id}>• {c.title} — {c.societyName} · {c.venue}</li>))}</ul>
        </div>
      ) : null}
      <div className="mt-6 flex gap-2">
        <RegisterButton event={event} />
        <Link href={`/societies/${event.societySlug}`} className="rounded-full border px-5 py-2 text-sm">Society page</Link>
      </div>
      <div className="mt-6"><Link href="/events" className="underline underline-offset-4">Back to events</Link></div>
    </div>
  );
}
