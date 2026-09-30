"use client";

import * as React from "react";
import type { EventItem } from "@/types/society";

function toIcsDate(iso: string): string {
  const d = new Date(iso);
  return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

export function EventShare({ event }: { event: EventItem }): React.JSX.Element {
  const [note, setNote] = React.useState("");
  const url = typeof window === "undefined" ? "" : `${window.location.origin}/events/${event.id}`;

  async function share(): Promise<void> {
    const data = { title: event.title, text: `${event.title} — ${event.societyName}`, url };
    const nav = navigator as Navigator & {
      share?: (d: typeof data) => Promise<void>;
      clipboard?: { writeText: (t: string) => Promise<void> };
    };
    if (typeof nav.share === "function") {
      try {
        await nav.share(data);
        return;
      } catch {
        return;
      }
    }
    if (nav.clipboard) {
      try {
        await nav.clipboard.writeText(url);
        setNote("Link copied.");
      } catch {
        setNote("Copy this link: " + url);
      }
    } else {
      setNote("Copy this link: " + url);
    }
  }

  function calendarHref(): string {
    const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "BEGIN:VEVENT", `UID:${event.id}@nsutx`, `DTSTART:${toIcsDate(event.startsAt)}`, `DTEND:${toIcsDate(event.endsAt)}`, `SUMMARY:${event.title}`, `LOCATION:${event.venue}`, "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button type="button" onClick={share} className="rounded-full border px-4 py-1.5 text-sm" style={{ borderColor: "var(--hairline)" }}>
        Share
      </button>
      <a href={calendarHref()} download={`${event.id}.ics`} className="rounded-full border px-4 py-1.5 text-sm" style={{ borderColor: "var(--hairline)" }}>
        Add to Calendar
      </a>
      {note ? <span role="status" className="text-xs opacity-60">{note}</span> : null}
    </div>
  );
}
