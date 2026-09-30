import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonProps = React.ComponentProps<"button"> & {
  variant?: "default" | "secondary" | "ghost" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
  ref?: React.Ref<HTMLButtonElement>;
};

const VARIANT_CLASSES: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default: "bg-foreground text-background hover:opacity-90",
  secondary: "bg-neutral-800 text-white hover:bg-neutral-700 dark:bg-neutral-200 dark:text-neutral-900",
  ghost: "hover:bg-black/5 dark:hover:bg-white/10",
  outline: "border border-current/20 hover:bg-black/5 dark:hover:bg-white/10",
};

const SIZE_CLASSES: Record<NonNullable<ButtonProps["size"]>, string> = {
  default: "h-10 px-4 py-2",
  sm: "h-8 px-3 text-sm",
  lg: "h-12 px-6 text-base",
  icon: "h-10 w-10",
};

export function Button({
  variant = "default",
  size = "default",
  className,
  ref,
  type,
  ...props
}: ButtonProps): React.JSX.Element {
  return (
    <button
      ref={ref}
      type={type ?? "button"}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className,
      )}
      {...props}
    />
  );
}
