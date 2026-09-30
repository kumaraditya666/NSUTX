import { SEED_SOCIETIES } from "@/lib/seed-societies";
import { DEMO_ANNOUNCEMENTS, DEMO_EVENTS, DEMO_OPPORTUNITIES, DEMO_SOCIETY_DETAILS } from "@/lib/demo-data";

const FALLBACK = "I couldn't find verified information about that on NSUT Hub.";

export function answerNsutAi(question: string, followedSlugs: string[]): string {
  const q = question.toLowerCase();

  if (q.includes("today") || q.includes("happening now") || q.includes("live")) {
    if (DEMO_EVENTS.length === 0) return FALLBACK;
    const lines = DEMO_EVENTS.slice(0, 5).map((e) => `• ${e.title} (${e.societyName}, ${e.venue})`);
    return `Here's what's on NSUT Hub demo data:\n${lines.join("\n")}\n\nConnect Supabase for live verified events.`;
  }

  if (q.includes("recruit") || q.includes("open") || q.includes("opportunit") || q.includes("hiring")) {
    const open = DEMO_OPPORTUNITIES.filter((o) => o.status !== "closed");
    if (open.length === 0) return FALLBACK;
    return `Open opportunities (demo):\n${open.map((o) => `• ${o.title} — ${o.societyName}`).join("\n")}`;
  }

  if (q.includes("robot")) {
    const matches = SEED_SOCIETIES.filter((s) => ["ares", "ieee", "debugging-society", "csi"].includes(s.slug));
    return `Robotics-related societies:\n${matches.map((s) => `• ${s.name} — ${s.shortDescription}`).join("\n")}\n\nDetails: ${DEMO_SOCIETY_DETAILS["ares"]?.mission ?? FALLBACK}`;
  }

  if (q.includes("photo")) {
    return `Photography on NSUT Hub:\n• Junoon — The Photography Club\n• Workshop: Junoon Photo Walk (demo event)\n• Memory: Photo Walk Exhibition (2025)`;
  }

  if (q.includes("weekend") || q.includes("week")) {
    return `This week (demo):\n${DEMO_EVENTS.map((e) => `• ${e.title} — ${e.venue}`).join("\n")}`;
  }

  if (q.includes("follow") || q.includes("update") || q.includes("my")) {
    if (followedSlugs.length === 0) return "You don't follow any societies yet. Follow IEEE, Junoon or FES to personalize this.";
    const updates = DEMO_ANNOUNCEMENTS.filter((a) => followedSlugs.includes(a.societySlug));
    if (updates.length === 0) return "No updates from your followed societies in demo data.";
    return `Updates from societies you follow:\n${updates.map((u) => `• ${u.societyName}: ${u.title}`).join("\n")}`;
  }

  if (q.includes("finance") || q.includes("fes")) {
    return `Finance societies: FES (Finance & Economics Society). Demo opportunity: Paper trading competition.`;
  }

  if (q.includes("music") || q.includes("dance") || q.includes("drama")) {
    return `Cultural societies (seed list): Crescendo (Music), Mirage (Western Dance), Ashwamedh (Dramatics). Open a society page for its mini-website.`;
  }

  return FALLBACK;
}
