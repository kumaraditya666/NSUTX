import { LiveSection } from "@/components/live-section";
import { ClashDetector } from "@/components/clash-detector";
import { getLiveEvents } from "@/lib/content-live";
import { SectionHeading } from "@/components/states";

export default async function LivePage(): Promise<React.JSX.Element> {
  const { events, live } = await getLiveEvents();
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <SectionHeading title="NSUT Live" description="Today · Tomorrow · This Week · Technical · Cultural · Literary · Sports · Business · Social" />
      <p className="mb-4 text-xs opacity-60" role="status">{live ? "● Live database" : "○ Demo fallback"}</p>
      <LiveSection />
      <h2 className="mt-8 font-semibold">Overlap monitor</h2>
      <div className="mt-2"><ClashDetector events={events} /></div>
    </div>
  );
}
