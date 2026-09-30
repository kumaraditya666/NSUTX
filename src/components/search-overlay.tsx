"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { universalSearch } from "@/lib/search";
import { useUiStore } from "@/stores/nsut-mode";
import { cn } from "@/lib/utils";

interface Item {
  key: string;
  group: string;
  label: string;
  detail: string;
  href: string;
}

export function SearchOverlay(): React.JSX.Element {
  const searchOpen = useUiStore((s) => s.searchOpen);
  const setSearchOpen = useUiStore((s) => s.setSearchOpen);
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const router = useRouter();
  const results = universalSearch(query);

  const items: Item[] = React.useMemo(() => {
    const list: Item[] = [];
    for (const s of results.societies) list.push({ key: `s-${s.slug}`, group: "Societies", label: s.name, detail: s.shortDescription, href: `/societies/${s.slug}` });
    for (const e of results.events) list.push({ key: `e-${e.id}`, group: "Events", label: e.title, detail: e.societyName, href: `/events/${e.id}` });
    for (const a of results.announcements) list.push({ key: `a-${a.id}`, group: "Announcements", label: a.title, detail: a.societyName, href: `/societies/${a.societySlug}/updates` });
    for (const o of results.opportunities) list.push({ key: `o-${o.id}`, group: "Opportunities", label: o.title, detail: o.societyName, href: "/opportunities" });
    for (const g of results.gallery) list.push({ key: `g-${g.id}`, group: "Memories", label: g.title, detail: `${g.societyName} · ${g.year}`, href: `/memories?society=${g.societySlug}` });
    for (const p of results.people) list.push({ key: `p-${p.societySlug}-${p.role}`, group: "People", label: `${p.role} — ${p.societyName}`, detail: p.name, href: `/societies/${p.societySlug}/team` });
    return list;
  }, [results]);

  function go(href: string): void {
    setSearchOpen(false);
    router.push(href);
  }

  function onInputKey(e: React.KeyboardEvent): void {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      const item = items[active];
      if (item) go(item.href);
    }
  }

  React.useEffect(() => {
    function openPalette(): void {
      setQuery("");
      setSearchOpen(true);
    }
    function onKey(e: KeyboardEvent): void {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openPalette();
      }
      if (e.key === "Escape") setSearchOpen(false);
    }
    function onOpen(): void {
      openPalette();
    }
    window.addEventListener("keydown", onKey);
    document.addEventListener("nsut:open-search", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("nsut:open-search", onOpen);
    };
  }, [setSearchOpen]);

  React.useEffect(() => {
    document.getElementById(`cmd-item-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (!searchOpen) return <></>;
  let lastGroup = "";
  return (
    <div role="dialog" aria-modal="true" aria-label="Search NSUTX" className="fixed inset-0 z-50 bg-black/60 p-4" onClick={() => setSearchOpen(false)}>
      <div className="mx-auto mt-16 max-w-2xl rounded-2xl border bg-background p-3 shadow-2xl" style={{ borderColor: "var(--hairline)" }} onClick={(e) => e.stopPropagation()}>
        <label htmlFor="global-search" className="sr-only">Search NSUTX</label>
        <input
          id="global-search"
          autoFocus
          role="combobox"
          aria-expanded="true"
          aria-controls="cmd-listbox"
          aria-activedescendant={items[active] ? `cmd-item-${active}` : undefined}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onInputKey}
          placeholder="Search NSUTX… societies, events, announcements, opportunities"
          className="h-12 w-full rounded-xl border bg-transparent px-4"
          style={{ borderColor: "var(--hairline)" }}
        />
        <div id="cmd-listbox" role="listbox" aria-label="Results" className="mt-2 max-h-80 overflow-auto">
          {items.map((item, i) => {
            const header = item.group !== lastGroup ? item.group : null;
            lastGroup = item.group;
            return (
              <React.Fragment key={item.key}>
                {header ? <p className="px-2 pb-1 pt-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] opacity-50">{header}</p> : null}
                <div
                  id={`cmd-item-${i}`}
                  role="option"
                  aria-selected={i === active}
                  onClick={() => go(item.href)}
                  onMouseEnter={() => setActive(i)}
                  className={cn(
                    "cursor-pointer rounded-xl px-3 py-2",
                    i === active ? "bg-black/10 dark:bg-white/15" : "",
                  )}
                >
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs opacity-60">{item.detail}</p>
                </div>
              </React.Fragment>
            );
          })}
          {query.trim().length > 0 && items.length === 0 ? (
            <p className="px-2 py-4 text-sm opacity-60">No results. Try “robotics”, “photo”, “finance”.</p>
          ) : null}
          {query.trim().length === 0 ? (
            <p className="px-2 py-4 text-xs opacity-50">↑↓ navigate · Enter opens · Esc closes</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
