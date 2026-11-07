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

export const Route = createFileRoute("/_shell/profile")({
  head: () => ({ meta: [{ title: "Profile — GRANTLY" }, { name: "description", content: "Profile on GRANTLY." }, { property: "og:title", content: "Profile — GRANTLY" }, { property: "og:description", content: "Profile on GRANTLY." }] }),
  component: Page,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _u = [useState, SearchX, toast, Link, Button, Card, EmptyState, inputCls, ScholarshipCard, deadlineInfo, formatDate, formatINR, ALL_DOCUMENTS, docCategory, matchScholarship, actions, profileCompletion, APP_STATUSES];

function Page() {
  const { profile } = useAppState();
  return (<div><PageHeader title="Profile" action={<Button asChild><Link to="/onboarding">Edit profile</Link></Button>} />
    {!profile ? <EmptyState icon={SearchX} title="No profile yet" text="Create your profile to get matches." action={{ label: "Create profile", to: "/onboarding" }} /> :
    <Card className="grid gap-3 p-5 sm:grid-cols-2">{Object.entries(profile).map(([k, v]) => <div key={k}><p className="text-xs text-muted-foreground">{k}</p><p className="text-sm font-medium">{Array.isArray(v) ? v.join(", ") : v || "—"}</p></div>)}</Card>}</div>);
}
