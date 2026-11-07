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

export const Route = createFileRoute("/_shell/applications")({
  head: () => ({ meta: [{ title: "My Applications — GRANTLY" }, { name: "description", content: "My Applications on GRANTLY." }, { property: "og:title", content: "My Applications — GRANTLY" }, { property: "og:description", content: "My Applications on GRANTLY." }] }),
  component: Page,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _u = [useState, SearchX, toast, Link, Button, Card, EmptyState, inputCls, ScholarshipCard, deadlineInfo, formatDate, formatINR, ALL_DOCUMENTS, docCategory, matchScholarship, actions, profileCompletion, APP_STATUSES];

function Page() {
  const { applications } = useAppState();
  const ids = Object.keys(applications);
  return (<div><PageHeader title="Keep Every Opportunity on Track." />
    {ids.length === 0 ? <EmptyState icon={SearchX} title="No applications yet" text="Save a scholarship to start tracking it here." action={{ label: "Explore Scholarships", to: "/explore" }} /> :
    <div className="space-y-3">{ids.map((id) => { const s = scholarships.find((x) => x.id === id); if (!s) return null; return (
      <Card key={id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <div className="flex-1"><Link to="/scholarship/$id" params={{ id }} className="font-semibold hover:text-primary">{s.name}</Link><p className="text-xs text-muted-foreground">{formatINR(s.amount)} · Deadline {formatDate(s.deadline)} · Updated {new Date(applications[id]!.updatedAt).toLocaleDateString("en-IN")}</p></div>
        <select className={inputCls + " sm:w-48"} value={applications[id]!.status} onChange={(e) => { actions.setStatus(id, e.target.value as AppStatus); toast.success("Status updated"); }} aria-label="Status">{APP_STATUSES.map((x) => <option key={x}>{x}</option>)}</select>
      </Card>); })}</div>}</div>);
}
