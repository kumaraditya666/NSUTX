import type { SocietySeed } from "@/types/society";

// Seed entries only — NOT the complete/current official list.
// Additional societies can be added here or via Supabase later.
// Never fabricate members, achievements, dates, contacts.
// Missing info → "Information coming soon." / recruitmentStatus: "unknown".

export const SEED_SOCIETIES: SocietySeed[] = [
  // Cultural
  { name: "Ashwamedh", slug: "ashwamedh", category: "cultural", shortDescription: "The Dramatics Society", description: "Coming soon.", accentColor: "#f43f5e", socials: {}, recruitmentStatus: "unknown", departments: [], verified: false },
  { name: "Crescendo", slug: "crescendo", category: "cultural", shortDescription: "The Music Society", description: "Coming soon.", accentColor: "#8b5cf6", socials: {}, recruitmentStatus: "unknown", departments: [], verified: false },
  { name: "Junoon", slug: "junoon", category: "cultural", shortDescription: "The Photography Club", description: "Coming soon.", accentColor: "#06b6d4", socials: {}, recruitmentStatus: "unknown", departments: [], verified: false },
  { name: "Mirage", slug: "mirage", category: "cultural", shortDescription: "Western Dance Crew", description: "Coming soon.", accentColor: "#ec4899", socials: {}, recruitmentStatus: "unknown", departments: [], verified: false },
  { name: "Canvas", slug: "canvas", category: "cultural", shortDescription: "Fine Arts Society", description: "Coming soon.", accentColor: "#f59e0b", socials: {}, recruitmentStatus: "unknown", departments: [], verified: false },
  { name: "Clitch", slug: "clitch", category: "cultural", shortDescription: "Fashion Society", description: "Coming soon.", accentColor: "#d946ef", socials: {}, recruitmentStatus: "unknown", departments: [], verified: false },
  { name: "Shakesjeer", slug: "shakesjeer", category: "cultural", shortDescription: "Open Mic", description: "Coming soon.", accentColor: "#14b8a6", socials: {}, recruitmentStatus: "unknown", departments: [], verified: false },
  { name: "THC", slug: "thc", category: "cultural", shortDescription: "Travel and Hiking Club", description: "Coming soon.", accentColor: "#22c55e", socials: {}, recruitmentStatus: "unknown", departments: [], verified: false },
  { name: "SPIC MACAY NSUT", slug: "spic-macay", category: "cultural", shortDescription: "Society for Promotion of Indian Classical Music and Culture", description: "Coming soon.", accentColor: "#eab308", socials: {}, recruitmentStatus: "unknown", departments: [], verified: false },
  // Technical
  { name: "CSI NSUT", slug: "csi", category: "technical", shortDescription: "Computer Society of India", description: "Coming soon.", accentColor: "#3b82f6", socials: {}, recruitmentStatus: "unknown", departments: [], verified: false },
  { name: "IEEE NSUT", slug: "ieee", category: "technical", shortDescription: "Advancing technology and innovation.", description: "Coming soon.", accentColor: "#0ea5e9", socials: {}, recruitmentStatus: "unknown", departments: ["Technical", "PR", "Content", "Design", "Operations"], verified: false },
  { name: "Devcomm", slug: "devcomm", category: "technical", shortDescription: "Developer Community", description: "Coming soon.", accentColor: "#6366f1", socials: {}, recruitmentStatus: "unknown", departments: [], verified: false },
  { name: "ARES", slug: "ares", category: "technical", shortDescription: "Robotics Society", description: "Coming soon.", accentColor: "#ef4444", socials: {}, recruitmentStatus: "unknown", departments: [], verified: false },
  { name: "The Debugging Society", slug: "debugging-society", category: "technical", shortDescription: "Coding community", description: "Coming soon.", accentColor: "#10b981", socials: {}, recruitmentStatus: "unknown", departments: [], verified: false },
  { name: "Nakshatra", slug: "nakshatra", category: "technical", shortDescription: "Astronomy & Mathematics", description: "Coming soon.", accentColor: "#818cf8", socials: {}, recruitmentStatus: "unknown", departments: [], verified: false },
  { name: "GDG NSUT", slug: "gdg", category: "technical", shortDescription: "Google Developer Groups", description: "Coming soon.", accentColor: "#fbbc04", socials: {}, recruitmentStatus: "unknown", departments: [], verified: false },
  // Business
  { name: "Enactus NSUT", slug: "enactus", category: "business", shortDescription: "Social entrepreneurship", description: "Coming soon.", accentColor: "#eab308", socials: {}, recruitmentStatus: "unknown", departments: [], verified: false },
  { name: "FES", slug: "fes", category: "business", shortDescription: "Finance & Economics Society", description: "Coming soon.", accentColor: "#22c55e", socials: {}, recruitmentStatus: "unknown", departments: [], verified: false },
  { name: "E-Cell NSUT", slug: "e-cell", category: "business", shortDescription: "Entrepreneurship Cell", description: "Coming soon.", accentColor: "#f97316", socials: {}, recruitmentStatus: "unknown", departments: [], verified: false },
  { name: "TEDxNSUT", slug: "tedxnsut", category: "business", shortDescription: "Ideas worth spreading", description: "Coming soon.", accentColor: "#eb0028", socials: {}, recruitmentStatus: "unknown", departments: [], verified: false },
  { name: "180 Degrees Consulting", slug: "180dc", category: "business", shortDescription: "Consulting society", description: "Coming soon.", accentColor: "#0ea5e9", socials: {}, recruitmentStatus: "unknown", departments: [], verified: false },
  // Literary / Media
  { name: "Alliance", slug: "alliance", category: "literary", shortDescription: "NSUT Newspaper", description: "Coming soon.", accentColor: "#64748b", socials: {}, recruitmentStatus: "unknown", departments: [], verified: false },
  { name: "Crosslinks", slug: "crosslinks", category: "media", shortDescription: "Media society", description: "Coming soon.", accentColor: "#8b5cf6", socials: {}, recruitmentStatus: "unknown", departments: [], verified: false },
  { name: "DebSoc NSUT", slug: "debsoc", category: "literary", shortDescription: "Debating Society", description: "Coming soon.", accentColor: "#f43f5e", socials: {}, recruitmentStatus: "unknown", departments: [], verified: false },
  { name: "NSUT Quiz Club", slug: "quiz-club", category: "literary", shortDescription: "Quizzing community", description: "Coming soon.", accentColor: "#06b6d4", socials: {}, recruitmentStatus: "unknown", departments: [], verified: false },
  { name: "Aagaaz", slug: "aagaaz", category: "literary", shortDescription: "Poetry Society", description: "Coming soon.", accentColor: "#d946ef", socials: {}, recruitmentStatus: "unknown", departments: [], verified: false },
  { name: "Tatsam", slug: "tatsam", category: "literary", shortDescription: "Hindi Society", description: "Coming soon.", accentColor: "#f59e0b", socials: {}, recruitmentStatus: "unknown", departments: [], verified: false },
  { name: "Axiom", slug: "axiom", category: "literary", shortDescription: "Philosophy Society", description: "Coming soon.", accentColor: "#94a3b8", socials: {}, recruitmentStatus: "unknown", departments: [], verified: false },
  { name: "Intaglios", slug: "intaglios", category: "media", shortDescription: "Design Society", description: "Coming soon.", accentColor: "#ec4899", socials: {}, recruitmentStatus: "unknown", departments: [], verified: false },
  // Social
  { name: "Rotaract", slug: "rotaract", category: "social", shortDescription: "Community service", description: "Coming soon.", accentColor: "#e11d48", socials: {}, recruitmentStatus: "unknown", departments: [], verified: false },
  { name: "NSS", slug: "nss", category: "social", shortDescription: "National Service Scheme", description: "Coming soon.", accentColor: "#2563eb", socials: {}, recruitmentStatus: "unknown", departments: [], verified: false },
  { name: "Prayas", slug: "prayas", category: "social", shortDescription: "Social initiative", description: "Coming soon.", accentColor: "#16a34a", socials: {}, recruitmentStatus: "unknown", departments: [], verified: false },
  // Automotive
  { name: "Bullet Hawk Racing", slug: "bullet-hawk", category: "automotive", shortDescription: "Automotive team", description: "Coming soon.", accentColor: "#dc2626", socials: {}, recruitmentStatus: "unknown", departments: [], verified: false },
  { name: "NSUT Motorsports", slug: "motorsports", category: "automotive", shortDescription: "Motorsports team", description: "Coming soon.", accentColor: "#ea580c", socials: {}, recruitmentStatus: "unknown", departments: [], verified: false },
  { name: "Team Kalpana", slug: "team-kalpana", category: "automotive", shortDescription: "Engineering team", description: "Coming soon.", accentColor: "#7c3aed", socials: {}, recruitmentStatus: "unknown", departments: [], verified: false },
  // Sports
  { name: "NSUT Sports", slug: "sports", category: "sports", shortDescription: "Sports community", description: "Coming soon.", accentColor: "#22c55e", socials: {}, recruitmentStatus: "unknown", departments: [], verified: false },
  // Fests
  { name: "Moksha", slug: "moksha", category: "fests", shortDescription: "Annual cultural fest", description: "Coming soon.", accentColor: "#a855f7", socials: {}, recruitmentStatus: "unknown", departments: [], verified: false },
  { name: "Innovision", slug: "innovision", category: "fests", shortDescription: "Technical fest", description: "Coming soon.", accentColor: "#0ea5e9", socials: {}, recruitmentStatus: "unknown", departments: [], verified: false },
  { name: "Resonanz", slug: "resonanz", category: "fests", shortDescription: "Campus organization", description: "Coming soon.", accentColor: "#f43f5e", socials: {}, recruitmentStatus: "unknown", departments: [], verified: false },
];

export function getSocietyBySlug(slug: string): SocietySeed | undefined {
  return SEED_SOCIETIES.find((s) => s.slug === slug);
}
