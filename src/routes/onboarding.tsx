import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Info, PartyPopper } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/grantly/Logo";
import { Button, Card, inputCls } from "@/components/grantly/ui";
import { cn } from "@/lib/utils";
import { actions, useAppState, type Profile } from "@/lib/store";
import { COURSES, EDU_LEVELS, STATES, scholarships } from "@/lib/scholarships";
import { INCOME_RANGES, matchScholarship } from "@/lib/match";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Build your profile — GRANTLY" },
      { name: "description", content: "Tell GRANTLY about yourself to discover scholarships that match you." },
      { property: "og:title", content: "Build your profile — GRANTLY" },
      { property: "og:description", content: "A two-minute profile to unlock personalised scholarship matches." },
    ],
  }),
  component: Onboarding,
});

const PREFS = ["Merit-based", "Need-based", "Government Scholarships", "Private Scholarships", "STEM Scholarships", "Women in Education", "Study Abroad"];
const STEPS = ["Basic Information", "Academic Information", "Preferences", "Financial Information"];

const blank: Profile = {
  fullName: "", email: "", dob: "", state: "", city: "", educationLevel: "", institution: "", course: "",
  academicYear: "", score: "", graduationYear: "", preferences: [], incomeRange: "", incomeCertificate: "", gender: "", additional: "",
};

function Onboarding() {
  const { profile } = useAppState();
  const [step, setStep] = useState(0);
  const [f, setF] = useState<Profile>(blank);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  useEffect(() => { if (profile) setF(profile); }, [profile]);

  const upd = (k: keyof Profile, v: string | string[]) => { setF((p) => ({ ...p, [k]: v })); setErrors((e) => ({ ...e, [k]: "" })); };

  const validate = () => {
    const e: Record<string, string> = {};
    if (step === 0) {
      if (f.fullName.trim().length < 2) e.fullName = "Please enter your full name.";
      if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Enter a valid email address.";
      if (!f.state) e.state = "Select your state.";
    }
    if (step === 1) {
      if (!f.educationLevel) e.educationLevel = "Select your education level.";
      if (!f.course) e.course = "Select your course or stream.";
      if (f.score) {
        const n = parseFloat(f.score);
        if (isNaN(n) || n < 0 || n > 100) e.score = "Enter a percentage (0–100) or CGPA (0–10).";
      }
    }
    if (step === 2 && f.preferences.length === 0) e.preferences = "Choose at least one preference.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validate()) return;
    if (step < 3) setStep(step + 1);
    else { actions.setProfile(f); setStep(4); toast.success("Profile saved on this device"); }
  };

  const matches = step === 4 ? scholarships.filter((s) => matchScholarship(s, f).label !== "Not Eligible").length : 0;

  return (
    <div className="min-h-screen bg-secondary/50">
      <header className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4">
        <Logo />
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">Save & exit later</Link>
      </header>
      <div className="mx-auto max-w-3xl px-4 pb-16">
        {step < 4 && (
          <ol className="mb-6 grid grid-cols-4 gap-2" aria-label="Progress">
            {STEPS.map((s, i) => (
              <li key={s}>
                <div className={cn("h-1.5 rounded-full transition-colors", i <= step ? "bg-primary" : "bg-border")} />
                <p className={cn("mt-2 hidden text-xs font-medium sm:block", i === step ? "text-primary" : "text-muted-foreground")}>{i + 1}. {s}</p>
              </li>
            ))}
          </ol>
        )}
        <Card className="p-6 sm:p-8">
          {step === 0 && (
            <Step title="Let's start with the basics" text="This helps us find state-specific scholarships and contact-ready details.">
              <Field label="Full Name" error={errors.fullName}><input className={inputCls} value={f.fullName} onChange={(e) => upd("fullName", e.target.value)} placeholder="e.g. Ananya Sharma" /></Field>
              <Field label="Email" error={errors.email}><input type="email" className={inputCls} value={f.email} onChange={(e) => upd("email", e.target.value)} placeholder="you@example.com" /></Field>
              <Field label="Date of Birth" hint="Some scholarships have age limits."><input type="date" className={inputCls} value={f.dob} onChange={(e) => upd("dob", e.target.value)} /></Field>
              <Field label="State" error={errors.state} hint="Used for domicile-based state scholarships.">
                <Select value={f.state} onChange={(v) => upd("state", v)} options={STATES} placeholder="Select state" />
              </Field>
              <Field label="City"><input className={inputCls} value={f.city} onChange={(e) => upd("city", e.target.value)} placeholder="e.g. Pune" /></Field>
            </Step>
          )}
          {step === 1 && (
            <Step title="Your academic background" text="Education level and course are the most important matching criteria.">
              <Field label="Current Education Level" error={errors.educationLevel}><Select value={f.educationLevel} onChange={(v) => upd("educationLevel", v)} options={EDU_LEVELS} placeholder="Select level" /></Field>
              <Field label="Institution Name"><input className={inputCls} value={f.institution} onChange={(e) => upd("institution", e.target.value)} placeholder="e.g. Fergusson College" /></Field>
              <Field label="Course / Stream" error={errors.course}><Select value={f.course} onChange={(v) => upd("course", v)} options={COURSES} placeholder="Select stream" /></Field>
              <Field label="Academic Year"><Select value={f.academicYear} onChange={(v) => upd("academicYear", v)} options={["1st year", "2nd year", "3rd year", "4th year", "5th year", "Final year"]} placeholder="Select year" /></Field>
              <Field label="Percentage or CGPA" error={errors.score} hint="Compared against minimum academic requirements."><input inputMode="decimal" className={inputCls} value={f.score} onChange={(e) => upd("score", e.target.value)} placeholder="e.g. 86 or 8.7" /></Field>
              <Field label="Graduation Year"><input inputMode="numeric" className={inputCls} value={f.graduationYear} onChange={(e) => upd("graduationYear", e.target.value)} placeholder="e.g. 2028" /></Field>
            </Step>
          )}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold">What kind of scholarships interest you?</h2>
              <p className="mt-1 text-sm text-muted-foreground">Select all that apply. Preferences boost ranking — they never hide eligible scholarships.</p>
              <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {PREFS.map((p) => {
                  const on = f.preferences.includes(p);
                  return (
                    <button key={p} type="button" aria-pressed={on}
                      onClick={() => upd("preferences", on ? f.preferences.filter((x) => x !== p) : [...f.preferences, p])}
                      className={cn("flex items-center justify-between rounded-[12px] border px-4 py-3.5 text-left text-sm font-medium transition", on ? "border-primary bg-accent text-accent-foreground" : "border-border hover:border-primary/40")}>
                      {p}
                      <span className={cn("grid size-5 place-items-center rounded-md border", on ? "border-primary bg-primary text-primary-foreground" : "border-border")}>{on && <Check className="size-3.5" />}</span>
                    </button>
                  );
                })}
              </div>
              {errors.preferences && <p className="mt-3 text-sm text-destructive">{errors.preferences}</p>}
            </div>
          )}
          {step === 3 && (
            <Step title="Financial information" text="Only what's needed for need-based scholarships. Stored on your device only.">
              <Field label="Annual Family Income Range" hint="Many need-based scholarships have an income ceiling.">
                <Select value={f.incomeRange} onChange={(v) => upd("incomeRange", v)} options={INCOME_RANGES.map((r) => r.value)} labels={Object.fromEntries(INCOME_RANGES.map((r) => [r.value, r.label]))} placeholder="Select range (optional)" />
              </Field>
              <Field label="Income Certificate Available?" hint="Without it, income eligibility stays 'needs verification'.">
                <Select value={f.incomeCertificate} onChange={(v) => upd("incomeCertificate", v)} options={["yes", "applied", "no"]} labels={{ yes: "Yes, I have it", applied: "Applied, awaiting", no: "Not yet" }} placeholder="Select" />
              </Field>
              <Field label="Gender (optional)" hint="Used only for Women in Education scholarships.">
                <Select value={f.gender} onChange={(v) => upd("gender", v)} options={["Female", "Male", "Non-binary", "Prefer not to say"]} placeholder="Select" />
              </Field>
              <Field label="Additional Eligibility Information" full hint="e.g. disability, first-generation learner, single-parent household.">
                <textarea className={cn(inputCls, "h-24 py-3")} value={f.additional} onChange={(e) => upd("additional", e.target.value)} placeholder="Optional" />
              </Field>
              <div className="flex gap-2 rounded-xl bg-info/8 p-3 text-xs text-muted-foreground sm:col-span-2">
                <Info className="mt-0.5 size-4 shrink-0 text-info" /> GRANTLY never asks for Aadhaar numbers, bank details or passwords. This prototype has no server — data stays in your browser.
              </div>
            </Step>
          )}
          {step === 4 && (
            <div className="text-center animate-in fade-in zoom-in-95">
              <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-accent text-primary"><PartyPopper className="size-7" /></div>
              <h2 className="mt-5 text-2xl font-bold">Your scholarship journey starts now.</h2>
              <p className="mt-2 text-muted-foreground">We found <b className="text-primary">{matches}</b> potential opportunities for you.</p>
              <dl className="mx-auto mt-8 grid max-w-lg gap-3 text-left sm:grid-cols-2">
                {[["Name", f.fullName], ["Location", [f.city, f.state].filter(Boolean).join(", ")], ["Education", f.educationLevel], ["Course", f.course], ["Score", f.score || "—"], ["Preferences", f.preferences.join(", ")]].map(([k, v]) => (
                  <div key={k} className="rounded-xl bg-secondary p-3"><dt className="text-xs text-muted-foreground">{k}</dt><dd className="mt-0.5 text-sm font-medium">{v || "—"}</dd></div>
                ))}
              </dl>
              <Button size="lg" className="mt-8" onClick={() => navigate({ to: "/dashboard" })}>Discover My Scholarships <ArrowRight /></Button>
            </div>
          )}
          {step < 4 && (
            <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
              <Button variant="ghost" onClick={() => setStep(step - 1)} disabled={step === 0}><ArrowLeft /> Back</Button>
              <Button onClick={next}>{step === 3 ? "Finish" : "Continue"} <ArrowRight /></Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function Step({ title, text, children }: { title: string; text: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{text}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">{children}</div>
    </div>
  );
}

function Field({ label, error, hint, full, children }: { label: string; error?: string; hint?: string; full?: boolean; children: React.ReactNode }) {
  return (
    <label className={cn("block", full && "sm:col-span-2")}>
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-xs text-destructive">{error}</span> : hint && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}

function Select({ value, onChange, options, labels, placeholder }: { value: string; onChange: (v: string) => void; options: readonly string[]; labels?: Record<string, string>; placeholder: string }) {
  return (
    <select className={cn(inputCls, !value && "text-subtle")} value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">{placeholder}</option>
      {options.map((o) => <option key={o} value={o}>{labels?.[o] ?? o}</option>)}
    </select>
  );
}
