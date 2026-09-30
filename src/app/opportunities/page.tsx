import { DEMO_OPPORTUNITIES } from "@/lib/demo-data";
import { OpportunityCard } from "@/components/opportunity-card";
import { SectionHeading } from "@/components/states";

export default async function OpportunitiesPage({ searchParams }: { searchParams: Promise<{ filter?: string }> }): Promise<React.JSX.Element> {
  const { filter } = await searchParams;
  const f = filter ?? "all";
  const list = DEMO_OPPORTUNITIES.filter((o) => {
    if (f === "open") return o.status === "open";
    if (f === "closing") return o.status === "closing-soon";
    return true;
  });
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <SectionHeading title="Opportunities" description="Open now · Closing soon · Technical · Cultural · Business · Creative · Social" />
      <div className="mb-4 flex gap-2 text-sm">
        <a href="/opportunities" className="rounded-full border px-3 py-1">All</a>
        <a href="/opportunities?filter=open" className="rounded-full border px-3 py-1">Open now</a>
        <a href="/opportunities?filter=closing" className="rounded-full border px-3 py-1">Closing soon</a>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {list.map((o) => (<OpportunityCard key={o.id} opportunity={o} />))}
      </div>
    </div>
  );
}
