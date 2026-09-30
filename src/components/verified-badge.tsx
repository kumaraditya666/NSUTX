export function VerifiedBadge({ verified }: { verified: boolean }): React.JSX.Element {
  if (!verified) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-current/20 px-2 py-0.5 text-xs opacity-70">
        Unverified seed
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-300">
      <span aria-hidden="true">✓</span> Verified by NSUT Hub
    </span>
  );
}
