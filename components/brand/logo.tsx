import { cn } from "@/lib/utils";
import { store } from "@/config/store.config";

/**
 * Brand logo: rounded-square monogram + wordmark.
 * Colors come from theme tokens, so it inverts automatically in dark mode.
 */
export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 512 512"
        fill="none"
        aria-hidden
        className="size-[30px] shrink-0"
      >
        <rect width="512" height="512" rx="116" fill="var(--c-ink)" />
        <path
          d="M138 380 256 132 374 380"
          stroke="var(--c-bg)"
          strokeWidth="48"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M184.6 282H327.4L350.2 330H161.8Z" fill="var(--c-accent)" />
      </svg>
      {showWordmark && (
        <span className="font-display text-[21px] font-bold tracking-[0.18em] leading-none">
          {store.name}
        </span>
      )}
    </span>
  );
}
