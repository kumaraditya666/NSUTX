import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-md bg-black/10 dark:bg-white/10", className)}
      {...props}
    />
  );
}
