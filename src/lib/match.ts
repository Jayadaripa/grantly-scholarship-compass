import type { Scholarship } from "./scholarships";
import type { Profile } from "./store";

export type CritStatus = "met" | "verify" | "fail";
export interface Criterion {
  label: string;
  status: CritStatus;
  detail: string;
}
export interface MatchResult {
  percent: number;
  label: "Strong Match" | "Potential Match" | "Not Eligible" | "Complete profile";
  criteria: Criterion[];
}

export const INCOME_RANGES = [
  { value: "lt1", label: "Below ₹1 lakh", min: 0, max: 1 },
  { value: "1to2.5", label: "₹1 – 2.5 lakh", min: 1, max: 2.5 },
  { value: "2.5to5", label: "₹2.5 – 5 lakh", min: 2.5, max: 5 },
  { value: "5to8", label: "₹5 – 8 lakh", min: 5, max: 8 },
  { value: "8to15", label: "₹8 – 15 lakh", min: 8, max: 15 },
  { value: "gt15", label: "Above ₹15 lakh", min: 15, max: 999 },
];

const TYPE_PREF: Record<string, string> = {
  Merit: "Merit-based", Need: "Need-based", STEM: "STEM Scholarships", Women: "Women in Education", Abroad: "Study Abroad",
};

/** Rule-based match. The percentage reflects profile fit, NOT a probability of winning. */
export function matchScholarship(s: Scholarship, p: Profile | null): MatchResult {
  if (!p) {
    return {
      percent: 0,
      label: "Complete profile",
      criteria: [{ label: "Profile", status: "verify", detail: "Create your profile to see how well this fits you." }],
    };
  }
  const c: Criterion[] = [];

  c.push(
    s.levels.includes(p.educationLevel as never)
      ? { label: "Education level", status: "met", detail: `Your level (${p.educationLevel}) meets the requirement.` }
      : p.educationLevel
        ? { label: "Education level", status: "fail", detail: `Open to ${s.levels.join(", ")} only.` }
        : { label: "Education level", status: "verify", detail: "Add your education level." },
  );

  if (s.courses.includes("Any")) c.push({ label: "Course / stream", status: "met", detail: "Open to all streams." });
  else if (!p.course) c.push({ label: "Course / stream", status: "verify", detail: "Add your course or stream." });
  else
    c.push(
      s.courses.includes(p.course)
        ? { label: "Course / stream", status: "met", detail: `Your course (${p.course}) is eligible.` }
        : { label: "Course / stream", status: "fail", detail: `Limited to ${s.courses.join(", ")}.` },
    );

  if (s.minPercent != null) {
    const score = parseScore(p.score);
    if (score == null) c.push({ label: "Academic performance", status: "verify", detail: `Minimum ${s.minPercent}% required — add your score.` });
    else
      c.push(
        score >= s.minPercent
          ? { label: "Academic performance", status: "met", detail: `Your ${score.toFixed(0)}% meets the ${s.minPercent}% minimum.` }
          : { label: "Academic performance", status: "fail", detail: `Requires at least ${s.minPercent}% (you entered ${score.toFixed(0)}%).` },
      );
  }

  if (s.maxIncomeLakh != null) {
    const r = INCOME_RANGES.find((x) => x.value === p.incomeRange);
    if (!r) c.push({ label: "Family income", status: "verify", detail: `Income up to ₹${s.maxIncomeLakh} lakh — add your income range.` });
    else if (r.min >= s.maxIncomeLakh) c.push({ label: "Family income", status: "fail", detail: `Family income must be below ₹${s.maxIncomeLakh} lakh.` });
    else if (r.max > s.maxIncomeLakh) c.push({ label: "Family income", status: "verify", detail: `Your range overlaps the ₹${s.maxIncomeLakh} lakh limit — needs verification.` });
    else if (p.incomeCertificate !== "yes")
      c.push({ label: "Family income", status: "verify", detail: "Income looks eligible, but an income certificate is needed to verify." });
    else c.push({ label: "Family income", status: "met", detail: `Your income range is within the ₹${s.maxIncomeLakh} lakh limit.` });
  }

  if (s.domicile) {
    if (!p.state) c.push({ label: "Domicile", status: "verify", detail: `Requires ${s.domicile} domicile.` });
    else
      c.push(
        p.state === s.domicile
          ? { label: "Domicile", status: "met", detail: `You live in ${s.domicile}. Domicile certificate will be checked.` }
          : { label: "Domicile", status: "fail", detail: `Only for ${s.domicile} domicile holders.` },
      );
  }

  if (s.femaleOnly) {
    if (p.gender === "Female") c.push({ label: "Gender", status: "met", detail: "Open to women students." });
    else if (!p.gender || p.gender === "Prefer not to say")
      c.push({ label: "Gender", status: "verify", detail: "This scholarship is for women students." });
    else c.push({ label: "Gender", status: "fail", detail: "This scholarship is for women students only." });
  }

  const prefHit = s.types.some((t) => p.preferences.includes(TYPE_PREF[t] ?? "")) ||
    p.preferences.includes(s.sector === "Government" ? "Government Scholarships" : "Private Scholarships");

  const pts = c.reduce((a, x) => a + (x.status === "met" ? 1 : x.status === "verify" ? 0.5 : 0), 0);
  let percent = Math.round((pts / c.length) * 90 + (prefHit ? 10 : 0));
  const hasFail = c.some((x) => x.status === "fail");
  const hasVerify = c.some((x) => x.status === "verify");
  if (hasFail) percent = Math.min(percent, 40);
  return {
    percent,
    label: hasFail ? "Not Eligible" : hasVerify ? "Potential Match" : "Strong Match",
    criteria: c,
  };
}

export function parseScore(s: string | undefined): number | null {
  if (!s) return null;
  const n = parseFloat(s);
  if (isNaN(n)) return null;
  return n <= 10 ? n * 9.5 : Math.min(n, 100); // CGPA → % approx
}
