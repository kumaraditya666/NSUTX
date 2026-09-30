import { getLiveSocieties } from "@/lib/societies-live";
import { getLiveEvents, getLiveOpportunities } from "@/lib/content-live";
import { buildCardActivity } from "@/lib/society-config";
import { SocietyCard } from "@/components/society-card";
import { SectionHeading } from "@/components/states";
import { FindYourSociety } from "@/components/find-your-society";
import type { SocietyCategory } from "@/lib/constants";

const FILTERS: { label: string; value: "" | SocietyCategory }[] = [
  { label: "All", value: "" },
  { label: "Technical", value: "technical" },
  { label: "Cultural", value: "cultural" },
  { label: "Literary", value: "literary" },
  { label: "Automotive", value: "automotive" },
  { label: "Social Impact", value: "social" },
  { label: "Business", value: "business" },
  { label: "Sports", value: "sports" },
  { label: "Media", value: "media" },
];

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}): Promise<React.JSX.Element> {
  const params = await searchParams;
  const q = (params.q ?? "").toLowerCase();
  const category = params.category ?? "";
  const [{ societies }, { events }, { opportunities }] = await Promise.all([
    getLiveSocieties(),
    getLiveEvents(),
    getLiveOpportunities(),
  ]);
  const activityBySlug = buildCardActivity(societies, events, opportunities);
  const filtered = societies.filter((s) => {
    const matchesQ = q.length === 0 || s.name.toLowerCase().includes(q) || s.shortDescription.toLowerCase().includes(q);
    const matchesCat = category.length === 0 || s.category === category;
    return matchesQ && matchesCat;
  });
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <SectionHeading title="Explore Societies" description="Every card opens a full mini-website." />
      <form method="get" className="mb-6 flex flex-col gap-2 sm:flex-row" role="search">
        <label htmlFor="q" className="sr-only">Search societies</label>
        <input
          id="q"
          name="q"
          defaultValue={params.q ?? ""}
          placeholder="Search societies…"
          className="h-11 flex-1 rounded-full border border-black/15 bg-transparent px-4 dark:border-white/20"
        />
        <label htmlFor="category" className="sr-only">Filter by category</label>
        <select
          id="category"
          name="category"
          defaultValue={category}
          className="h-11 rounded-full border border-black/15 bg-transparent px-4 dark:border-white/20"
        >
          {FILTERS.map((c) => (
            <option key={c.label} value={c.value}>{c.label}</option>
          ))}
        </select>
        <button type="submit" className="h-11 rounded-full bg-foreground px-5 text-background">Filter</button>
      </form>
      <p className="mb-4 text-sm opacity-70" role="status">{filtered.length} societies</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => {
          const activity = activityBySlug.get(s.slug);
          return activity === undefined ? (
            <SocietyCard key={s.slug} society={s} />
          ) : (
            <SocietyCard key={s.slug} society={s} activity={activity} />
          );
        })}
      </div>
      <div className="mt-10">
        <FindYourSociety />
      </div>
    </div>
  );
}
