"use client";

import * as React from "react";
import { answerNsutAi } from "@/lib/nsut-ai";
import { useNsutModeStore } from "@/stores/nsut-mode";

export function NsutAiChat(): React.JSX.Element {
  const followedSlugs = useNsutModeStore((s) => s.followedSlugs);
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Hi! I'm NSUTX AI, grounded in campus data. Ask: What events are happening today? Which societies have recruitment open?" },
  ]);

  function send(e: React.FormEvent): void {
    e.preventDefault();
    const q = input.trim();
    if (q.length === 0) return;
    const answer = answerNsutAi(q, followedSlugs);
    setMessages((m) => [...m, { role: "user", text: q }, { role: "ai", text: answer }]);
    setInput("");
  }

  return (
    <div>
      <div className="space-y-3" aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "ml-auto max-w-[80%] rounded-2xl bg-foreground px-4 py-2 text-background" : "max-w-[90%] whitespace-pre-line rounded-2xl border border-black/10 px-4 py-2 dark:border-white/15"}>
            {m.text}
          </div>
        ))}
      </div>
      <form onSubmit={send} className="mt-4 flex gap-2">
        <label htmlFor="ai-input" className="sr-only">Ask NSUT AI</label>
        <input id="ai-input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="What events are happening today?" className="h-11 flex-1 rounded-full border border-black/15 bg-transparent px-4 dark:border-white/20" />
        <button type="submit" className="h-11 rounded-full bg-foreground px-5 text-background">Ask</button>
      </form>
      <p className="mt-2 text-xs opacity-60">Answers come from NSUTX data. API keys stay server-side.</p>
    </div>
  );
}
