export const SITE_NAME = "NSUT Hub";
export const SITE_TAGLINE = "Everything happening at NSUT. One place.";
export const SITE_HERO_TITLE = "NSUT, but connected.";
export const SITE_HERO_SUB =
  "Discover societies, events, opportunities and everything happening around campus.";

export const SOCIETY_CATEGORIES = [
  "technical",
  "cultural",
  "literary",
  "business",
  "social",
  "sports",
  "automotive",
  "fests",
  "media",
] as const;

export type SocietyCategory = (typeof SOCIETY_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<SocietyCategory, string> = {
  technical: "Technical",
  cultural: "Recreational / Cultural",
  literary: "Literary / Media",
  business: "Non-Technical / Business",
  social: "Social / Community",
  sports: "Sports",
  automotive: "Automotive / Engineering",
  fests: "Fests / Campus Orgs",
  media: "Media / Design",
};

export const INTEREST_OPTIONS = [
  { id: "coding", label: "Coding", icon: "💻" },
  { id: "robotics", label: "Robotics", icon: "🤖" },
  { id: "finance", label: "Finance", icon: "📈" },
  { id: "design", label: "Design", icon: "🎨" },
  { id: "photography", label: "Photography", icon: "📸" },
  { id: "music", label: "Music", icon: "🎵" },
  { id: "drama", label: "Drama", icon: "🎭" },
  { id: "dance", label: "Dance", icon: "💃" },
  { id: "debate", label: "Debate", icon: "🗣️" },
  { id: "writing", label: "Writing", icon: "✍️" },
  { id: "gaming", label: "Gaming", icon: "🎮" },
  { id: "automotive", label: "Automotive", icon: "🏎️" },
  { id: "science", label: "Science", icon: "🔬" },
  { id: "social-impact", label: "Social Impact", icon: "🌍" },
  { id: "literature", label: "Literature", icon: "📚" },
  { id: "media", label: "Media", icon: "🎥" },
] as const;

export const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/live", label: "Live" },
  { href: "/events", label: "Events" },
  { href: "/opportunities", label: "Opportunities" },
  { href: "/nsut-mode", label: "NSUT Mode" },
] as const;

export const MOBILE_NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/live", label: "Live" },
  { href: "/events", label: "Events" },
  { href: "/nsut-mode", label: "NSUT Mode" },
] as const;

export const FALLBACK_TEXT = "Information coming soon.";
