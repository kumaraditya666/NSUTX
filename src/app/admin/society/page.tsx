import { DEMO_ANNOUNCEMENTS, DEMO_EVENTS, DEMO_OPPORTUNITIES } from "@/lib/demo-data";

export default function SocietyAdmin(): React.JSX.Element {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Society Admin CMS</h1>
      <p className="opacity-70">Overview · Events · Updates · Team · Gallery · Achievements · Opportunities · Settings · Appearance. Admins edit only their own society (RLS).</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <section className="rounded-2xl border p-5"><h2 className="font-semibold">Events ({DEMO_EVENTS.length})</h2><p className="text-sm opacity-60">Create · Edit · Delete · Publish. Overlap warnings shown, never auto-cancel.</p></section>
        <section className="rounded-2xl border p-5"><h2 className="font-semibold">Updates ({DEMO_ANNOUNCEMENTS.length})</h2><p className="text-sm opacity-60">Publish immediately · Schedule · Pin · Archive. In-app + PWA notifications.</p></section>
        <section className="rounded-2xl border p-5"><h2 className="font-semibold">Opportunities ({DEMO_OPPORTUNITIES.length})</h2><p className="text-sm opacity-60">Recruitment · Volunteers · Competitions · Collaborations.</p></section>
        <section className="rounded-2xl border p-5"><h2 className="font-semibold">Appearance</h2><p className="text-sm opacity-60">Logo · Banner · Accent color · Hero text · Section order. Consistent design system preserved.</p></section>
        <section className="rounded-2xl border p-5"><h2 className="font-semibold">Analytics</h2><p className="text-sm opacity-60">Page views · Event views · Registrations · Followers. No private user data exposed.</p></section>
        <section className="rounded-2xl border p-5"><h2 className="font-semibold">Verification</h2><p className="text-sm opacity-60">Request “Verified by NSUT Hub”. Platform admin approves.</p></section>
      </div>
    </div>
  );
}
