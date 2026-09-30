import Link from "next/link";
import { universalSearch } from "@/lib/search";
import { SectionHeading } from "@/components/states";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }): Promise<React.JSX.Element> {
  const { q } = await searchParams;
  const results = universalSearch(q ?? "");
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <SectionHeading title="Universal Search" description="Fuzzy search across societies, events, updates, opportunities, gallery. Press Ctrl+K anywhere." />
      <form method="get" role="search" className="mb-6">
        <label htmlFor="search-q" className="sr-only">Search NSUT Hub</label>
        <input id="search-q" name="q" defaultValue={q ?? ""} placeholder='Try "photography"…' className="h-12 w-full rounded-2xl border border-black/15 bg-transparent px-4 dark:border-white/20" />
      </form>
      {(q ?? "").trim().length === 0 ? <p className="opacity-70">Type to search demo data.</p> : (
        <div className="space-y-6">
          <section><h2 className="font-semibold">Societies ({results.societies.length})</h2>
            {results.societies.map((s) => (<Link key={s.slug} href={`/societies/${s.slug}`} className="block py-1 underline-offset-4 hover:underline">{s.name}</Link>))}</section>
          <section><h2 className="font-semibold">Events ({results.events.length})</h2>
            {results.events.map((e) => (<Link key={e.id} href={`/events/${e.id}`} className="block py-1 underline-offset-4 hover:underline">{e.title} — {e.societyName}</Link>))}</section>
          <section><h2 className="font-semibold">Opportunities ({results.opportunities.length})</h2>
            {results.opportunities.map((o) => (<p key={o.id} className="py-1">{o.title} — {o.societyName}</p>))}</section>
          <section><h2 className="font-semibold">Memories ({results.gallery.length})</h2>
            {results.gallery.map((g) => (<p key={g.id} className="py-1">{g.title} · {g.year}</p>))}</section>
        </div>
      )}
    </div>
  );
}
