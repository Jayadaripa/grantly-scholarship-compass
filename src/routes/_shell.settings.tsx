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

export const Route = createFileRoute("/_shell/settings")({
  head: () => ({ meta: [{ title: "Settings — GRANTLY" }, { name: "description", content: "Settings on GRANTLY." }, { property: "og:title", content: "Settings — GRANTLY" }, { property: "og:description", content: "Settings on GRANTLY." }] }),
  component: Page,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _u = [useState, SearchX, toast, Link, Button, Card, EmptyState, inputCls, ScholarshipCard, deadlineInfo, formatDate, formatINR, ALL_DOCUMENTS, docCategory, matchScholarship, actions, profileCompletion, APP_STATUSES];

function Page() {
  return (<div><PageHeader title="Settings" text="All data is stored only in this browser." />
    <Card className="p-5"><p className="font-semibold">Reset demo data</p><p className="mt-1 text-sm text-muted-foreground">Removes your profile, saved scholarships, statuses and documents.</p><Button className="mt-4" variant="outline" onClick={() => { actions.reset(); toast.success("All data cleared"); }}>Reset everything</Button></Card></div>);
}
