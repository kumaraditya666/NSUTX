"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MOBILE_NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function MobileNav(): React.JSX.Element {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Mobile"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-background/95 backdrop-blur md:hidden"
    >
      <ul className="mx-auto grid max-w-md grid-cols-5 gap-1 px-2 py-2">
        {MOBILE_NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={cn(
                "flex min-h-11 flex-col items-center justify-center rounded-xl px-1 py-1 text-xs",
                pathname === item.href ? "bg-black/10 font-semibold dark:bg-white/15" : "opacity-70",
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
