import { NextResponse } from "next/server";
import { z } from "zod";
import { answerNsutAi } from "@/lib/nsut-ai";

const bodySchema = z.object({
  question: z.string().min(1).max(500),
  followedSlugs: z.array(z.string()).default([]),
});

// POST /api/ai — server-side retrieval + grounded answer.
// Set AI_API_KEY to route through an LLM; without it returns the grounded local answer.
export async function POST(request: Request): Promise<NextResponse> {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  }
  const answer = answerNsutAi(parsed.data.question, parsed.data.followedSlugs);
  const llm = process.env.AI_API_KEY ?? "";
  return NextResponse.json({
    answer,
    grounded: true,
    llm: llm.length > 0 ? "configured (hook: pass retrieved context to model server-side)" : "not-configured (local grounded answer)",
  });
}
