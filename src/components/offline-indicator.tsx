"use client";

import * as React from "react";

// Offline banner — honest about stale data, never pretends live data works offline.
export function OfflineIndicator(): React.JSX.Element {
  const [online, setOnline] = React.useState<boolean>(
    () => typeof navigator === "undefined" || navigator.onLine,
  );
  React.useEffect(() => {
    function goOffline(): void {
      setOnline(false);
    }
    function goOnline(): void {
      setOnline(true);
    }
    window.addEventListener("offline", goOffline);
    window.addEventListener("online", goOnline);
    return () => {
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
