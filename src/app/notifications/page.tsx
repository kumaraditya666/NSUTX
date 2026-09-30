"use client";

import * as React from "react";
import { useNsutModeStore } from "@/stores/nsut-mode";
import { DEMO_ANNOUNCEMENTS } from "@/lib/demo-data";

export default function NotificationsPage(): React.JSX.Element {
  const followedSlugs = useNsutModeStore((s) => s.followedSlugs);
  const [prefs, setPrefs] = React.useState({ updates: true, deadlines: true, events: true });
  const items = DEMO_ANNOUNCEMENTS.filter((a) => followedSlugs.includes(a.societySlug)).slice(0, 5);
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold">Notifications</h1>
      <section aria-label="Preferences" className="mt-4 rounded-2xl border p-4">
        <h2 className="font-semibold">Preferences (no spam)</h2>
        {(["updates", "deadlines", "events"] as const).map((k) => (
          <label key={k} className="mt-2 flex items-center gap-2 text-sm">
            <input type="checkbox" checked={prefs[k]} onChange={() => setPrefs((p) => ({ ...p, [k]: !p[k] }))} />
            {k === "updates" ? "Society updates (e.g. IEEE posted a new update)" : k === "deadlines" ? "Deadline reminders (e.g. recruitment closes tomorrow)" : "Event reminders (e.g. saved event starts in 1 hour)"}
          </label>
        ))}
      </section>
      <ul className="mt-4 space-y-2">
        {items.length === 0 ? <li className="rounded-2xl border border-dashed p-6 text-center text-sm opacity-70">No notifications. Follow societies to get updates here.</li> : items.map((a) => (
          <li key={a.id} className="rounded-2xl border p-3 text-sm"><strong>{a.societyName}:</strong> {a.title}</li>
        ))}
      </ul>
    </div>
  );
}
