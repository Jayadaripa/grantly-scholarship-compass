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

export const Route = createFileRoute("/_shell/saved")({
  head: () => ({ meta: [{ title: "Saved Scholarships — GRANTLY" }, { name: "description", content: "Saved Scholarships on GRANTLY." }, { property: "og:title", content: "Saved Scholarships — GRANTLY" }, { property: "og:description", content: "Saved Scholarships on GRANTLY." }] }),
  component: Page,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _u = [useState, SearchX, toast, Link, Button, Card, EmptyState, inputCls, ScholarshipCard, deadlineInfo, formatDate, formatINR, ALL_DOCUMENTS, docCategory, matchScholarship, actions, profileCompletion, APP_STATUSES];

function Page() {
  const { profile, saved } = useAppState();
  const list = scholarships.filter((s) => saved.includes(s.id));
  return (<div><PageHeader title="Saved Scholarships" />
    {list.length === 0 ? <EmptyState icon={SearchX} title="Nothing saved yet" text="Tap the bookmark on any scholarship to save it." action={{ label: "Explore Scholarships", to: "/explore" }} /> :
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{list.map((s) => <ScholarshipCard key={s.id} s={s} m={matchScholarship(s, profile)} />)}</div>}</div>);
}
