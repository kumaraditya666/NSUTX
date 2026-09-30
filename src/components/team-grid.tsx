import { DEMO_TEAM } from "@/lib/demo-data";
import { FALLBACK_TEXT } from "@/lib/constants";

export function TeamGrid({ societySlug }: { societySlug: string }): React.JSX.Element {
  const team = DEMO_TEAM[societySlug] ?? [];
  if (team.length === 0) {
    return <p className="rounded-2xl border border-dashed p-8 text-center text-sm opacity-70">{FALLBACK_TEXT} Team published by society admins after verification.</p>;
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {team.map((m) => (
        <article key={`${m.role}-${m.name}`} className="rounded-2xl border border-black/10 p-5 dark:border-white/10">
          <div aria-hidden="true" className="flex h-14 w-14 items-center justify-center rounded-full bg-black/10 text-xl dark:bg-white/10">👤</div>
          <h3 className="mt-2 font-bold">{m.role}</h3>
          <p className="text-sm">{m.name}</p>
          <p className="text-xs opacity-60">{m.department}</p>
        </article>
      ))}
    </div>
  );
}
