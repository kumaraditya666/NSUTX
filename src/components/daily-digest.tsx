import { DEMO_ANNOUNCEMENTS, DEMO_EVENTS, DEMO_OPPORTUNITIES } from "@/lib/demo-data";
import type { Announcement, EventItem, Opportunity } from "@/types/society";
import { formatTime } from "@/lib/events";

export function DailyDigest({
  personalizedSlugs = [],
  events,
  announcements,
  opportunities,
}: {
  personalizedSlugs?: string[];
  events?: EventItem[];
  announcements?: Announcement[];
  opportunities?: Opportunity[];
}): React.JSX.Element {
  const all = events ?? DEMO_EVENTS;
  const anns = announcements ?? DEMO_ANNOUNCEMENTS;
  const opps = opportunities ?? DEMO_OPPORTUNITIES;
  const filtered = personalizedSlugs.length > 0 ? all.filter((e) => personalizedSlugs.includes(e.societySlug)) : all;
  return (
    <div className="panel rounded-2xl p-6">
      <p className="eyebrow text-center">NSUT Daily</p>
      <div className="mt-4 grid gap-2 text-sm sm:grid-cols-4">
        <p>🔥 {filtered.length} Events</p>
        <p>📢 {anns.length} Updates</p>
        <p>📝 {all.filter((e) => e.registrationOpen).length} Open Registrations</p>
        <p>💼 {opps.length} Opportunities</p>
      </div>
      <h3 className="mt-6 font-semibold">Up next</h3>
      <ul className="mt-2 space-y-2">
        {filtered.slice(0, 4).map((e) => (
          <li key={e.id} className="flex justify-between gap-3 text-sm">
            <span>{formatTime(e.startsAt)}</span>
            <span className="font-medium">{e.title}</span>
            <span className="opacity-60">{e.societyName}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
