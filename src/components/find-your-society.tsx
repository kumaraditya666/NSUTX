"use client";

import { INTEREST_OPTIONS } from "@/lib/constants";
import { SEED_SOCIETIES } from "@/lib/seed-societies";
import { DEMO_SOCIETY_DETAILS } from "@/lib/demo-data";
import { SocietyCard } from "@/components/society-card";
import { useNsutModeStore } from "@/stores/nsut-mode";

export function FindYourSociety(): React.JSX.Element {
  const interests = useNsutModeStore((s) => s.interests);
  const toggleInterest = useNsutModeStore((s) => s.toggleInterest);
  const matches = SEED_SOCIETIES.filter((s) => {
    const tags = DEMO_SOCIETY_DETAILS[s.slug]?.interests ?? [s.category];
    return interests.length === 0 || interests.some((i) => tags.includes(i) || s.category.includes(i));
  }).slice(0, 6);

  return (
    <div className="rounded-3xl border border-black/10 p-6 dark:border-white/10">
      <h2 className="text-xl font-bold">What are you into?</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {INTEREST_OPTIONS.map((o) => {
          const active = interests.includes(o.id);
          return (
            <button key={o.id} type="button" onClick={() => toggleInterest(o.id)} aria-pressed={active} className={active ? "rounded-full bg-foreground px-3 py-1.5 text-sm text-background" : "rounded-full border px-3 py-1.5 text-sm"}>
              <span aria-hidden="true">{o.icon} </span>{o.label}
            </button>
          );
        })}
      </div>
      <h3 className="mt-6 font-semibold">Societies you may want to explore</h3>
      <p className="text-xs opacity-60">Interest match only — never ranked as better/worse.</p>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        {matches.map((s) => (<SocietyCard key={s.slug} society={s} />))}
      </div>
    </div>
  );
}
