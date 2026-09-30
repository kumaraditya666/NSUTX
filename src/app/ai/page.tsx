import { NsutAiChat } from "@/components/nsut-ai-chat";
import { SectionHeading } from "@/components/states";

export default function AiPage(): React.JSX.Element {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <SectionHeading title="NSUT AI" description="Grounded in platform database. Never hallucinates — says when info is missing." />
      <NsutAiChat />
    </div>
  );
}
