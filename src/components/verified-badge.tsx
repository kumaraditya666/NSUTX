// Public badge: rendered only when verified. Unverified societies show
// nothing on public surfaces; verification state lives in /admin.
export function VerifiedBadge({ verified }: { verified: boolean }): React.JSX.Element | null {
  if (!verified) return null;
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-300">
      <span aria-hidden="true">✓</span> Verified by NSUTX
    </span>
  );
}
