import Link from "next/link";
import type { SocietySeed } from "@/types/society";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { VerifiedBadge } from "@/components/verified-badge";
import { FALLBACK_TEXT } from "@/lib/constants";

export function SocietyCard({ society }: { society: SocietySeed }): React.JSX.Element {
  return (
    <Link href={`/societies/${society.slug}`} aria-label={`${society.name} mini website`}>
      <Card className="h-full transition-transform hover:-translate-y-0.5">
        <CardHeader>
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-xl font-bold text-white"
              style={{ backgroundColor: society.accentColor }}
            >
              {society.name.slice(0, 1)}
            </span>
            <div>
              <CardTitle>{society.name}</CardTitle>
              <CardDescription>{society.shortDescription || FALLBACK_TEXT}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-2">
          <span className="text-xs capitalize opacity-70">{society.category}</span>
          <VerifiedBadge verified={society.verified} />
        </CardContent>
      </Card>
    </Link>
  );
}
