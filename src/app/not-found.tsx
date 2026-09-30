import Link from "next/link";

export default function NotFound(): React.JSX.Element {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      <h2 className="text-2xl font-bold">Page unavailable.</h2>
      <p className="mt-2 opacity-70">The page you requested does not exist.</p>
      <Link href="/" className="mt-6 inline-block underline underline-offset-4">
        Back to NSUTX
      </Link>
    </div>
  );
}
