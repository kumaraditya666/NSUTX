import { notFound } from "next/navigation";
import { getSocietyBySlug } from "@/lib/seed-societies";
import { FALLBACK_TEXT } from "@/lib/constants";
import { VerifiedBadge } from "@/components/verified-badge";

export default async function SocietyAbout({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<React.JSX.Element> {
  const { slug } = await params;
  const society = getSocietyBySlug(slug);
  if (!society) notFound();
  return (
    <div>
      <h1 className="text-2xl font-bold">About {society.name}</h1>
      <p className="mt-2 max-w-2xl">{society.description || FALLBACK_TEXT}</p>
      <dl className="mt-6 grid gap-3 text-sm">
        <div><dt className="opacity-60">Established</dt><dd>{society.createdYear ?? FALLBACK_TEXT}</dd></div>
        <div><dt className="opacity-60">Contact</dt><dd>{society.email ?? FALLBACK_TEXT}</dd></div>
        <div><dt className="opacity-60">Website</dt><dd>{society.website ?? FALLBACK_TEXT}</dd></div>
        <div><dt className="opacity-60">Status</dt><dd><VerifiedBadge verified={society.verified} /></dd></div>
      </dl>
    </div>
  );
}
