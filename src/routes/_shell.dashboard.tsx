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

export const Route = createFileRoute("/_shell/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — GRANTLY" }, { name: "description", content: "Dashboard on GRANTLY." }, { property: "og:title", content: "Dashboard — GRANTLY" }, { property: "og:description", content: "Dashboard on GRANTLY." }] }),
  component: Page,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _u = [useState, SearchX, toast, Link, Button, Card, EmptyState, inputCls, ScholarshipCard, deadlineInfo, formatDate, formatINR, ALL_DOCUMENTS, docCategory, matchScholarship, actions, profileCompletion, APP_STATUSES];

function Page() {
  const { profile, saved, applications } = useAppState();
  const list = scholarships.map((s) => ({ s, m: matchScholarship(s, profile) })).filter((x) => x.m.label !== "Not Eligible").sort((a, b) => b.m.percent - a.m.percent);
  const pct = profileCompletion(profile);
  return (<div>
    <PageHeader title={`Welcome back, ${profile?.fullName.split(" ")[0] ?? "Student"}!`} text="Let's find opportunities that match your ambitions." action={<Button asChild><Link to="/explore">Explore Scholarships</Link></Button>} />
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {[["Matching Scholarships", list.length], ["Saved Scholarships", saved.length], ["Applications in Progress", Object.values(applications).filter((a) => a.status === "Preparing" || a.status === "Applied").length], ["Upcoming Deadlines", scholarships.filter((s) => { const d = deadlineInfo(s.deadline).days; return d >= 0 && d <= 30; }).length]].map(([l, n]) => (
        <Card key={l} className="p-5"><p className="text-3xl font-bold text-primary-deep">{n}</p><p className="mt-1 text-sm text-muted-foreground">{l}</p></Card>))}
    </div>
    <Card className="mt-6 p-5"><p className="font-semibold">Your profile is {pct}% complete.</p><div className="mt-3 h-2 rounded-full bg-secondary"><div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} /></div><p className="mt-2 text-sm text-muted-foreground">Complete your profile to discover more relevant opportunities. <Link to="/onboarding" className="font-medium text-primary">Edit profile</Link></p></Card>
    <h2 className="mb-4 mt-8 text-lg font-bold">Recommended for you</h2>
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{list.slice(0, 6).map(({ s, m }) => <ScholarshipCard key={s.id} s={s} m={m} showWhy />)}</div>
  </div>);
}
