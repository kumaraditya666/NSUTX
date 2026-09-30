import Link from "next/link";
import type { SocietySeed } from "@/types/society";
import { VerifiedBadge } from "@/components/verified-badge";
import { FALLBACK_TEXT } from "@/lib/constants";

export interface SocietyCardActivity {
  upcomingCount: number;
  nextEventTitle?: string;
  recruitmentOpen: boolean;
}

export function SocietyCard({
  society,
  activity,
}: {
  society: SocietySeed;
  activity?: SocietyCardActivity;
}): React.JSX.Element {
  return (
    <Link
      href={`/societies/${society.slug}`}
      aria-label={`${society.name} mini website`}
      className="soc-card group flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-200 hover:-translate-y-1"
      style={{ borderColor: "var(--hairline)", ["--soc-accent" as string]: society.accentColor } as React.CSSProperties}
    >
      {/* Cover */}
      <div
        aria-hidden="true"
        className="relative flex h-20 items-end p-3"
        style={{ background: `linear-gradient(120deg, ${society.accentColor}33, transparent 70%)` }}
      >
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] opacity-60">
          {society.category}
        </span>
        {activity?.recruitmentOpen ? (
          <span className="absolute right-3 top-3 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[0.65rem] font-semibold text-emerald-600 dark:text-emerald-300">
            Recruitment open
          </span>
        ) : null}
      </div>
      {/* Body */}
      <div className="flex flex-1 flex-col gap-1 p-4 pt-0">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="-mt-7 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg font-bold text-white transition-transform duration-200 group-hover:scale-105"
            style={{ backgroundColor: society.accentColor, boxShadow: "0 0 0 4px var(--background)" }}
          >
            {society.name.slice(0, 1)}
          </span>
          <div className="min-w-0 pt-5">
            <p className="truncate font-bold leading-tight">{society.name}</p>
            <p className="truncate text-xs opacity-60">{society.shortDescription || FALLBACK_TEXT}</p>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between gap-2 text-xs">
          <span className="truncate opacity-60">
            {activity ? (
              activity.upcomingCount > 0 ? (
                <>{activity.upcomingCount} upcoming · {activity.nextEventTitle ?? "See events"}</>
              ) : (
                "No upcoming events"
              )
            ) : (
              <>&nbsp;</>
            )}
          </span>
          <span aria-hidden="true" className="shrink-0 font-semibold opacity-60 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">
            Visit →
          </span>
        </div>
        <div className="mt-1">
          <VerifiedBadge verified={society.verified} />
        </div>
      </div>
    </Link>
  );
}
