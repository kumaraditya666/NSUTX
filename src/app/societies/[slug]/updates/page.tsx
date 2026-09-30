import { notFound } from "next/navigation";
import { getSocietyLive } from "@/lib/societies-live";
import { getLiveAnnouncements } from "@/lib/content-live";
import { EmptyState } from "@/components/states";
import { PublishAnnouncementForm } from "@/components/publish-forms";

export default async function SocietyUpdates({ params }: { params: Promise<{ slug: string }> }): Promise<React.JSX.Element> {
  const { slug } = await params;
  if (!await getSocietyLive(slug)) notFound();
  const { announcements } = await getLiveAnnouncements();
  const list = announcements.filter((a) => a.societySlug === slug);
  return (
    <div>
      <h1 className="text-2xl font-bold">Updates</h1>
      <p className="text-sm opacity-60">Announcements · Recruitment · Results. Pin, schedule and archive from Society Admin.</p>
      <PublishAnnouncementForm societySlug={slug} />
      <div className="mt-4 space-y-3">
        {list.length === 0 ? <EmptyState title="No announcements yet." /> : list.map((a) => (
          <article key={a.id} className="panel rounded-2xl p-4">
            <p className="font-semibold">{a.pinned ? "📌 " : ""}{a.title}</p>
            <p className="text-sm opacity-70">{a.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
