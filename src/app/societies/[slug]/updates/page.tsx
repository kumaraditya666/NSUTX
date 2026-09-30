import { notFound } from "next/navigation";
import { getSocietyBySlug } from "@/lib/seed-societies";
import { DEMO_ANNOUNCEMENTS } from "@/lib/demo-data";
import { EmptyState } from "@/components/states";
import { PublishAnnouncementForm } from "@/components/publish-forms";

export default async function SocietyUpdates({ params }: { params: Promise<{ slug: string }> }): Promise<React.JSX.Element> {
  const { slug } = await params;
  if (!getSocietyBySlug(slug)) notFound();
  const list = DEMO_ANNOUNCEMENTS.filter((a) => a.societySlug === slug);
  return (
    <div>
      <h1 className="text-2xl font-bold">Updates</h1>
      <p className="text-sm opacity-60">Announcements · Recruitment · Results. Pin/schedule/archive in Society Admin (Phase 4).</p>
      <PublishAnnouncementForm societySlug={slug} />
      <div className="mt-4 space-y-3">
        {list.length === 0 ? <EmptyState title="No announcements published." /> : list.map((a) => (
          <article key={a.id} className="rounded-2xl border border-black/10 p-4 dark:border-white/10">
            <p className="font-semibold">{a.pinned ? "📌 " : ""}{a.title}</p>
            <p className="text-sm opacity-70">{a.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
