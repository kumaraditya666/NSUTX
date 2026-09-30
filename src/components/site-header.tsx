"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function SiteHeader(): React.JSX.Element {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-background/80 backdrop-blur dark:border-white/10">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight" aria-label="NSUT Hub home">
          <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-xl bg-foreground text-background">
            N
          </span>
          <span>
            NSUT Hub
            <span className="ml-2 hidden rounded-full bg-black/5 px-2 py-0.5 text-xs font-medium sm:inline dark:bg-white/10">
              Beta
            </span>
          </span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm",
                pathname === item.href ? "bg-black/10 font-semibold dark:bg-white/15" : "opacity-70 hover:opacity-100",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            data-search-shortcut
            className="rounded-full border border-black/10 px-3 py-1.5 text-sm opacity-80 hover:opacity-100 dark:border-white/15"
            aria-label="Search (Ctrl+K)"
            onClick={() => document.dispatchEvent(new CustomEvent("nsut:open-search"))}
          >
            Search <kbd className="ml-1 rounded bg-black/5 px-1 text-xs dark:bg-white/10">Ctrl K</kbd>
          </button>
          <Link
            href="/nsut-mode"
            className="rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background"
          >
            NSUT Mode
          </Link>
          <Link href="/login" className="hidden rounded-full border border-black/10 px-3 py-1.5 text-sm sm:inline dark:border-white/15">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
