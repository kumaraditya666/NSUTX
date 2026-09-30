import type { Announcement, EventItem, Opportunity } from "@/types/society";

export interface DemoTeamMember {
  name: string;
  role: string;
  department: string;
}

export interface DemoGalleryItem {
  id: string;
  title: string;
  societySlug: string;
  societyName: string;
  year: number;
  category: string;
  kind: "photo" | "video" | "poster";
}

export interface DemoAchievement {
  year: number;
  title: string;
  detail: string;
  icon: string;
}

function hoursFromNow(hours: number, durationHours = 2): { startsAt: string; endsAt: string } {
  const start = new Date(Date.now() + hours * 3600_000);
  const end = new Date(start.getTime() + durationHours * 3600_000);
  return { startsAt: start.toISOString(), endsAt: end.toISOString() };
}

// Clearly marked DEMO content for 3 societies so the template can be reviewed
// end-to-end. All other societies remain seed-minimal with "Information coming soon."
export const DEMO_EVENTS: EventItem[] = [
  { id: "evt-acm-workshop", title: "ACM Workshop: Intro to Systems", societySlug: "ieee", societyName: "IEEE NSUT", ...hoursFromNow(-1), venue: "CS Block", status: "live", registrationOpen: true, eligibility: "All NSUT students", capacity: 120 },
  { id: "evt-crescendo-aud", title: "Crescendo Auditions", societySlug: "crescendo", societyName: "Crescendo", ...hoursFromNow(0.6), venue: "Main Auditorium", status: "starting-soon", registrationOpen: true },
  { id: "evt-ieee-workshop", title: "IEEE Workshop: Edge AI", societySlug: "ieee", societyName: "IEEE NSUT", ...hoursFromNow(5), venue: "APJ Hall", status: "upcoming", registrationOpen: true, registrationLink: "https://forms.gle/demo-ieee", capacity: 80, eligibility: "1st–3rd year" },
  { id: "evt-junoon-walk", title: "Junoon Photo Walk", societySlug: "junoon", societyName: "Junoon", ...hoursFromNow(5.5), venue: "Admin Block", status: "upcoming", registrationOpen: true },
  { id: "evt-fes-session", title: "FES Session: Markets 101", societySlug: "fes", societyName: "FES", ...hoursFromNow(26), venue: "Seminar Hall", status: "upcoming", registrationOpen: true },
  { id: "evt-dance-aud", title: "Dance Auditions", societySlug: "mirage", societyName: "Mirage", ...hoursFromNow(5.2), venue: "Stage 2", status: "upcoming", registrationOpen: true },
];

export const DEMO_ANNOUNCEMENTS: Announcement[] = [
  { id: "ann-ieee-1", societySlug: "ieee", societyName: "IEEE NSUT", title: "Edge AI workshop registrations open", body: "DEMO: 80 seats, APJ Hall. Bring a laptop.", pinned: true, publishedAt: new Date(Date.now() - 2 * 3600_000).toISOString() },
  { id: "ann-junoon-1", societySlug: "junoon", societyName: "Junoon", title: "Photo walk this weekend", body: "DEMO: Admin Block meetup. All skill levels welcome.", pinned: true, publishedAt: new Date(Date.now() - 5 * 3600_000).toISOString() },
  { id: "ann-fes-1", societySlug: "fes", societyName: "FES", title: "Markets 101 session", body: "DEMO: Intro session on markets and personal finance.", pinned: false, publishedAt: new Date(Date.now() - 8 * 3600_000).toISOString() },
  { id: "ann-ares-1", societySlug: "ares", societyName: "ARES", title: "Robotics recruitment opens soon", body: "DEMO: Recruitment notice.", pinned: false, publishedAt: new Date(Date.now() - 26 * 3600_000).toISOString() },
];

export const DEMO_OPPORTUNITIES: Opportunity[] = [
  { id: "opp-ieee-core", societySlug: "ieee", societyName: "IEEE NSUT", title: "Core team applications", description: "DEMO: Apply for tech, PR, design and operations roles.", type: "Core team", deadline: new Date(Date.now() + 3 * 86400_000).toISOString(), eligibility: "2nd year+", status: "open" },
  { id: "opp-ares-recruit", societySlug: "ares", societyName: "ARES", title: "Robotics recruitment", description: "DEMO: Mechanical, embedded and software roles.", type: "Recruitment", deadline: new Date(Date.now() + 1 * 86400_000).toISOString(), status: "closing-soon" },
  { id: "opp-junoon-vol", societySlug: "junoon", societyName: "Junoon", title: "Fest photography volunteers", description: "DEMO: Cover Moksha with the Junoon crew.", type: "Volunteers", status: "open" },
  { id: "opp-fes-comp", societySlug: "fes", societyName: "FES", title: "Paper trading competition", description: "DEMO: 1-week virtual trading challenge.", type: "Competition", deadline: new Date(Date.now() + 6 * 86400_000).toISOString(), status: "open" },
];

export const DEMO_TEAM: Record<string, DemoTeamMember[]> = {
  ieee: [
    { name: "Demo President", role: "President", department: "Leadership" },
    { name: "Demo VP", role: "Vice President", department: "Leadership" },
    { name: "Demo Tech Lead", role: "Secretary", department: "Technical" },
    { name: "Demo Designer", role: "Secretary", department: "Design" },
  ],
  junoon: [
    { name: "Demo President", role: "President", department: "Leadership" },
    { name: "Demo Curator", role: "Secretary", department: "Photography" },
  ],
  fes: [
    { name: "Demo President", role: "President", department: "Leadership" },
    { name: "Demo Analyst", role: "Secretary", department: "Research" },
  ],
};

export const DEMO_GALLERY: DemoGalleryItem[] = [
  { id: "mem-moksha-1", title: "Moksha 2026 — Main Stage", societySlug: "moksha", societyName: "Moksha", year: 2026, category: "cultural", kind: "photo" },
  { id: "mem-ieee-1", title: "Edge AI Workshop", societySlug: "ieee", societyName: "IEEE NSUT", year: 2026, category: "technical", kind: "photo" },
  { id: "mem-junoon-1", title: "Photo Walk Exhibition", societySlug: "junoon", societyName: "Junoon", year: 2025, category: "cultural", kind: "photo" },
  { id: "mem-fes-1", title: "Markets 101", societySlug: "fes", societyName: "FES", year: 2026, category: "business", kind: "poster" },
  { id: "mem-mirage-1", title: "Aftermovie", societySlug: "mirage", societyName: "Mirage", year: 2025, category: "cultural", kind: "video" },
];

export const DEMO_ACHIEVEMENTS: Record<string, DemoAchievement[]> = {
  ieee: [
    { year: 2026, title: "Hosted Edge AI workshop", detail: "DEMO: 80 participants.", icon: "🎤" },
    { year: 2025, title: "Inter-college hackathon finalists", detail: "DEMO: Placeholder archive entry.", icon: "🏆" },
  ],
  junoon: [{ year: 2025, title: "Annual photo exhibition", detail: "DEMO: Placeholder archive entry.", icon: "📸" }],
  fes: [{ year: 2026, title: "Trading competition", detail: "DEMO: Placeholder archive entry.", icon: "📈" }],
};

export const DEMO_SOCIETY_DETAILS: Record<string, { mission: string; interests: string[] }> = {
  ieee: { mission: "DEMO: Advancing technology and innovation at NSUT.", interests: ["coding", "robotics", "science", "gaming"] },
  junoon: { mission: "DEMO: Photography community at NSUT.", interests: ["photography", "media", "design"] },
  fes: { mission: "DEMO: Finance and economics community.", interests: ["finance", "debate", "literature"] },
  crescendo: { mission: "DEMO: Music society.", interests: ["music", "drama"] },
  mirage: { mission: "DEMO: Western dance crew.", interests: ["dance", "music"] },
  ares: { mission: "DEMO: Robotics society.", interests: ["robotics", "coding", "science", "automotive"] },
};
