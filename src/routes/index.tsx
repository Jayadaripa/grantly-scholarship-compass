import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, Target, ShieldCheck, ListChecks, UserRoundPen, Search, KanbanSquare, Sparkles,
  CalendarClock, FileCheck2, BadgeCheck, CheckCircle2, Clock,
} from "lucide-react";
import { MarketingLayout } from "@/components/grantly/MarketingLayout";
import { Button, Card, DemoTag, Pill } from "@/components/grantly/ui";
import { ScholarshipCard } from "@/components/grantly/ScholarshipCard";
import { scholarships, formatINR } from "@/lib/scholarships";
import { matchScholarship } from "@/lib/match";
import { useAppState } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GRANTLY — Find Your Future. Fund Your Dreams." },
      { name: "description", content: "Discover scholarships that match your profile, understand eligibility, and track every application in one place." },
      { property: "og:title", content: "GRANTLY — Find Your Future. Fund Your Dreams." },
      { property: "og:description", content: "Personalised scholarship discovery and application management for students." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const { profile } = useAppState();
  const start = profile ? "/dashboard" : "/onboarding";
  const featured = ["national-merit-ug", "pragati-women-tech", "stem-futures", "global-scholars-abroad"].map((id) => scholarships.find((s) => s.id === id)!);

  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pt-20">
          <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
            <Pill tone="mint"><Sparkles className="size-3" /> Find Your Future. Fund Your Dreams.</Pill>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[58px]">
              Your Future Deserves <span className="text-primary">Every Opportunity.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Discover scholarships that match your ambitions. Understand your eligibility, organize your applications, and take the next step toward your education.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link to={start}>Find My Scholarships <ArrowRight /></Link></Button>
              <Button asChild size="lg" variant="outline"><Link to="/explore">Explore Opportunities</Link></Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="size-4 text-primary" /> Free for students</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="size-4 text-primary" /> No sign-up wall</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="size-4 text-primary" /> Data stays on your device</span>
            </div>
          </div>
          <HeroPreview />
        </div>
      </section>

      {/* Value */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-px px-4 sm:px-6 md:grid-cols-3">
          {[
            { icon: Target, t: "Personalized Discovery", d: "Find scholarships based on your academic profile." },
            { icon: ShieldCheck, t: "Clear Eligibility", d: "Understand requirements before applying." },
            { icon: ListChecks, t: "Application Management", d: "Keep track of documents, deadlines, and progress." },
          ].map((v) => (
            <div key={v.t} className="flex gap-4 py-8 md:px-6 first:md:pl-0">
              <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent text-primary"><v.icon className="size-5" /></div>
              <div>
                <h3 className="font-semibold">{v.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{v.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHead eyebrow="How it works" title="From confusion to clarity in three steps." />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            { icon: UserRoundPen, t: "Build Your Profile", d: "Tell GRANTLY about your education, academic background, and interests." },
            { icon: Search, t: "Discover Your Matches", d: "Explore scholarships that fit your profile — with reasons for every match." },
            { icon: KanbanSquare, t: "Manage Your Applications", d: "Save opportunities, prepare documents, and track progress." },
          ].map((s, i) => (
            <Card key={s.t} className="relative p-6">
              <span className="absolute right-6 top-5 text-5xl font-extrabold text-secondary">0{i + 1}</span>
              <div className="grid size-12 place-items-center rounded-xl bg-primary text-primary-foreground"><s.icon className="size-5" /></div>
              <h3 className="mt-5 text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="bg-secondary/60 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHead eyebrow="Featured scholarships" title="Opportunities students are exploring." left />
            <div className="flex items-center gap-3"><DemoTag /><Button asChild variant="outline"><Link to="/explore">View all <ArrowRight /></Link></Button></div>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((s) => <ScholarshipCard key={s.id} s={s} m={matchScholarship(s, profile)} />)}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHead eyebrow="Everything in one place" title="Built for the whole scholarship journey." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Target, t: "Personalized matching", d: "A transparent rule-based engine compares your profile with each scholarship's requirements." },
            { icon: BadgeCheck, t: "Eligibility analysis", d: "See which requirements are met, which need verification, and which rule you out." },
            { icon: KanbanSquare, t: "Application tracking", d: "Move each opportunity from Interested to Awarded and never lose track." },
            { icon: FileCheck2, t: "Document checklist", d: "One checklist across scholarships — mark documents ready once, reuse everywhere." },
            { icon: CalendarClock, t: "Deadline management", d: "Calm urgency cues so you always know what's due next." },
            { icon: Sparkles, t: "GRANTLY AI Navigator", d: "A guided assistant that answers questions using the scholarship catalogue." },
          ].map((f) => (
            <div key={f.t} className="group rounded-[18px] border border-border bg-card p-6 transition hover:border-primary/30 hover:shadow-lift">
              <f.icon className="size-6 text-primary transition group-hover:scale-110" />
              <h3 className="mt-4 font-semibold">{f.t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="relative overflow-hidden rounded-[24px] bg-brand-gradient px-6 py-14 text-center text-primary-foreground sm:px-12">
          <div className="absolute inset-0 dot-grid opacity-20" />
          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Your Next Opportunity Starts Here.</h2>
            <p className="mx-auto mt-3 max-w-lg text-primary-foreground/80">Create your profile and discover scholarships that could help fund your education.</p>
            <Button asChild size="lg" variant="inverse" className="mt-8"><Link to={start}>Get Started — It's Free <ArrowRight /></Link></Button>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}

function SectionHead({ eyebrow, title, left }: { eyebrow: string; title: string; left?: boolean }) {
  return (
    <div className={left ? "" : "mx-auto max-w-2xl text-center"}>
      <p className="text-sm font-semibold text-primary">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
    </div>
  );
}

function HeroPreview() {
  return (
    <div className="relative animate-in fade-in zoom-in-95 duration-700" aria-hidden>
      <div className="absolute -inset-8 hero-glow" />
      <div className="relative rounded-[22px] border border-border bg-card p-4 shadow-lift sm:p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Welcome back, Ananya</p>
            <p className="font-semibold">Your top matches</p>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-accent px-3 py-2">
            <div className="relative size-9">
              <svg viewBox="0 0 36 36" className="size-9 -rotate-90"><circle cx="18" cy="18" r="15" className="fill-none stroke-card" strokeWidth="4" /><circle cx="18" cy="18" r="15" className="fill-none stroke-primary" strokeWidth="4" strokeDasharray="94" strokeDashoffset="28" strokeLinecap="round" /></svg>
            </div>
            <div className="leading-tight"><p className="text-sm font-bold text-accent-foreground">3 / 5</p><p className="text-[10px] text-accent-foreground/70">applications ready</p></div>
          </div>
        </div>
        <div className="mt-4 space-y-2.5">
          {[
            { n: "National Merit Excellence", a: 50000, p: 94, strong: true },
            { n: "STEM Futures Fellowship", a: 75000, p: 88, strong: true },
            { n: "Pragati Women in Tech", a: 50000, p: 72, strong: false },
          ].map((r) => (
            <div key={r.n} className={`flex items-center gap-3 rounded-xl border p-3 ${r.strong ? "border-primary/20 bg-accent/40" : "border-border"}`}>
              <div className="grid size-9 place-items-center rounded-lg bg-card text-primary shadow-soft"><BadgeCheck className="size-4" /></div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{r.n}</p>
                <p className="text-xs text-muted-foreground">{formatINR(r.a)} / year</p>
              </div>
              <Pill tone={r.strong ? "mint" : "info"}>{r.p}%</Pill>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <div className="rounded-xl bg-secondary p-3">
            <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground"><Clock className="size-3.5" /> Upcoming deadline</p>
            <p className="mt-1 text-sm font-semibold">STEM Futures</p>
            <p className="text-xs text-warning">Due in 13 days</p>
          </div>
          <div className="rounded-xl bg-secondary p-3">
            <p className="text-xs font-medium text-muted-foreground">Documents ready</p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-card"><div className="h-full w-[70%] rounded-full bg-primary-bright" /></div>
            <p className="mt-1.5 text-xs text-muted-foreground">7 of 10</p>
          </div>
        </div>
      </div>
    </div>
  );
}
