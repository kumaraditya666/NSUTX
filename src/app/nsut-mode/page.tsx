import { NsutModeClient } from "@/components/nsut-mode-client";
import { getLiveAnnouncements, getLiveEvents, getLiveOpportunities } from "@/lib/content-live";
import { getLiveSocieties } from "@/lib/societies-live";

export default async function NsutModePage(): Promise<React.JSX.Element> {
  const [{ societies }, { events }, { announcements }, { opportunities }] = await Promise.all([
    getLiveSocieties(),
    getLiveEvents(),
    getLiveAnnouncements(),
    getLiveOpportunities(),
  ]);
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <NsutModeClient societies={societies} events={events} announcements={announcements} opportunities={opportunities} />
    </div>
  );
}
