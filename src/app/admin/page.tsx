import Link from "next/link";
import { SEED_SOCIETIES } from "@/lib/seed-societies";
import { DEMO_EVENTS, DEMO_OPPORTUNITIES } from "@/lib/demo-data";
import { SectionHeading } from "@/components/states";

export default function AdminPage(): React.JSX.Element {
  const unverified = SEED_SOCIETIES.filter((s) => !s.verified).length;
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <SectionHeading title="Platform Admin" description="Approve societies · Verify info · Approve admins · Moderate content. Roles: SUPER_ADMIN / SOCIETY_ADMIN / SOCIETY_EDITOR / USER." />
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border p-6"><p className="text-3xl font-bold">{SEED_SOCIETIES.length}</p><p className="opacity-70">Societies</p></div>
        <div className="rounded-2xl border p-6"><p className="text-3xl font-bold">{unverified}</p><p className="opacity-70">Awaiting verification</p></div>
        <div className="rounded-2xl border p-6"><p className="text-3xl font-bold">{DEMO_EVENTS.length}</p><p className="opacity-70">Demo events</p></div>
        <div className="rounded-2xl border p-6"><p className="text-3xl font-bold">{DEMO_OPPORTUNITIES.length}</p><p className="opacity-70">Opportunities</p></div>
      </div>
      <div className="mt-6 flex flex-wrap gap-2 text-sm">
        <Link href="/admin/societies" className="rounded-full border px-4 py-1.5">Societies</Link>
        <Link href="/admin/events" className="rounded-full border px-4 py-1.5">Events</Link>
        <Link href="/admin/content" className="rounded-full border px-4 py-1.5">Content moderation</Link>
        <Link href="/admin/society" className="rounded-full bg-foreground px-4 py-1.5 text-background">Society Admin CMS →</Link>
      </div>
      <p className="mt-6 text-sm opacity-60">Authorization enforced server-side via RLS + server validation. This demo shell lists seed state; production connects to Supabase tables + audit_logs.</p>
      <ul className="mt-4 space-y-1 text-sm">
        {SEED_SOCIETIES.slice(0, 8).map((s) => (
          <li key={s.slug} className="flex justify-between rounded-xl border px-3 py-1.5"><span>{s.name}</span><span className="opacity-60">{s.verified ? "✓ Verified by NSUT Hub" : "Unverified seed"}</span></li>
        ))}
      </ul>
    </div>
  );
}
