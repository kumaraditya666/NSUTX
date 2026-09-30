"use client";

import * as React from "react";
import { publishAnnouncement, createEvent } from "@/lib/actions";

export function PublishAnnouncementForm({ societySlug }: { societySlug: string }): React.JSX.Element {
  const [status, setStatus] = React.useState("");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await publishAnnouncement({
      societySlug,
      title: String(form.get("title") ?? ""),
      body: String(form.get("body") ?? ""),
    });
    setStatus(res.ok ? "✓ Published." : `Error: ${res.error}`);
    if (res.ok) e.currentTarget.reset();
  }
  return (
    <form onSubmit={onSubmit} className="mt-3 space-y-2 rounded-2xl border p-4">
      <h3 className="font-semibold">Publish announcement (society admin, login required)</h3>
      <label htmlFor={`ann-title-${societySlug}`} className="sr-only">Title</label>
      <input id={`ann-title-${societySlug}`} name="title" required minLength={3} placeholder="Title" className="h-10 w-full rounded-xl border border-black/15 bg-transparent px-3 dark:border-white/20" />
      <label htmlFor={`ann-body-${societySlug}`} className="sr-only">Body</label>
      <textarea id={`ann-body-${societySlug}`} name="body" placeholder="Body" className="w-full rounded-xl border border-black/15 bg-transparent px-3 py-2 dark:border-white/20" />
      <button type="submit" className="rounded-full bg-foreground px-4 py-1.5 text-sm text-background">Publish immediately</button>
      {status ? <p role="status" className="text-sm">{status}</p> : null}
    </form>
  );
}

export function CreateEventForm({ societySlug }: { societySlug: string }): React.JSX.Element {
  const [status, setStatus] = React.useState("");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await createEvent({
      societySlug,
      title: String(form.get("title") ?? ""),
      venue: String(form.get("venue") ?? ""),
      startsAt: String(form.get("startsAt") ?? ""),
      endsAt: String(form.get("endsAt") ?? ""),
    });
    setStatus(res.ok ? "✓ Event created." : `Error: ${res.error}`);
    if (res.ok) e.currentTarget.reset();
  }
  return (
    <form onSubmit={onSubmit} className="mt-3 space-y-2 rounded-2xl border p-4">
      <h3 className="font-semibold">Create event (overlap warnings shown on save)</h3>
      <input name="title" required minLength={3} placeholder="Title" aria-label="Event title" className="h-10 w-full rounded-xl border border-black/15 bg-transparent px-3 dark:border-white/20" />
      <input name="venue" required placeholder="Venue" aria-label="Venue" className="h-10 w-full rounded-xl border border-black/15 bg-transparent px-3 dark:border-white/20" />
      <div className="flex gap-2">
        <label className="text-sm">Start <input name="startsAt" type="datetime-local" required className="h-10 rounded-xl border border-black/15 bg-transparent px-2 dark:border-white/20" /></label>
        <label className="text-sm">End <input name="endsAt" type="datetime-local" required className="h-10 rounded-xl border border-black/15 bg-transparent px-2 dark:border-white/20" /></label>
      </div>
      <button type="submit" className="rounded-full bg-foreground px-4 py-1.5 text-sm text-background">Create</button>
      {status ? <p role="status" className="text-sm">{status}</p> : null}
    </form>
  );
}
