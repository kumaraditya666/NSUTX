"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): React.JSX.Element {
  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);
  return (
    <div role="alert" className="mx-auto max-w-xl px-4 py-16 text-center">
      <h2 className="text-2xl font-bold">Something went wrong.</h2>
      <p className="mt-2 opacity-70">{error.message || "An unexpected error occurred."}</p>
      <div className="mt-6 flex justify-center gap-3">
        <Button onClick={reset}>Try again</Button>
      </div>
      {error.digest ? <p className="mt-3 text-xs opacity-60">Error ID: {error.digest}</p> : null}
    </div>
  );
}
