import { SEED_SOCIETIES } from "@/lib/seed-societies";

export default function AdminSocieties(): React.JSX.Element {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold">Society management</h1>
      <ul className="mt-4 space-y-2">
        {SEED_SOCIETIES.map((s) => (
          <li key={s.slug} className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border px-4 py-2 text-sm">
            <span><strong>{s.name}</strong> · {s.category}</span>
            <span className="opacity-60">{s.verified ? "✓ Verified" : "Approve · Verify · Assign admin"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
