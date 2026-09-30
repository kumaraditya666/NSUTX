import Link from "next/link";

export function SiteFooter(): React.JSX.Element {
  return (
    <footer className="border-t border-black/10 py-10 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-bold">NSUT Hub</p>
          <p className="text-sm opacity-70">Everything happening at NSUT. One place.</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-4 text-sm">
          <Link href="/explore" className="opacity-70 hover:opacity-100">Societies</Link>
          <Link href="/events" className="opacity-70 hover:opacity-100">Events</Link>
          <Link href="/opportunities" className="opacity-70 hover:opacity-100">Opportunities</Link>
          <Link href="/daily" className="opacity-70 hover:opacity-100">NSUT Daily</Link>
          <Link href="/ai" className="opacity-70 hover:opacity-100">NSUT AI</Link>
        </nav>
      </div>
    </footer>
  );
}
