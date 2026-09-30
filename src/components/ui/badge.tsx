import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeProps = React.ComponentProps<"span"> & {
  variant?: "default" | "live" | "soon" | "open" | "muted";
};

const VARIANTS: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "bg-black/5 text-current dark:bg-white/10",
  live: "bg-red-500/10 text-red-600 dark:text-red-400",
  soon: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  open: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  muted: "bg-transparent border border-current/20 opacity-70",
};

export function Badge({ variant = "default", className, ...props }: BadgeProps): React.JSX.Element {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        VARIANTS[variant],
        className,
      )}
      {...props}
    />
  );
}
