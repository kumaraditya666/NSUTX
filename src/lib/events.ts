import type { EventItem } from "@/types/society";

export function getEventStatus(startsAt: string, endsAt: string): EventItem["status"] {
  const now = Date.now();
  const start = new Date(startsAt).getTime();
  const end = new Date(endsAt).getTime();
  if (Number.isNaN(start) || Number.isNaN(end)) return "upcoming";
  if (now >= start && now <= end) return "live";
  if (start > now && start - now <= 60 * 60_000) return "starting-soon";
  if (start < now) return "past";
  return "upcoming";
}

export function minutesUntil(startsAt: string): number {
  const diff = new Date(startsAt).getTime() - Date.now();
  return Math.max(0, Math.round(diff / 60_000));
}

export interface ClashGroup {
  key: string;
  events: EventItem[];
}

export function detectClashes(events: EventItem[]): ClashGroup[] {
  const sorted = [...events].sort(
    (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
  );
  const groups: ClashGroup[] = [];
  let current: EventItem[] = [];
  let currentEnd = 0;
  for (const evt of sorted) {
    const start = new Date(evt.startsAt).getTime();
    const end = new Date(evt.endsAt).getTime();
    if (current.length === 0) {
      current = [evt];
      currentEnd = end;
      continue;
    }
    if (start < currentEnd) {
      current.push(evt);
      currentEnd = Math.max(currentEnd, end);
    } else {
      if (current.length > 1) {
        groups.push({ key: `${current[0]?.id}-clash`, events: current });
      }
      current = [evt];
      currentEnd = end;
    }
  }
  if (current.length > 1) {
    groups.push({ key: `${current[0]?.id}-clash`, events: current });
  }
  return groups;
}

export function countOverlaps(event: EventItem, all: EventItem[]): EventItem[] {
  const start = new Date(event.startsAt).getTime();
  const end = new Date(event.endsAt).getTime();
  return all.filter((other) => {
    if (other.id === event.id) return false;
    const oStart = new Date(other.startsAt).getTime();
    const oEnd = new Date(other.endsAt).getTime();
    return start < oEnd && oStart < end;
  });
}

const RECENTLY_ENDED_MS = 24 * 60 * 60_000;

export function recentlyEnded(events: EventItem[], withinMs: number = RECENTLY_ENDED_MS): EventItem[] {
  const now = Date.now();
  return events.filter(
    (e) => e.status === "past" && now - new Date(e.endsAt).getTime() < withinMs,
  );
}

export function formatTime(iso: string): string {  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "Date TBA";
  return date.toLocaleString("en-IN", {
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}
