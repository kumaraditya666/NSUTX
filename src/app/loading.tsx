import { Skeleton } from "@/components/ui/skeleton";

export default function Loading(): React.JSX.Element {
  return (
    <div className="mx-auto max-w-6xl space-y-4 px-4 py-10" aria-busy="true" aria-label="Loading">
      <Skeleton className="h-10 w-1/3" />
      <Skeleton className="h-5 w-2/3" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-40" />
        ))}
      </div>
    </div>
  );
}
