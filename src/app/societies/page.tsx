import { getLiveSocieties } from "@/lib/societies-live";
import { SocietyCard } from "@/components/society-card";
import { SectionHeading } from "@/components/states";

export default async function SocietiesPage(): Promise<React.JSX.Element> {
  const { societies, live } = await getLiveSocieties();
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <SectionHeading
        title="All Societies"
        description={live ? `Live from Supabase (${societies.length}). Add new societies via admin.` : "Data-driven directory. Add new societies via seed or Supabase."}
      />
      <p className="mb-4 text-xs opacity-60" role="status">{live ? "● Live database" : "○ Demo fallback"}</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {societies.map((s) => (
          <SocietyCard key={s.slug} society={s} />
        ))}
      </div>
    </div>
  );
}
