"use client";

import * as React from "react";
import type { EventItem } from "@/types/society";
import { registerForEvent } from "@/lib/actions";

const KEY = "nsut-my-events-v1";

function load(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

export function RegisterButton({ event }: { event: EventItem }): React.JSX.Element {
  const [registered, setRegistered] = React.useState<boolean>(() => load().includes(event.id));
  const [note, setNote] = React.useState("");

  async function toggle(): Promise<void> {
    const list = load();
    const next = list.includes(event.id) ? list.filter((id) => id !== event.id) : [...list, event.id];
    window.localStorage.setItem(KEY, JSON.stringify(next));
    setRegistered(next.includes(event.id));
    if (next.includes(event.id)) {
      const res = await registerForEvent({ eventId: event.id });
      setNote(res.ok ? "✓ Saved to account + device." : "Saved on device. Login to sync to account.");
    } else {
      setNote("");
    }
  }

  if (event.registrationLink) {
    return (
      <a href={event.registrationLink} target="_blank" rel="noreferrer" className="rounded-full bg-foreground px-5 py-2 text-sm text-background">
        Register (external)
      </a>
    );
  }
  return (
    <div>
      <button type="button" onClick={toggle} aria-pressed={registered} className="rounded-full bg-foreground px-5 py-2 text-sm text-background">
        {registered ? "✓ Registered — tap to undo" : "Register"}
      </button>
      {note ? <p role="status" className="mt-1 text-xs opacity-60">{note}</p> : null}
    </div>
  );
}

export function useMyEvents(all: EventItem[]): EventItem[] {
  const [ids, setIds] = React.useState<string[]>(() => load());
  React.useEffect(() => {
    function onStorage(): void {
      setIds(load());
    }
    function onFocus(): void {
      setIds(load());
    }
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", onFocus);
    };
  }, []);
  return all.filter((e) => ids.includes(e.id));
}
