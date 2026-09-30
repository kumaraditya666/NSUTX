"use client";

import * as React from "react";

function labelFor(startsAt: string, endsAt: string, now: number): string {
  const start = new Date(startsAt).getTime();
  const end = new Date(endsAt).getTime();
  if (Number.isNaN(start) || Number.isNaN(end)) return "Date TBA";
  if (now >= start && now <= end) return "LIVE NOW";
  if (now > end) {
    const mins = Math.round((now - end) / 60_000);
    if (mins < 60) return `ENDED ${mins} MIN AGO`;
    const hrs = Math.round(mins / 60);
    return hrs < 24 ? `ENDED ${hrs}H AGO` : "ENDED";
  }
  const mins = Math.round((start - now) / 60_000);
  if (mins <= 60) return `STARTING IN ${Math.max(mins, 1)} MIN`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `IN ${hrs}H ${mins % 60}M`;
  const days = Math.floor(hrs / 24);
  return `IN ${days}D ${hrs % 24}H`;
}

// Dynamic countdown from real database timestamps. Recomputes every 30s.
export function EventCountdown({ startsAt, endsAt }: { startsAt: string; endsAt: string }): React.JSX.Element {
  const [now, setNow] = React.useState(() => Date.now());
  React.useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(t);
  }, []);
  return (
    <span role="timer" aria-live="off">
      {labelFor(startsAt, endsAt, now)}
    </span>
  );
}
