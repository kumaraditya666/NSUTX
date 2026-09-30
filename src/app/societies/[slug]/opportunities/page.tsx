import { notFound } from "next/navigation";
import { getSocietyBySlug } from "@/lib/seed-societies";
import { DEMO_OPPORTUNITIES } from "@/lib/demo-data";
import { OpportunityCard } from "@/components/opportunity-card";
import { EmptyState } from "@/components/states";

export default async function SocietyOpportunities({ params }: { params: Promise<{ slug: string }> }): Promise<React.JSX.Element> {
  const { slug } = await params;
  if (!getSocietyBySlug(slug)) notFound();
  const list = DEMO_OPPORTUNITIES.filter((o) => o.societySlug === slug);
  return (
    <div>
      <h1 className="text-2xl font-bold">Opportunities</h1>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {list.length === 0 ? <EmptyState title="No recruitment currently open." /> : list.map((o) => (<OpportunityCard key={o.id} opportunity={o} />))}
      </div>
    </div>
  );
}
