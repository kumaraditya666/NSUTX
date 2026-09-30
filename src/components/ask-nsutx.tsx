"use client";

import * as React from "react";
import { NsutAiChat } from "@/components/nsut-ai-chat";

export function AskNsutx(): React.JSX.Element {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="fixed bottom-20 right-4 z-40 inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-semibold text-background shadow-lg transition-transform hover:scale-105 md:bottom-6"
      >
        <span aria-hidden="true">✦</span> Ask NSUTX
      </button>
      {open ? (
        <div role="dialog" aria-modal="true" aria-label="Ask NSUTX" className="fixed inset-0 z-50 bg-black/60 p-4" onClick={() => setOpen(false)}>
          <div className="mx-auto mt-10 max-w-xl rounded-2xl border bg-background p-5" style={{ borderColor: "var(--hairline)" }} onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-bold">✦ Ask NSUTX</h2>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="rounded-full border px-3 py-1 text-sm" style={{ borderColor: "var(--hairline)" }}>
                Esc
              </button>
            </div>
            <NsutAiChat />
          </div>
        </div>
      ) : null}
    </>
  );
}
