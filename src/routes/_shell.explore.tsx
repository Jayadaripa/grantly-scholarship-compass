import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SearchX } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/grantly/AppShell";
import { Button, Card, EmptyState, inputCls } from "@/components/grantly/ui";
import { ScholarshipCard } from "@/components/grantly/ScholarshipCard";
import { scholarships, deadlineInfo, formatDate, formatINR, ALL_DOCUMENTS, docCategory } from "@/lib/scholarships";
import { matchScholarship } from "@/lib/match";
import { actions, useAppState, profileCompletion, APP_STATUSES, type AppStatus } from "@/lib/store";

export const Route = createFileRoute("/_shell/explore")({
  head: () => ({ meta: [{ title: "Explore Scholarships — GRANTLY" }, { name: "description", content: "Explore Scholarships on GRANTLY." }, { property: "og:title", content: "Explore Scholarships — GRANTLY" }, { property: "og:description", content: "Explore Scholarships on GRANTLY." }] }),
  validateSearch: (s: Record<string, unknown>): { q?: string } => (typeof s["q"] === "string" ? { q: s["q"] } : {}),
  component: Page,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _u = [useState, SearchX, toast, Link, Button, Card, EmptyState, inputCls, ScholarshipCard, deadlineInfo, formatDate, formatINR, ALL_DOCUMENTS, docCategory, matchScholarship, actions, profileCompletion, APP_STATUSES];

function Page() {
  const { profile } = useAppState();
  const { q } = Route.useSearch();
  const [text, setText] = useState(q ?? "");
  const [sort, setSort] = useState("match");
  const t = text.toLowerCase();
  const list = scholarships.map((s) => ({ s, m: matchScholarship(s, profile) }))
    .filter(({ s }) => !t || [s.name, s.provider, s.sector, ...s.courses, ...s.types, ...s.levels].join(" ").toLowerCase().includes(t))
    .sort((a, b) => sort === "deadline" ? a.s.deadline.localeCompare(b.s.deadline) : sort === "amount" ? b.s.amount - a.s.amount : b.m.percent - a.m.percent);
  return (<div>
    <PageHeader title="Discover Scholarships That Fit You." text={`${list.length} scholarships · demo data`} />
    <div className="mb-6 flex flex-col gap-3 sm:flex-row">
      <input className={inputCls} value={text} onChange={(e) => setText(e.target.value)} placeholder="Search by name, provider, course or category" aria-label="Search" />
      <select className={inputCls + " sm:w-48"} value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort"><option value="match">Best Match</option><option value="deadline">Deadline</option><option value="amount">Highest Amount</option></select>
    </div>
    {list.length === 0 ? <EmptyState icon={SearchX} title="No scholarships found" text="Try a different search term." /> :
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{list.map(({ s, m }) => <ScholarshipCard key={s.id} s={s} m={m} showWhy />)}</div>}
  </div>);
}
