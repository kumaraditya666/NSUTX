import { getLiveOpportunities } from "@/lib/content-live";
import { OpportunityCard } from "@/components/opportunity-card";
import { SectionHeading } from "@/components/states";
import { EmptyState } from "@/components/states";

export default async function OpportunitiesPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string; type?: string }>;
}): Promise<React.JSX.Element> {
  const { filter, type } = await searchParams;
  const f = filter ?? "all";
  const t = type ?? "all";
  const { opportunities } = await getLiveOpportunities();
  const types = [...new Set(opportunities.map((o) => o.type))].sort();
  const list = opportunities.filter((o) => {
    if (f === "open" && o.status !== "open") return false;
    if (f === "closing" && o.status !== "closing-soon") return false;
    if (t !== "all" && o.type !== t) return false;
    return true;
  });
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <SectionHeading title="Opportunities" description="Recruitment · Core Team · Volunteer · Competition · Workshop · Collaboration" />
      <div className="mb-3 flex flex-wrap gap-2 text-sm" role="group" aria-label="Status filter">
        <a href="/opportunities" className="rounded-full border px-3 py-1">All</a>
        <a href="/opportunities?filter=open" className="rounded-full border px-3 py-1">Open now</a>
        <a href="/opportunities?filter=closing" className="rounded-full border px-3 py-1">Closing soon</a>
      </div>
      <div className="mb-4 flex flex-wrap gap-2 text-sm" role="group" aria-label="Type filter">
        <a href="/opportunities" className="rounded-full border px-3 py-1">All types</a>
        {types.map((ty) => (
          <a key={ty} href={`/opportunities?type=${encodeURIComponent(ty)}`} className="rounded-full border px-3 py-1">{ty}</a>
        ))}
      </div>
      {list.length === 0 ? <EmptyState title="No open opportunities right now." /> : (
        <div className="grid gap-4 md:grid-cols-2">
          {list.map((o) => (<OpportunityCard key={o.id} opportunity={o} />))}
        </div>
      )}
    </div>
  );
}
