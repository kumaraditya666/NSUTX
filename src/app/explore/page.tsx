import { CATEGORY_LABELS, SOCIETY_CATEGORIES } from "@/lib/constants";
import { getLiveSocieties } from "@/lib/societies-live";
import { SocietyCard } from "@/components/society-card";
import { SectionHeading } from "@/components/states";

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}): Promise<React.JSX.Element> {
  const params = await searchParams;
  const q = (params.q ?? "").toLowerCase();
  const category = params.category ?? "";
  const { societies, live } = await getLiveSocieties();
  const filtered = societies.filter((s) => {
    const matchesQ = q.length === 0 || s.name.toLowerCase().includes(q) || s.shortDescription.toLowerCase().includes(q);
    const matchesCat = category.length === 0 || s.category === category;
    return matchesQ && matchesCat;
  });
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <SectionHeading title="Explore Societies" description={live ? "Live from Supabase. Verification required for active status." : "Seed directory. Verification required for active status."} />
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
          <option value="">All categories</option>
          {SOCIETY_CATEGORIES.map((c) => (
            <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
          ))}
        </select>
        <button type="submit" className="h-11 rounded-full bg-foreground px-5 text-background">Filter</button>
      </form>
      <p className="mb-4 text-sm opacity-70" role="status">{filtered.length} societies</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => (
          <SocietyCard key={s.slug} society={s} />
        ))}
      </div>
    </div>
  );
}
