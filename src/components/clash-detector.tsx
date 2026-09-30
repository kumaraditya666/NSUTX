import type { EventItem } from "@/types/society";
import { detectClashes } from "@/lib/events";

export function ClashDetector({ events }: { events: EventItem[] }): React.JSX.Element {
  const groups = detectClashes(events);
  if (groups.length === 0) return <p className="text-sm opacity-60">No overlaps detected.</p>;
  return (
    <div className="space-y-3" role="alert">
      {groups.map((g) => (
        <div key={g.key} className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4">
          <p className="font-semibold">⚠ {g.events.length} events overlap at this time.</p>
          <ul className="mt-2 text-sm">
            {g.events.map((e) => (
              <li key={e.id}>• {e.title} — {e.societyName} · {e.venue}</li>
            ))}
          </ul>
          <p className="mt-1 text-xs opacity-70">Admins decide. Never auto-cancel.</p>
        </div>
      ))}
    </div>
  );
}
