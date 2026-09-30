import { notFound } from "next/navigation";
import { getSocietyBySlug } from "@/lib/seed-societies";
import { TeamGrid } from "@/components/team-grid";

export default async function SocietyTeamPage({ params }: { params: Promise<{ slug: string }> }): Promise<React.JSX.Element> {
  const { slug } = await params;
  const society = getSocietyBySlug(slug);
  if (!society) notFound();
  return (
    <div>
      <h1 className="text-2xl font-bold">Team</h1>
      <p className="text-sm opacity-60">President · VP · Secretaries · Departments (configurable per society).</p>
      {society.departments.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {society.departments.map((d) => (<li key={d} className="rounded-full border px-3 py-1 text-sm">{d}</li>))}
        </ul>
      ) : null}
      <div className="mt-4"><TeamGrid societySlug={slug} /></div>
    </div>
  );
}
