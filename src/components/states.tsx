import { FALLBACK_TEXT } from "@/lib/constants";

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description?: string;
}): React.JSX.Element {
  return (
    <div className="rounded-2xl border border-dashed border-black/15 p-8 text-center dark:border-white/15">
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-sm opacity-70">{description ?? FALLBACK_TEXT}</p>
    </div>
  );
}

export function SectionHeading({
  title,
  description,
}: {
  title: string;
  description?: string;
}): React.JSX.Element {
  return (
    <div className="mb-4">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      {description ? <p className="mt-1 opacity-70">{description}</p> : null}
    </div>
  );
}
