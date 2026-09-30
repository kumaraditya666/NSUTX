import Link from "next/link";
import { getLiveSocieties } from "@/lib/societies-live";
import { getLiveEvents, getLiveOpportunities } from "@/lib/content-live";
import { SectionHeading } from "@/components/states";

export default async function AdminPage(): Promise<React.JSX.Element> {
  const [{ societies }, { events }, { opportunities }] = await Promise.all([
    getLiveSocieties(),
    getLiveEvents(),
    getLiveOpportunities(),
  ]);
  const unverified = societies.filter((s) => !s.verified).length;
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <SectionHeading title="Platform Admin" description="Approve societies · Verify info · Approve admins · Moderate content. Roles: SUPER_ADMIN / SOCIETY_ADMIN / SOCIETY_EDITOR / USER." />
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="panel rounded-2xl p-6"><p className="text-3xl font-bold">{societies.length}</p><p className="opacity-70">Societies</p></div>
        <div className="panel rounded-2xl p-6"><p className="text-3xl font-bold">{unverified}</p><p className="opacity-70">Awaiting verification</p></div>
        <div className="panel rounded-2xl p-6"><p className="text-3xl font-bold">{events.length}</p><p className="opacity-70">Events</p></div>
        <div className="panel rounded-2xl p-6"><p className="text-3xl font-bold">{opportunities.length}</p><p className="opacity-70">Opportunities</p></div>
      </div>
      <div className="mt-6 flex flex-wrap gap-2 text-sm">
        <Link href="/admin/societies" className="rounded-full border px-4 py-1.5">Societies</Link>
        <Link href="/admin/events" className="rounded-full border px-4 py-1.5">Events</Link>
        <Link href="/admin/content" className="rounded-full border px-4 py-1.5">Content moderation</Link>
        <Link href="/admin/society" className="rounded-full bg-foreground px-4 py-1.5 text-background">Society Admin CMS →</Link>
      </div>
      <p className="mt-6 text-sm opacity-60">Authorization enforced server-side via RLS + server validation. Verification flips the public “Verified by NSUTX” badge.</p>
      <ul className="mt-4 space-y-1 text-sm">
        {societies.slice(0, 8).map((s) => (
          <li key={s.slug} className="flex justify-between rounded-xl border px-3 py-1.5"><span>{s.name}</span><span className="opacity-60">{s.verified ? "✓ Verified by NSUTX" : "Pending verification"}</span></li>
        ))}
      </ul>
    </div>
  );
}
