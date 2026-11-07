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

export const Route = createFileRoute("/_shell/documents")({
  head: () => ({ meta: [{ title: "Documents — GRANTLY" }, { name: "description", content: "Documents on GRANTLY." }, { property: "og:title", content: "Documents — GRANTLY" }, { property: "og:description", content: "Documents on GRANTLY." }] }),
  component: Page,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _u = [useState, SearchX, toast, Link, Button, Card, EmptyState, inputCls, ScholarshipCard, deadlineInfo, formatDate, formatINR, ALL_DOCUMENTS, docCategory, matchScholarship, actions, profileCompletion, APP_STATUSES];

function Page() {
  const { docs } = useAppState();
  return (<div><PageHeader title="Documents" text="Simulated checklist — no files are uploaded or stored on a server." />
    <div className="grid gap-3 sm:grid-cols-2">{ALL_DOCUMENTS.map((d) => (
      <Card key={d} className="flex items-center justify-between gap-3 p-4"><div><p className="font-medium">{d}</p><p className="text-xs text-muted-foreground">{docCategory(d)} · needed for {scholarships.filter((s) => s.documents.includes(d)).length} scholarships</p></div>
      <Button size="sm" variant={docs[d] ? "soft" : "outline"} onClick={() => actions.toggleDoc(d)}>{docs[d] ? "Ready ✓" : "Mark Ready"}</Button></Card>))}</div></div>);
}
