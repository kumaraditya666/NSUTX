import { SEED_SOCIETIES } from "@/lib/seed-societies";
import { DEMO_ANNOUNCEMENTS, DEMO_EVENTS, DEMO_GALLERY, DEMO_OPPORTUNITIES } from "@/lib/demo-data";

export interface SearchResults {
  societies: typeof SEED_SOCIETIES;
  events: typeof DEMO_EVENTS;
  announcements: typeof DEMO_ANNOUNCEMENTS;
  opportunities: typeof DEMO_OPPORTUNITIES;
  gallery: typeof DEMO_GALLERY;
}

function fuzzyMatch(haystack: string, needle: string): boolean {
  const h = haystack.toLowerCase();
  const n = needle.toLowerCase().trim();
  if (n.length === 0) return false;
  if (h.includes(n)) return true;
  // subsequence match for typos/short queries
  let hi = 0;
  for (let ni = 0; ni < n.length; ni += 1) {
    const ch = n[ni];
    if (ch === undefined || ch === " ") continue;
    const found = h.indexOf(ch, hi);
    if (found === -1) return false;
    hi = found + 1;
  }
  return true;
}

export function universalSearch(query: string): SearchResults {
  const q = query.trim();
  if (q.length === 0) {
    return { societies: [], events: [], announcements: [], opportunities: [], gallery: [] };
  }
  return {
    societies: SEED_SOCIETIES.filter(
      (s) => fuzzyMatch(s.name, q) || fuzzyMatch(s.shortDescription, q) || fuzzyMatch(s.category, q),
    ).slice(0, 8),
    events: DEMO_EVENTS.filter((e) => fuzzyMatch(e.title, q) || fuzzyMatch(e.societyName, q) || fuzzyMatch(e.venue, q)).slice(0, 6),
    announcements: DEMO_ANNOUNCEMENTS.filter((a) => fuzzyMatch(a.title, q) || fuzzyMatch(a.body, q) || fuzzyMatch(a.societyName, q)).slice(0, 6),
    opportunities: DEMO_OPPORTUNITIES.filter((o) => fuzzyMatch(o.title, q) || fuzzyMatch(o.description, q) || fuzzyMatch(o.type, q)).slice(0, 6),
    gallery: DEMO_GALLERY.filter((g) => fuzzyMatch(g.title, q) || fuzzyMatch(g.societyName, q)).slice(0, 6),
  };
}
