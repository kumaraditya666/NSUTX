import "server-only";

import { DEMO_ANNOUNCEMENTS, DEMO_EVENTS, DEMO_OPPORTUNITIES } from "@/lib/demo-data";
import { getEventStatus } from "@/lib/events";
import type { Announcement, EventItem, Opportunity } from "@/types/society";

function baseUrl(): string {
  return process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
}

function pubKey(): string {
  return process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";
}

function configured(): boolean {
  return baseUrl().length > 0 && pubKey().length > 0;
}

async function get<T>(path: string): Promise<T[] | null> {
  try {
    const res = await fetch(`${baseUrl()}/rest/v1/${path}`, {
      headers: { apikey: pubKey(), Authorization: `Bearer ${pubKey()}` },
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as T[];
    return Array.isArray(json) ? json : null;
  } catch {
    return null;
  }
}

interface EventRow {
  id: string;
  title: string;
  description: string | null;
  starts_at: string;
  ends_at: string;
  venue: string | null;
  societies: { slug: string; name: string } | null;
}

export async function getLiveEvents(): Promise<{ events: EventItem[]; live: boolean }> {
  if (!configured()) return { events: DEMO_EVENTS, live: false };
  const rows = await get<EventRow>("events?select=id,title,starts_at,ends_at,venue,societies(slug,name)&order=starts_at&limit=50");
  if (!rows || rows.length === 0) return { events: DEMO_EVENTS, live: false };
  return {
    live: true,
    events: rows.map((r) => ({
      id: r.id,
      title: r.title,
      societySlug: r.societies?.slug ?? "unknown",
      societyName: r.societies?.name ?? "NSUT Society",
      startsAt: r.starts_at,
      endsAt: r.ends_at,
      venue: r.venue ?? "Venue TBA",
      status: getEventStatus(r.starts_at, r.ends_at),
      registrationOpen: true,
    })),
  };
}

interface AnnouncementRow {
  id: string;
  title: string;
  body: string | null;
  pinned: boolean | null;
  societies: { slug: string; name: string } | null;
}

export async function getLiveAnnouncements(): Promise<{ announcements: Announcement[]; live: boolean }> {
  if (!configured()) return { announcements: DEMO_ANNOUNCEMENTS, live: false };
  const rows = await get<AnnouncementRow>("announcements?select=id,title,body,pinned,societies(slug,name)&order=pinned.desc&limit=30");
  if (!rows || rows.length === 0) return { announcements: DEMO_ANNOUNCEMENTS, live: false };
  return {
    live: true,
    announcements: rows.map((r) => ({
      id: r.id,
      societySlug: r.societies?.slug ?? "unknown",
      societyName: r.societies?.name ?? "NSUT Society",
      title: r.title,
      body: r.body ?? "",
      pinned: r.pinned ?? false,
      publishedAt: new Date().toISOString(),
    })),
  };
}

interface OpportunityRow {
  id: string;
  title: string;
  description: string | null;
  type: string | null;
  status: string | null;
  societies: { slug: string; name: string } | null;
}

export async function getLiveOpportunities(): Promise<{ opportunities: Opportunity[]; live: boolean }> {
  if (!configured()) return { opportunities: DEMO_OPPORTUNITIES, live: false };
  const rows = await get<OpportunityRow>("opportunities?select=id,title,description,type,status,societies(slug,name)&limit=30");
  if (!rows || rows.length === 0) return { opportunities: DEMO_OPPORTUNITIES, live: false };
  return {
    live: true,
    opportunities: rows.map((r) => ({
      id: r.id,
      societySlug: r.societies?.slug ?? "unknown",
      societyName: r.societies?.name ?? "NSUT Society",
      title: r.title,
      description: r.description ?? "",
      type: r.type ?? "opportunity",
      status: (r.status === "closing-soon" ? "closing-soon" : r.status === "closed" ? "closed" : "open") as Opportunity["status"],
    })),
  };
}
