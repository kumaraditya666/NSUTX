import Link from "next/link";
import type { EventItem } from "@/types/society";
import { Badge } from "@/components/ui/badge";
import { formatTime, minutesUntil } from "@/lib/events";
import { cn } from "@/lib/utils";

export function EventCard({ event, clashCount = 0 }: { event: EventItem; clashCount?: number }): React.JSX.Element {
  return (
    <article className="rounded-2xl border border-black/10 p-5 dark:border-white/10">
      <div className="flex flex-wrap items-center gap-2">
        {event.status === "live" ? <Badge variant="live">🔴 LIVE</Badge> : null}
        {event.status === "starting-soon" ? <Badge variant="soon">🟡 Starting in {minutesUntil(event.startsAt)} min</Badge> : null}
        {event.registrationOpen ? <Badge variant="open">🟢 Registration open</Badge> : null}
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
