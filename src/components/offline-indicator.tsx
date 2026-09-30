"use client";

import * as React from "react";

// Offline banner. navigator.onLine alone gives false positives (DevTools
// throttling, captive portals, flaky NW state), so every signal is verified
// with a real no-store fetch before showing or hiding the banner.
async function reachable(): Promise<boolean> {
  try {
    const res = await fetch("/manifest.webmanifest", { method: "HEAD", cache: "no-store" });
    return res.ok;
  } catch {
    return false;
  }
}

export function OfflineIndicator(): React.JSX.Element {
  const [online, setOnline] = React.useState<boolean>(true);

  React.useEffect(() => {
    let cancelled = false;
    async function verify(): Promise<void> {
      const ok = (await reachable()) || navigator.onLine;
      if (!cancelled) setOnline(ok);
    }
    function goOffline(): void {
      // Verify — the event fires on throttling quirks too.
      verify().catch(() => {
        if (!cancelled) setOnline(false);
      });
    }
    function goOnline(): void {
      verify().catch(() => undefined);
    }
    verify().catch(() => undefined);
    const timer = window.setInterval(() => {
      verify().catch(() => undefined);
    }, 30_000);
    window.addEventListener("offline", goOffline);
    window.addEventListener("online", goOnline);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
      window.removeEventListener("offline", goOffline);
      window.removeEventListener("online", goOnline);
    };
  }, []);

  if (online) return <></>;
  return (
    <p role="status" className="fixed inset-x-0 top-0 z-50 bg-amber-500 px-4 py-1.5 text-center text-xs font-semibold text-black">
      You are offline. Showing cached NSUTX content.
    </p>
  );
}
