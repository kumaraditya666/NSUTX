"use client";

import * as React from "react";
import { createSupabaseBrowser } from "@/lib/supabase-browser";

export default function LoginPage(): React.JSX.Element {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<string>("");

  async function send(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    setStatus("Sending…");
    try {
      const supabase = createSupabaseBrowser();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/nsut-mode` },
      });
      setStatus(error ? `Error: ${error.message}` : `✓ Magic link sent to ${email}. Demo works without keys; connect Supabase for real auth.`);
    } catch (err) {
      setStatus(`Demo mode: magic link would go to ${email}. ${(err as Error).message}`);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-3xl font-bold">Login</h1>
      <p className="mt-1 text-sm opacity-70">Passwordless magic link via Supabase Auth. Google login optional in production.</p>
      <form className="mt-6 space-y-3" onSubmit={send}>
        <label htmlFor="email" className="sr-only">Email</label>
        <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@nsut.ac.in" className="h-11 w-full rounded-2xl border border-black/15 bg-transparent px-4 dark:border-white/20" />
        <button type="submit" className="h-11 w-full rounded-full bg-foreground text-background">Send magic link</button>
      </form>
      {status.length > 0 ? <p role="status" className="mt-3 text-sm">{status}</p> : null}
    </div>
  );
}
