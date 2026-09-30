import { DEMO_ANNOUNCEMENTS } from "@/lib/demo-data";

export default function AdminContent(): React.JSX.Element {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold">Content moderation</h1>
      <p className="text-sm opacity-60">Feature announcements · Reported content · Audit trail.</p>
      <ul className="mt-4 space-y-2">
        {DEMO_ANNOUNCEMENTS.map((a) => (<li key={a.id} className="rounded-2xl border px-4 py-2 text-sm"><strong>{a.societyName}:</strong> {a.title}</li>))}
      </ul>
    </div>
  );
}
