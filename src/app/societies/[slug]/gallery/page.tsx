import { notFound } from "next/navigation";
import { getSocietyLive } from "@/lib/societies-live";
import { MemoryWall } from "@/components/memory-achievements";

export default async function SocietyGallery({ params }: { params: Promise<{ slug: string }> }): Promise<React.JSX.Element> {
  const { slug } = await params;
  if (!await getSocietyLive(slug)) notFound();
  return (<div><h1 className="text-2xl font-bold">Gallery</h1><div className="mt-4"><MemoryWall societySlug={slug} /></div></div>);
}

