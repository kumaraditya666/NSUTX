import { notFound } from "next/navigation";
import { getSocietyLive } from "@/lib/societies-live";
import { getLiveOpportunities } from "@/lib/content-live";
import { OpportunityCard } from "@/components/opportunity-card";
import { EmptyState } from "@/components/states";

export default async function SocietyOpportunities({ params }: { params: Promise<{ slug: string }> }): Promise<React.JSX.Element> {
  const { slug } = await params;
  if (!await getSocietyLive(slug)) notFound();
  const { opportunities } = await getLiveOpportunities();
  const list = opportunities.filter((o) => o.societySlug === slug);
  return (
    <div>
      <h1 className="text-2xl font-bold">Opportunities</h1>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {list.length === 0 ? <EmptyState title="No open opportunities right now." /> : list.map((o) => (<OpportunityCard key={o.id} opportunity={o} />))}
      </div>
    </div>
  );
}
