import { LiveSection } from "@/components/live-section";
import { ClashDetector } from "@/components/clash-detector";
import { getLiveAnnouncements, getLiveEvents, getLiveOpportunities } from "@/lib/content-live";
import { SectionHeading } from "@/components/states";

export default async function LivePage(): Promise<React.JSX.Element> {
  const [{ events }, { announcements }, { opportunities }] = await Promise.all([
    getLiveEvents(),
    getLiveAnnouncements(),
    getLiveOpportunities(),
  ]);
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <SectionHeading title="NSUT Live" description="Today · Tomorrow · This Week · Technical · Cultural · Literary · Sports · Business · Social" />
      <LiveSection events={events} announcements={announcements} opportunities={opportunities} />
      <h2 className="mt-8 font-semibold">Overlap monitor</h2>
      <div className="mt-2"><ClashDetector events={events} /></div>
    </div>
  );
}
