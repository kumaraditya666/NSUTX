import { DailyDigest } from "@/components/daily-digest";
import { MemoryWall } from "@/components/memory-achievements";
import { SectionHeading } from "@/components/states";
import { getLiveAnnouncements, getLiveEvents, getLiveOpportunities } from "@/lib/content-live";

export default async function DailyPage(): Promise<React.JSX.Element> {
  const [{ events }, { announcements }, { opportunities }] = await Promise.all([
    getLiveEvents(),
    getLiveAnnouncements(),
    getLiveOpportunities(),
  ]);
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <SectionHeading title="NSUT Daily" description="Daily + weekly + personalized." />
      <DailyDigest events={events} announcements={announcements} opportunities={opportunities} />
      <h2 className="mt-8 font-semibold">From the Memory Wall</h2>
      <div className="mt-3"><MemoryWall /></div>
    </div>
  );
}
