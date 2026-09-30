"use client";

import * as React from "react";
import { useNsutModeStore } from "@/stores/nsut-mode";
import { DEMO_ANNOUNCEMENTS } from "@/lib/demo-data";

type Mode = "all" | "important" | "none";
const KEY = "nsut-notif-mode-v1";

function loadMode(): Mode {
  if (typeof window === "undefined") return "all";
  const v = window.localStorage.getItem(KEY);
  return v === "important" || v === "none" ? v : "all";
}

const MODES: { id: Mode; label: string; detail: string }[] = [
  { id: "all", label: "All", detail: "Every update from followed societies." },
  { id: "important", label: "Important only", detail: "Pinned announcements and closing-soon deadlines." },
  { id: "none", label: "None", detail: "Mute everything. No spam, ever." },
];

export default function NotificationsPage(): React.JSX.Element {
  const followedSlugs = useNsutModeStore((s) => s.followedSlugs);
  const [mode, setMode] = React.useState<Mode>(() => loadMode());
  function pick(m: Mode): void {
    setMode(m);
    window.localStorage.setItem(KEY, m);
  }
  const all = DEMO_ANNOUNCEMENTS.filter((a) => followedSlugs.includes(a.societySlug));
  const items = mode === "none" ? [] : mode === "important" ? all.filter((a) => a.pinned).slice(0, 5) : all.slice(0, 5);
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <p className="eyebrow">Inbox</p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight">Notifications</h1>
      <section aria-label="Notification preferences" className="panel mt-4 rounded-2xl p-4">
        <h2 className="font-semibold">Preferences</h2>
        <div role="radiogroup" aria-label="Notification level" className="mt-2 grid gap-2 sm:grid-cols-3">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              role="radio"
              aria-checked={mode === m.id}
              onClick={() => pick(m.id)}
              className={mode === m.id ? "rounded-xl bg-foreground p-3 text-left text-background" : "rounded-xl border p-3 text-left"}
              style={mode === m.id ? undefined : { borderColor: "var(--hairline)" }}
            >
              <span className="text-sm font-semibold">{m.label}</span>
              <span className="block text-xs opacity-70">{m.detail}</span>
            </button>
          ))}
        </div>
      </section>
      <ul className="mt-4 space-y-2">
        {items.length === 0 ? (
          <li className="rounded-2xl border border-dashed p-6 text-center text-sm opacity-70">
            {mode === "none" ? "Muted. Change preferences to receive updates." : "No notifications. Follow societies to get updates here."}
          </li>
        ) : items.map((a) => (
          <li key={a.id} className="panel rounded-2xl p-3 text-sm"><strong>{a.societyName}:</strong> {a.title}</li>
        ))}
      </ul>
    </div>
  );
}
