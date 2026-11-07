import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("size-9", className)} aria-hidden>
      <rect width="40" height="40" rx="11" className="fill-primary" />
      <path d="M8 16.5 20 11l12 5.5-12 5.5L8 16.5Z" className="fill-primary-foreground" />
      <path d="M13 19.5v5c0 1.8 3.1 3.5 7 3.5" fill="none" className="stroke-primary-foreground" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M22 28.5 26.5 24l2.5 2.5L33 22" fill="none" className="stroke-mint" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 22h3v3" fill="none" className="stroke-mint" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ tagline = false, className }: { tagline?: boolean; className?: string }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2.5", className)} aria-label="GRANTLY home">
      <LogoMark />
      <span className="leading-none">
        <span className="block text-[19px] font-extrabold tracking-[0.06em] text-primary-deep">GRANTLY</span>
        {tagline && <span className="mt-1 block text-[11px] font-medium text-muted-foreground">Your scholarship companion.</span>}
      </span>
    </Link>
  );
}
