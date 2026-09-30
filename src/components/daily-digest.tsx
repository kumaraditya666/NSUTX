import { DEMO_ANNOUNCEMENTS, DEMO_EVENTS, DEMO_OPPORTUNITIES } from "@/lib/demo-data";
import { formatTime } from "@/lib/events";

export function DailyDigest({ personalizedSlugs = [] }: { personalizedSlugs?: string[] }): React.JSX.Element {
  const events = personalizedSlugs.length > 0 ? DEMO_EVENTS.filter((e) => personalizedSlugs.includes(e.societySlug)) : DEMO_EVENTS;
  return (
    <div className="rounded-3xl border border-black/10 p-6 dark:border-white/10">
      <pre className="text-center text-sm font-bold" aria-hidden="true">━━━━━━━━━━━━ NSUT DAILY ━━━━━━━━━━━━</pre>
      <div className="mt-4 grid gap-2 text-sm sm:grid-cols-4">
        <p>🔥 {events.length} Events</p>
        <p>📢 {DEMO_ANNOUNCEMENTS.length} Updates</p>
        <p>📝 {DEMO_EVENTS.filter((e) => e.registrationOpen).length} Open Registrations</p>
        <p>💼 {DEMO_OPPORTUNITIES.length} Opportunities</p>
      </div>
      <h3 className="mt-6 font-semibold">Up next</h3>
      <ul className="mt-2 space-y-2">
        {events.slice(0, 4).map((e) => (
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
