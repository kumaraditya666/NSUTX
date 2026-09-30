import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: React.ComponentProps<"div">): React.JSX.Element {
  return (
    <div
      className={cn(
        "rounded-2xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-neutral-950",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: React.ComponentProps<"div">): React.JSX.Element {
  return <div className={cn("flex flex-col gap-1.5 p-6", className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: React.ComponentProps<"h3">): React.JSX.Element {
  return (
    <h3 className={cn("text-lg font-semibold leading-none", className)} {...props} />
  );
}

export function CardDescription({
  className,
  ...props
}: React.ComponentProps<"p">): React.JSX.Element {
  return (
    <p className={cn("text-sm opacity-70", className)} {...props} />
  );
}

export function CardContent({
  className,
  ...props
}: React.ComponentProps<"div">): React.JSX.Element {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}
