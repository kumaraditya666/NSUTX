import type { EventItem, Opportunity, SocietySeed } from "@/types/society";

// Reusable configuration for the single SocietyMiniSite template.
// One template renders 50+ societies; this model supplies each society's
// identity (accent, tagline, socials, sections) from database + seed data.
export interface CardActivity {
  upcomingCount: number;
  nextEventTitle?: string;
  recruitmentOpen: boolean;
}

// Per-society card enrichment from live arrays. Shared by Explore and Home
// so every card communicates the same activity signals.
export function buildCardActivity(
  societies: SocietySeed[],
  events: EventItem[],
  opportunities: Opportunity[],
): Map<string, CardActivity> {
  const map = new Map<string, CardActivity>();
  for (const s of societies) {
    const upcoming = events.filter((e) => e.societySlug === s.slug && e.status !== "past");
    const nextTitle = upcoming[0]?.title;
    map.set(s.slug, {
      upcomingCount: upcoming.length,
      ...(nextTitle !== undefined ? { nextEventTitle: nextTitle } : {}),
      recruitmentOpen: opportunities.some((o) => o.societySlug === s.slug && o.status !== "closed"),
    });
  }
  return map;
}
export interface SocietyConfig {
  accent: string;
  accentSoft: string;
  tagline: string;
  socials: { label: string; href: string }[];
  sections: string[];
}

function withAlpha(hex: string, alpha: string): string {
  if (/^#[0-9a-fA-F]{6}$/.test(hex)) return `${hex}${alpha}`;
  return hex;
}

export function getSocietyConfig(society: SocietySeed): SocietyConfig {
  const socials: { label: string; href: string }[] = [];
  if (society.website) socials.push({ label: "Website", href: society.website });
  const entries = Object.entries(society.socials) as [string, string | undefined][];
  for (const [key, href] of entries) {
    if (href) socials.push({ label: key[0]?.toUpperCase() + key.slice(1), href });
  }
  return {
    accent: society.accentColor,
    accentSoft: withAlpha(society.accentColor, "1f"),
    tagline: society.shortDescription,
    socials,
    sections: ["about", "events", "updates", "opportunities", "team", "gallery", "achievements"],
  };
}
