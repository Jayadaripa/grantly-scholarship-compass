import { Link } from "@tanstack/react-router";
import { Bookmark, BookmarkCheck, CalendarDays, GraduationCap, Building2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { deadlineInfo, formatDate, formatINR, type Scholarship } from "@/lib/scholarships";
import type { MatchResult } from "@/lib/match";
import { actions, useAppState } from "@/lib/store";
import { Button, Card, Pill, DemoTag } from "./ui";

export function MatchBadge({ m, className }: { m: MatchResult; className?: string | undefined }) {
  if (m.label === "Complete profile") return <Pill tone="muted" className={className}>Build profile to match</Pill>;
  const tone = m.label === "Strong Match" ? "mint" : m.label === "Potential Match" ? "info" : "muted";
  return (
    <Pill tone={tone} className={className}>
      {m.label !== "Not Eligible" && <span className="tabular-nums">{m.percent}%</span>}
      {m.label}
    </Pill>
  );
}

export function DeadlinePill({ date }: { date: string }) {
  const d = deadlineInfo(date);
  return <Pill tone={d.tone === "soon" ? "warning" : d.tone === "passed" ? "muted" : "success"}>{d.label}</Pill>;
}

export function SaveButton({ id, className }: { id: string; className?: string | undefined }) {
  const { saved } = useAppState();
  const isSaved = saved.includes(id);
  return (
    <button
      type="button"
      aria-label={isSaved ? "Remove from saved" : "Save scholarship"}
      aria-pressed={isSaved}
      onClick={(e) => {
        e.preventDefault();
        const now = actions.toggleSaved(id);
        toast.success(now ? "Saved — added to My Applications as Interested" : "Removed from saved");
      }}
      className={cn(
        "grid size-9 place-items-center rounded-[10px] border transition",
        isSaved ? "border-primary/30 bg-accent text-primary" : "border-border text-muted-foreground hover:border-primary/40 hover:text-primary",
        className,
      )}
    >
      {isSaved ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
    </button>
  );
}

export function ScholarshipCard({ s, m, showWhy = false }: { s: Scholarship; m: MatchResult; showWhy?: boolean }) {
  const highlight = m.label === "Strong Match";
  return (
    <Card className={cn("group flex flex-col p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-lift", highlight && "border-primary/25 bg-gradient-to-b from-accent/40 to-card")}>
      <div className="flex items-start justify-between gap-3">
        <MatchBadge m={m} />
        <SaveButton id={s.id} />
      </div>
      <h3 className="mt-3 text-[15.5px] font-bold leading-snug">
        <Link to="/scholarship/$id" params={{ id: s.id }} className="hover:text-primary">{s.name}</Link>
      </h3>
      <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground"><Building2 className="size-3.5" />{s.provider}</p>
      <div className="mt-4 flex items-baseline gap-1.5">
        <span className="text-xl font-bold text-primary-deep">{formatINR(s.amount)}</span>
        <span className="text-xs text-muted-foreground">{s.amountNote}</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        <Pill tone="neutral"><GraduationCap className="size-3" />{s.levels.length > 2 ? `${s.levels[0]} +${s.levels.length - 1}` : s.levels.join(", ")}</Pill>
        <Pill tone="neutral">{s.types[0] === "Need" ? "Need-based" : s.types[0] === "Merit" ? "Merit" : s.types[0]}</Pill>
        <Pill tone="neutral">{s.sector}</Pill>
      </div>
      {showWhy && m.label !== "Complete profile" && (
        <p className="mt-3 line-clamp-2 text-xs text-muted-foreground">
          {m.criteria.filter((c) => c.status === "met").length}/{m.criteria.length} requirements met
          {m.criteria.some((c) => c.status === "verify") && " · some need verification"}
        </p>
      )}
      <div className="mt-auto flex items-center justify-between gap-2 border-t border-border pt-4 mt-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <CalendarDays className="size-3.5" />
          <span>{formatDate(s.deadline)}</span>
          <DeadlinePill date={s.deadline} />
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <DemoTag />
        <Button asChild size="sm" variant="outline">
          <Link to="/scholarship/$id" params={{ id: s.id }}>View Details</Link>
        </Button>
      </div>
    </Card>
  );
}
