import { notFound } from "next/navigation";
import { getSocietyLive } from "@/lib/societies-live";
import { VerifiedBadge } from "@/components/verified-badge";

export default async function SocietyAbout({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<React.JSX.Element> {
  const { slug } = await params;
  const society = await getSocietyLive(slug);
  if (!society) notFound();
  return (
    <div>
      <p className="eyebrow">About</p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight">About {society.name}</h1>
      <p className="mt-2 max-w-2xl">{society.description}</p>
      <dl className="mt-6 grid gap-3 text-sm">
        <div><dt className="opacity-60">Established</dt><dd>{society.createdYear ?? "Not announced"}</dd></div>
        <div><dt className="opacity-60">Contact</dt><dd>{society.email ?? "Coming soon"}</dd></div>
        <div><dt className="opacity-60">Website</dt><dd>{society.website ?? "Coming soon"}</dd></div>
        <div><dt className="opacity-60">Status</dt><dd>{society.verified ? <VerifiedBadge verified /> : "Verification pending"}</dd></div>
      </dl>
    </div>
  );
}
