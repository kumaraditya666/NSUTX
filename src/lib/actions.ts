"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createSupabaseServer } from "@/lib/supabase-server";

const announcementSchema = z.object({
  societySlug: z.string().min(1),
  title: z.string().min(3).max(120),
  body: z.string().max(2000).default(""),
});

export async function publishAnnouncement(input: { societySlug: string; title: string; body?: string }): Promise<{ ok: boolean; error?: string }> {
  const parsed = announcementSchema.safeParse({ ...input, body: input.body ?? "" });
  if (!parsed.success) return { ok: false, error: "Invalid input." };
  try {
    const supabase = await createSupabaseServer();
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return { ok: false, error: "Login required (society admin)." };
    const { data: society } = await supabase.from("societies").select("id").eq("slug", parsed.data.societySlug).single();
    if (!society) return { ok: false, error: "Society not found." };
    const { error } = await supabase.from("announcements").insert({
      society_id: (society as { id: string }).id,
      title: parsed.data.title,
      body: parsed.data.body,
    } as never);
    if (error) return { ok: false, error: error.message };
    revalidatePath(`/societies/${parsed.data.societySlug}/updates`);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

const eventSchema = z.object({
  societySlug: z.string().min(1),
  title: z.string().min(3).max(120),
  venue: z.string().min(1).max(120),
  startsAt: z.string().min(1),
  endsAt: z.string().min(1),
});

export async function createEvent(input: { societySlug: string; title: string; venue: string; startsAt: string; endsAt: string }): Promise<{ ok: boolean; error?: string }> {
  const parsed = eventSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Invalid input." };
  try {
    const supabase = await createSupabaseServer();
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return { ok: false, error: "Login required (society admin)." };
    const { data: society } = await supabase.from("societies").select("id").eq("slug", parsed.data.societySlug).single();
    if (!society) return { ok: false, error: "Society not found." };
    const { error } = await supabase.from("events").insert({
      society_id: (society as { id: string }).id,
      title: parsed.data.title,
      venue: parsed.data.venue,
      starts_at: parsed.data.startsAt,
      ends_at: parsed.data.endsAt,
    } as never);
    if (error) return { ok: false, error: error.message };
    revalidatePath(`/societies/${parsed.data.societySlug}/events`);
    revalidatePath("/events");
    revalidatePath("/live");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

export async function registerForEvent(input: { eventId: string }): Promise<{ ok: boolean; error?: string }> {
  const parsed = z.object({ eventId: z.string().min(1) }).safeParse(input);
  if (!parsed.success) return { ok: false, error: "Invalid input." };
  try {
    const supabase = await createSupabaseServer();
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return { ok: false, error: "Login required." };
    await supabase.from("profiles").upsert({ id: user.user.id, email: user.user.email ?? undefined } as never);
    const { error } = await supabase.from("event_registrations").insert({
      event_id: parsed.data.eventId,
      user_id: user.user.id,
    } as never);
    if (error) return { ok: false, error: error.message };
    revalidatePath("/nsut-mode");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

export async function followSociety(input: { societySlug: string }): Promise<{ ok: boolean; error?: string }> {
  const parsed = z.object({ societySlug: z.string().min(1) }).safeParse(input);
  if (!parsed.success) return { ok: false, error: "Invalid input." };
  try {
    const supabase = await createSupabaseServer();
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return { ok: false, error: "Login required." };
    const { data: society } = await supabase.from("societies").select("id").eq("slug", parsed.data.societySlug).single();
    if (!society) return { ok: false, error: "Society not found." };
    await supabase.from("profiles").upsert({ id: user.user.id, email: user.user.email ?? undefined } as never);
    const { error } = await supabase.from("follows").insert({
      user_id: user.user.id,
      society_id: (society as { id: string }).id,
    } as never);
    if (error) return { ok: false, error: error.message };
    revalidatePath("/nsut-mode");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}
