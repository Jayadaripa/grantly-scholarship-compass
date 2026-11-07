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

export const Route = createFileRoute("/_shell/navigator")({
  head: () => ({ meta: [{ title: "AI Navigator — GRANTLY" }, { name: "description", content: "AI Navigator on GRANTLY." }, { property: "og:title", content: "AI Navigator — GRANTLY" }, { property: "og:description", content: "AI Navigator on GRANTLY." }] }),
  component: Page,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _u = [useState, SearchX, toast, Link, Button, Card, EmptyState, inputCls, ScholarshipCard, deadlineInfo, formatDate, formatINR, ALL_DOCUMENTS, docCategory, matchScholarship, actions, profileCompletion, APP_STATUSES];

function Page() {
  const [msgs, setMsgs] = useState<{ me: boolean; t: string }[]>([]);
  const [text, setText] = useState("");
  const ask = (q: string) => { if (!q.trim()) return; const l = q.toLowerCase();
    const a = l.includes("document") ? "Common documents: " + ALL_DOCUMENTS.slice(0, 6).join(", ") + "." : l.includes("deadline") ? "Soonest deadlines: " + [...scholarships].filter((s) => deadlineInfo(s.deadline).days >= 0).sort((x, y) => x.deadline.localeCompare(y.deadline)).slice(0, 3).map((s) => `${s.name} (${formatDate(s.deadline)})`).join("; ") + "." : l.includes("merit") ? "Merit-based scholarships reward academic performance, usually with a minimum percentage." : "Undergraduate options include: " + scholarships.filter((s) => s.levels.includes("Undergraduate")).slice(0, 4).map((s) => s.name).join(", ") + ". Eligibility is never guaranteed — always verify with the provider.";
    setMsgs((m) => [...m, { me: true, t: q }, { me: false, t: a }]); setText(""); };
  return (<div><PageHeader title="GRANTLY AI" text="Your personal scholarship guide · demo assistant with predefined answers, no AI model connected." action={<Button variant="outline" onClick={() => setMsgs([])}>Clear</Button>} />
    <div className="mb-4 flex flex-wrap gap-2">{["Find scholarships for undergraduate students.", "What documents do I need?", "Explain merit-based scholarships.", "Which scholarships have upcoming deadlines?"].map((p) => <Button key={p} size="sm" variant="soft" onClick={() => ask(p)}>{p}</Button>)}</div>
    <Card className="space-y-3 p-4">{msgs.length === 0 && <p className="text-sm text-muted-foreground">Ask a question to begin.</p>}{msgs.map((m, i) => <div key={i} className={m.me ? "ml-auto max-w-[80%] rounded-xl bg-primary p-3 text-sm text-primary-foreground" : "max-w-[80%] rounded-xl bg-secondary p-3 text-sm"}>{m.t}</div>)}
    <form className="flex gap-2 pt-2" onSubmit={(e) => { e.preventDefault(); ask(text); }}><input className={inputCls} value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask GRANTLY AI…" /><Button type="submit">Send</Button></form></Card></div>);
}
