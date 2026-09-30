"use client";

import * as React from "react";
import Link from "next/link";
import { universalSearch } from "@/lib/search";
import { useUiStore } from "@/stores/nsut-mode";

export function SearchOverlay(): React.JSX.Element {
  const searchOpen = useUiStore((s) => s.searchOpen);
  const setSearchOpen = useUiStore((s) => s.setSearchOpen);
  const [query, setQuery] = React.useState("");
  const results = universalSearch(query);

  React.useEffect(() => {
    function onKey(e: KeyboardEvent): void {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") setSearchOpen(false);
    }
    function onOpen(): void {
      setSearchOpen(true);
    }
    window.addEventListener("keydown", onKey);
    document.addEventListener("nsut:open-search", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("nsut:open-search", onOpen);
    };
  }, [setSearchOpen]);

  if (!searchOpen) return <></>;
  return (
    <div role="dialog" aria-modal="true" aria-label="Universal search" className="fixed inset-0 z-50 bg-black/50 p-4" onClick={() => setSearchOpen(false)}>
      <div className="mx-auto max-w-2xl rounded-3xl bg-background p-4" onClick={(e) => e.stopPropagation()}>
        <label htmlFor="global-search" className="sr-only">Search societies, events, opportunities</label>
        <input
          id="global-search"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search "photography"…'
          className="h-12 w-full rounded-2xl border border-black/15 bg-transparent px-4 dark:border-white/20"
        />
        <div className="mt-4 max-h-96 space-y-4 overflow-auto">
          {results.societies.length > 0 ? (
            <section><h3 className="text-sm font-semibold opacity-60">Societies</h3>
              {results.societies.map((s) => (<Link key={s.slug} href={`/societies/${s.slug}`} onClick={() => setSearchOpen(false)} className="block rounded-xl px-2 py-1.5 hover:bg-black/5 dark:hover:bg-white/10">{s.name} — {s.shortDescription}</Link>))}
            </section>
          ) : null}
          {results.events.length > 0 ? (
            <section><h3 className="text-sm font-semibold opacity-60">Events</h3>
              {results.events.map((e) => (<Link key={e.id} href={`/events/${e.id}`} onClick={() => setSearchOpen(false)} className="block rounded-xl px-2 py-1.5 hover:bg-black/5 dark:hover:bg-white/10">{e.title} — {e.societyName}</Link>))}
            </section>
          ) : null}
          {results.opportunities.length > 0 ? (
            <section><h3 className="text-sm font-semibold opacity-60">Opportunities</h3>
              {results.opportunities.map((o) => (<Link key={o.id} href="/opportunities" onClick={() => setSearchOpen(false)} className="block rounded-xl px-2 py-1.5 hover:bg-black/5 dark:hover:bg-white/10">{o.title} — {o.societyName}</Link>))}
            </section>
          ) : null}
          {query.trim().length > 0 && results.societies.length === 0 && results.events.length === 0 ? (
            <p className="text-sm opacity-60">No verified results. Try “robotics”, “photo”, “finance”.</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
