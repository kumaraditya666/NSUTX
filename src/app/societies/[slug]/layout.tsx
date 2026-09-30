import Link from "next/link";
import { notFound } from "next/navigation";
import { getSocietyBySlug } from "@/lib/seed-societies";

const TABS = [
  { href: "", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/updates", label: "Updates" },
  { href: "/team", label: "Team" },
  { href: "/gallery", label: "Gallery" },
  { href: "/achievements", label: "Achievements" },
  { href: "/opportunities", label: "Opportunities" },
  { href: "/about", label: "About" },
] as const;

export default async function SocietyLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}): Promise<React.JSX.Element> {
  const { slug } = await params;
  const society = getSocietyBySlug(slug);
  if (!society) notFound();
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav aria-label={`${society.name} sections`} className="mb-6 flex gap-2 overflow-x-auto">
        {TABS.map((t) => (
          <Link
            key={t.label}
            href={`/societies/${slug}${t.href}`}
            className="whitespace-nowrap rounded-full border border-black/10 px-3 py-1.5 text-sm dark:border-white/15"
          >
            {t.label}
          </Link>
        ))}
      </nav>
      {children}
    </div>
  );
}
