"use client";

import * as React from "react";

export function EasterEgg(): React.JSX.Element {
  const [found, setFound] = React.useState(0);
  React.useEffect(() => {
    let seq = "";
    function onKey(e: KeyboardEvent): void {
      seq = `${seq}${e.key.toLowerCase()}`.slice(-4);
      if (seq === "nsut") setFound((f) => f + 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  if (found === 0) return <p className="text-center text-xs opacity-40">Psst… type “nsut” anywhere 👀</p>;
  return (
    <p role="status" className="animate-fade-in text-center">
      🎉 You found the NSUT easter egg ×{found}! Moksha forever.
    </p>
  );
}

export function InstallPrompt(): React.JSX.Element {
  const [deferred, setDeferred] = React.useState<Event | null>(null);
  React.useEffect(() => {
    function onPrompt(e: Event): void {
      e.preventDefault();
      setDeferred(e);
    }
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);
  if (!deferred) return <></>;
  return (
    <button
      type="button"
      onClick={() => {
        (deferred as unknown as { prompt: () => void }).prompt();
        setDeferred(null);
      }}
      className="rounded-full border px-4 py-1.5 text-sm"
    >
      ⬇ Install NSUTX
    </button>
  );
}
