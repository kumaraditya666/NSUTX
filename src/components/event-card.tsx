import Link from "next/link";
import type { EventItem } from "@/types/society";
import { Badge } from "@/components/ui/badge";
import { EventCountdown } from "@/components/event-countdown";
import { formatTime, getRegistrationStatus } from "@/lib/events";
import { cn } from "@/lib/utils";

export function EventCard({ event, clashCount = 0 }: { event: EventItem; clashCount?: number }): React.JSX.Element {
  const registration = getRegistrationStatus(event);
  return (
    <article className="panel rounded-2xl p-5">
      <div className="flex flex-wrap items-center gap-2">
        {event.status === "live" ? <Badge variant="live">🔴 <EventCountdown startsAt={event.startsAt} endsAt={event.endsAt} /></Badge> : null}
        {event.status === "starting-soon" ? <Badge variant="soon">🟡 <EventCountdown startsAt={event.startsAt} endsAt={event.endsAt} /></Badge> : null}
        {event.status === "upcoming" ? <Badge variant="muted"><EventCountdown startsAt={event.startsAt} endsAt={event.endsAt} /></Badge> : null}
        <Badge variant={registration === "open" ? "open" : "muted"}>
          Registration: {registration === "open" ? "OPEN" : "CLOSED"}
        </Badge>
        {clashCount > 0 ? <Badge variant="muted">⚠ {clashCount + 1} overlap</Badge> : null}
      </div>
      <h3 className="mt-2 text-lg font-bold">{event.title}</h3>
      <p className="text-sm opacity-70">{event.societyName} · {event.venue} · {formatTime(event.startsAt)}</p>
      <div className="mt-3 flex gap-2">
        <Link href={`/events/${event.id}`} className={cn("rounded-full bg-foreground px-4 py-1.5 text-sm text-background")}>
          Register
        </Link>
        <Link href={`/societies/${event.societySlug}`} className="rounded-full border px-4 py-1.5 text-sm">
          Society
        </Link>
      </div>
    </article>
  );
}
