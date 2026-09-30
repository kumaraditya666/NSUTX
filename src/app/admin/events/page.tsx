import { DEMO_EVENTS } from "@/lib/demo-data";
import { ClashDetector } from "@/components/clash-detector";

export default function AdminEvents(): React.JSX.Element {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold">Event management</h1>
      <div className="mt-4"><ClashDetector events={DEMO_EVENTS} /></div>
      <ul className="mt-4 space-y-2">
        {DEMO_EVENTS.map((e) => (<li key={e.id} className="rounded-2xl border px-4 py-2 text-sm">{e.title} — {e.societyName} · {e.venue}</li>))}
      </ul>
    </div>
  );
}
