import type { Opportunity } from "@/types/society";
import { Badge } from "@/components/ui/badge";

export function OpportunityCard({ opportunity }: { opportunity: Opportunity }): React.JSX.Element {
  return (
    <article className="rounded-2xl border border-black/10 p-5 dark:border-white/10">
      <div className="flex flex-wrap gap-2">
        <Badge variant={opportunity.status === "open" ? "open" : opportunity.status === "closing-soon" ? "soon" : "muted"}>{opportunity.status}</Badge>
        <Badge variant="muted">{opportunity.type}</Badge>
      </div>
      <h3 className="mt-2 font-bold">{opportunity.title}</h3>
      <p className="text-sm opacity-70">{opportunity.societyName} · {opportunity.description}</p>
      <p className="mt-2 text-xs opacity-60">
        {opportunity.deadline ? `Deadline: ${new Date(opportunity.deadline).toLocaleDateString("en-IN")}` : "Deadline: TBA"}
        {opportunity.eligibility ? ` · ${opportunity.eligibility}` : ""}
      </p>
    </article>
  );
}
