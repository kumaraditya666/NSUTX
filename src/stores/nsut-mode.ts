"use client";

import { create } from "zustand";

interface UiState {
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
}

export const useUiStore = create<UiState>()((set) => ({
  searchOpen: false,
  setSearchOpen: (open: boolean) => set({ searchOpen: open }),
}));

interface NsutModeState {
  year: string | undefined;
  interests: string[];
  followedSlugs: string[];
  setYear: (year: string) => void;
  toggleInterest: (id: string) => void;
  toggleFollow: (slug: string) => void;
}

const STORAGE_KEY = "nsut-mode-v1";

function loadInitial(): Pick<NsutModeState, "year" | "interests" | "followedSlugs"> {
  if (typeof window === "undefined") {
    return { year: undefined, interests: [], followedSlugs: [] };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { year: undefined, interests: [], followedSlugs: [] };
    const parsed = JSON.parse(raw) as Partial<NsutModeState>;
    return {
      year: typeof parsed.year === "string" ? parsed.year : undefined,
      interests: Array.isArray(parsed.interests) ? parsed.interests.filter((x): x is string => typeof x === "string") : [],
      followedSlugs: Array.isArray(parsed.followedSlugs)
        ? parsed.followedSlugs.filter((x): x is string => typeof x === "string")
        : [],
    };
  } catch {
    return { year: undefined, interests: [], followedSlugs: [] };
  }
}

export const useNsutModeStore = create<NsutModeState>()((set, get) => ({
  ...loadInitial(),
  setYear: (year: string) => {
    set({ year });
    persist(get());
  },
  toggleInterest: (id: string) => {
    const interests = get().interests.includes(id)
      ? get().interests.filter((x) => x !== id)
      : [...get().interests, id];
    set({ interests });
    persist(get());
  },
  toggleFollow: (slug: string) => {
    const followedSlugs = get().followedSlugs.includes(slug)
      ? get().followedSlugs.filter((x) => x !== slug)
      : [...get().followedSlugs, slug];
    set({ followedSlugs });
    persist(get());
  },
}));

function persist(state: NsutModeState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ year: state.year, interests: state.interests, followedSlugs: state.followedSlugs }),
    );
  } catch {
    // storage unavailable — NSUT Mode still works in-memory
  }
}
