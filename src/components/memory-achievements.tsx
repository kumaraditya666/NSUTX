import { DEMO_ACHIEVEMENTS, DEMO_GALLERY, type DemoAchievement } from "@/lib/demo-data";

export function MemoryWall({ societySlug, year, category }: { societySlug?: string; year?: number; category?: string }): React.JSX.Element {
  const items = DEMO_GALLERY.filter((g) => {
    if (societySlug && g.societySlug !== societySlug) return false;
    if (year && g.year !== year) return false;
    if (category && g.category !== category) return false;
    return true;
  });
  if (items.length === 0) {
    return <p className="rounded-2xl border border-dashed p-8 text-center text-sm opacity-70">Gallery coming soon.</p>;
  }
  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
      {items.map((g, i) => (
        <figure key={g.id} className="mb-4 break-inside-avoid rounded-2xl border border-black/10 p-4 dark:border-white/10" style={{ minHeight: 120 + ((i * 37) % 80) }}>
          <div aria-hidden="true" className="flex h-24 items-center justify-center rounded-xl bg-black/5 text-3xl dark:bg-white/10">
            {g.kind === "video" ? "🎬" : g.kind === "poster" ? "🖼️" : "📸"}
          </div>
          <figcaption className="mt-2 text-sm font-medium">{g.title}</figcaption>
          <p className="text-xs opacity-60">{g.societyName} · {g.year}</p>
        </figure>
      ))}
    </div>
  );
}

export function AchievementTimeline({ societySlug }: { societySlug: string }): React.JSX.Element {
  const list: DemoAchievement[] = DEMO_ACHIEVEMENTS[societySlug] ?? [];
  if (list.length === 0) {
    return <p className="rounded-2xl border border-dashed p-8 text-center text-sm opacity-70">No achievements yet. Historical archive — no rankings.</p>;
  }
  return (
    <ol className="space-y-4">
      {list.map((a) => (
        <li key={`${a.year}-${a.title}`} className="flex gap-3 rounded-2xl border border-black/10 p-4 dark:border-white/10">
          <span aria-hidden="true" className="text-2xl">{a.icon}</span>
          <div>
            <p className="text-xs opacity-60">{a.year}</p>
            <p className="font-semibold">{a.title}</p>
            <p className="text-sm opacity-70">{a.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
