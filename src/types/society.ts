import type { SocietyCategory } from "@/lib/constants";

export interface SocietySocials {
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  twitter?: string;
  discord?: string;
}

export interface Society {
  id: string;
  name: string;
  slug: string;
  category: SocietyCategory;
  shortDescription: string;
  description: string;
  logoUrl?: string;
  coverUrl?: string;
  accentColor: string;
  socials: SocietySocials;
  website?: string;
  email?: string;
  recruitmentStatus: "open" | "closed" | "coming-soon" | "unknown";
  departments: string[];
  createdYear?: number;
  verified: boolean;
  activityScore: number;
  memberCount?: undefined;
}

export interface SocietySeed extends Omit<Society, "id" | "activityScore"> {
  activityScore?: number;
}

export interface EventItem {
  id: string;
  title: string;
  societySlug: string;
  societyName: string;
  description?: string;
  startsAt: string;
  endsAt: string;
  venue: string;
  status: "live" | "starting-soon" | "upcoming" | "past";
  registrationOpen: boolean;
  registrationLink?: string;
  capacity?: number;
  eligibility?: string;
}

export interface Announcement {
  id: string;
  societySlug: string;
  societyName: string;
  title: string;
  body: string;
  pinned: boolean;
  publishedAt: string;
}

export interface Opportunity {
  id: string;
  societySlug: string;
  societyName: string;
  title: string;
  description: string;
  type: string;
  deadline?: string;
  eligibility?: string;
  applicationLink?: string;
  status: "open" | "closing-soon" | "closed";
}
