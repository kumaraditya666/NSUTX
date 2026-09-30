import { notFound } from "next/navigation";
import { getSocietyBySlug } from "@/lib/seed-societies";
import { AchievementTimeline } from "@/components/memory-achievements";

export default async function SocietyAchievements({ params }: { params: Promise<{ slug: string }> }): Promise<React.JSX.Element> {
  const { slug } = await params;
  if (!getSocietyBySlug(slug)) notFound();
  return (<div><h1 className="text-2xl font-bold">Achievements</h1><div className="mt-4"><AchievementTimeline societySlug={slug} /></div></div>);
}
