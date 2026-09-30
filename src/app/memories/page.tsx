import { MemoryWall } from "@/components/memory-achievements";
import { SectionHeading } from "@/components/states";
import { DEMO_GALLERY } from "@/lib/demo-data";
import { getLiveSocieties } from "@/lib/societies-live";

export default async function MemoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ society?: string; year?: string; kind?: string }>;
}): Promise<React.JSX.Element> {
  const params = await searchParams;
  const society = params.society ?? "";
  const year = params.year ? Number(params.year) : undefined;
  const kind = params.kind ?? "";
  const [{ societies }] = await Promise.all([getLiveSocieties()]);
  const years = [...new Set(DEMO_GALLERY.map((g) => g.year))].sort((a, b) => b - a);
  const kinds = [...new Set(DEMO_GALLERY.map((g) => g.kind))].sort();
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <SectionHeading title="Memory Wall" description="Photos · Videos · Posters · Aftermovies. Click any memory to open its gallery." />
      <form method="get" className="mb-6 flex flex-col gap-2 sm:flex-row" role="search" aria-label="Filter memories">
        <label htmlFor="mem-society" className="sr-only">Filter by society</label>
        <select id="mem-society" name="society" defaultValue={society} className="h-11 rounded-full border border-black/15 bg-transparent px-4 dark:border-white/20">
          <option value="">All societies</option>
          {societies.map((s) => (
            <option key={s.slug} value={s.slug}>{s.name}</option>
          ))}
        </select>
        <label htmlFor="mem-year" className="sr-only">Filter by year</label>
        <select id="mem-year" name="year" defaultValue={params.year ?? ""} className="h-11 rounded-full border border-black/15 bg-transparent px-4 dark:border-white/20">
          <option value="">All years</option>
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <label htmlFor="mem-kind" className="sr-only">Filter by media type</label>
        <select id="mem-kind" name="kind" defaultValue={kind} className="h-11 rounded-full border border-black/15 bg-transparent px-4 dark:border-white/20">
          <option value="">All media</option>
          {kinds.map((k) => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>
        <button type="submit" className="h-11 rounded-full bg-foreground px-5 text-background">Filter</button>
      </form>
      <MemoryWall
        {...(society ? { societySlug: society } : {})}
        {...(year !== undefined ? { year } : {})}
        {...(kind ? { kind } : {})}
      />
    </div>
  );
}
