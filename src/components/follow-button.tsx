"use client";

import { useNsutModeStore } from "@/stores/nsut-mode";
import { followSociety } from "@/lib/actions";

export function FollowButton({ slug, name }: { slug: string; name: string }): React.JSX.Element {
  const followedSlugs = useNsutModeStore((s) => s.followedSlugs);
  const toggleFollow = useNsutModeStore((s) => s.toggleFollow);
  const following = followedSlugs.includes(slug);
  return (
    <button
      type="button"
      onClick={() => {
        toggleFollow(slug);
        if (!following) {
          followSociety({ societySlug: slug }).catch(() => {
            // local follow always works; server sync needs login
          });
        }
      }}
      aria-pressed={following}
      aria-label={following ? `Unfollow ${name}` : `Follow ${name}`}
      className="rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background"
    >
      {following ? "♥ Following" : "♡ Follow"}
    </button>
  );
}
