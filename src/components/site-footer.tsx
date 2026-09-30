import Link from "next/link";

export function SiteFooter(): React.JSX.Element {
  return (
    <footer className="mt-8 border-t py-12" style={{ borderColor: "var(--hairline)" }}>
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-2xl font-bold tracking-tighter">NSUTX</p>
        <p className="mt-1 text-sm opacity-60">The digital layer of NSUT.</p>
        <nav aria-label="Footer" className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/explore" className="opacity-70 hover:opacity-100">Explore</Link>
          <Link href="/societies" className="opacity-70 hover:opacity-100">Societies</Link>
          <Link href="/events" className="opacity-70 hover:opacity-100">Events</Link>
          <Link href="/opportunities" className="opacity-70 hover:opacity-100">Opportunities</Link>
          <Link href="/memories" className="opacity-70 hover:opacity-100">Memories</Link>
          <Link href="/nsut-mode" className="opacity-70 hover:opacity-100">NSUT Mode</Link>
          <Link href="/ai" className="opacity-70 hover:opacity-100">NSUT AI</Link>
        </nav>
        <p className="mt-8 text-xs opacity-50">Built for NSUT.</p>
      </div>
    </footer>
  );
}
