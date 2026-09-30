import { DailyDigest } from "@/components/daily-digest";
import { MemoryWall } from "@/components/memory-achievements";
import { SectionHeading } from "@/components/states";

export default function DailyPage(): React.JSX.Element {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <SectionHeading title="NSUT Daily" description="Daily + weekly + personalized (demo data)." />
      <DailyDigest />
      <h2 className="mt-8 font-semibold">From the Memory Wall</h2>
      <div className="mt-3"><MemoryWall /></div>
    </div>
  );
}
