import "server-only";

import { SEED_SOCIETIES } from "@/lib/seed-societies";
import type { SocietySeed } from "@/types/society";
import type { SocietyCategory } from "@/lib/constants";

interface SocietyRow {
  name: string;
  slug: string;
  category: string;
  description: string | null;
  accent_color: string | null;
  verified: boolean | null;
}

function env(name: string): string {
  return process.env[name] ?? "";
}

function baseUrl(): string {
  return env("SUPABASE_URL") || env("NEXT_PUBLIC_SUPABASE_URL");
}

function pubKey(): string {
  return env("SUPABASE_PUBLISHABLE_KEY") || env("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");
}

export function isLiveConfigured(): boolean {
  return baseUrl().length > 0 && pubKey().length > 0;
}

function toSeed(row: SocietyRow): SocietySeed {
  const fallback = SEED_SOCIETIES.find((s) => s.slug === row.slug);
  return {
    name: row.name,
    slug: row.slug,
    category: (row.category as SocietyCategory) ?? "technical",
    shortDescription: row.description ?? fallback?.shortDescription ?? "Coming soon.",
    description: row.description ?? "Coming soon.",
    accentColor: row.accent_color ?? fallback?.accentColor ?? "#0ea5e9",
    socials: fallback?.socials ?? {},
    ...(fallback?.website ? { website: fallback.website } : {}),
    ...(fallback?.email ? { email: fallback.email } : {}),
    recruitmentStatus: fallback?.recruitmentStatus ?? "unknown",
    departments: fallback?.departments ?? [],
    ...(fallback?.createdYear !== undefined ? { createdYear: fallback.createdYear } : {}),
    verified: row.verified ?? false,
  };
}

export async function getLiveSocieties(): Promise<{ societies: SocietySeed[]; live: boolean }> {
  if (!isLiveConfigured()) return { societies: SEED_SOCIETIES, live: false };
  try {
    const res = await fetch(
      `${baseUrl()}/rest/v1/societies?select=name,slug,category,description,accent_color,verified&order=name`,
      {
        headers: { apikey: pubKey(), Authorization: `Bearer ${pubKey()}` },
        next: { revalidate: 60 },
      },
    );
    if (!res.ok) return { societies: SEED_SOCIETIES, live: false };
    const rows = (await res.json()) as SocietyRow[];
    if (!Array.isArray(rows) || rows.length === 0) return { societies: SEED_SOCIETIES, live: false };
    return { societies: rows.map(toSeed), live: true };
  } catch {
    return { societies: SEED_SOCIETIES, live: false };
  }
}

export async function getSocietyLive(slug: string): Promise<SocietySeed | undefined> {
  const { societies } = await getLiveSocieties();
  return societies.find((s) => s.slug === slug);
}
