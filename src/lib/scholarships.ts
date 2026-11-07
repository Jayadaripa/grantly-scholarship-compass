// DEMO DATA — every scholarship below is fictional sample content for demonstration only.
// None are verified real opportunities. No official URLs are invented (url: null).

export type EduLevel = "Class 10" | "Class 12" | "Diploma" | "Undergraduate" | "Postgraduate" | "PhD";
export type SchType = "Merit" | "Need" | "STEM" | "Women" | "Abroad";

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  description: string;
  amount: number;
  amountNote: string;
  levels: EduLevel[];
  courses: string[]; // "Any" = all streams
  minPercent: number | null;
  maxIncomeLakh: number | null;
  domicile: string | null;
  sector: "Government" | "Private";
  types: SchType[];
  femaleOnly?: boolean;
  documents: string[];
  opens: string | null;
  deadline: string;
  results: string | null;
  url: string | null;
  awards: number | null;
  duration: string | null;
  benefits: string[];
  conditions: string[];
}

export const EDU_LEVELS: EduLevel[] = ["Class 10", "Class 12", "Diploma", "Undergraduate", "Postgraduate", "PhD"];
export const COURSES = ["Engineering", "Science", "Medical", "Commerce", "Arts & Humanities", "Law", "Management", "Other"];
export const STATES = [
  "Andhra Pradesh", "Assam", "Bihar", "Delhi", "Gujarat", "Haryana", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana",
  "Uttar Pradesh", "West Bengal", "Other",
];

export const scholarships: Scholarship[] = [
  {
    id: "national-merit-ug",
    name: "National Merit Excellence Scholarship",
    provider: "Demo Ministry of Education Programme",
    description: "Supports high-achieving students pursuing undergraduate degrees at recognised Indian institutions, covering tuition and academic expenses.",
    amount: 50000, amountNote: "per year",
    levels: ["Undergraduate"], courses: ["Any"], minPercent: 80, maxIncomeLakh: 8, domicile: null,
    sector: "Government", types: ["Merit"],
    documents: ["Class 12 Marksheet", "Aadhaar / Identity Proof", "Income Certificate", "Institution ID / Bonafide Certificate", "Bank Account Details"],
    opens: "2026-09-01", deadline: "2026-11-30", results: "2027-02-15", url: null, awards: 10000, duration: "Up to 4 years",
    benefits: ["₹50,000 per year towards tuition", "Renewable annually on maintaining 75%", "Direct bank transfer"],
    conditions: ["Must be enrolled full-time in a recognised college", "Not availing any other central scholarship"],
  },
  {
    id: "pragati-women-tech",
    name: "Pragati Women in Technical Education",
    provider: "Demo Technical Education Council",
    description: "Encourages young women to pursue diploma and degree programmes in technical education.",
    amount: 50000, amountNote: "per year",
    levels: ["Diploma", "Undergraduate"], courses: ["Engineering"], minPercent: 60, maxIncomeLakh: 8, domicile: null,
    sector: "Government", types: ["Women", "STEM", "Need"], femaleOnly: true,
    documents: ["Class 12 Marksheet", "Aadhaar / Identity Proof", "Income Certificate", "Admission Letter", "Bank Account Details"],
    opens: "2026-10-01", deadline: "2026-12-15", results: "2027-03-01", url: null, awards: 5000, duration: "Course duration",
    benefits: ["₹50,000 per year", "Covers fees, books and equipment"],
    conditions: ["Admitted to first year of an approved technical institution", "Maximum two girls per family"],
  },
  {
    id: "stem-futures",
    name: "STEM Futures Fellowship",
    provider: "Demo Bright Minds Foundation",
    description: "A private foundation scholarship for students in science and engineering with strong academic records and research curiosity.",
    amount: 75000, amountNote: "one-time",
    levels: ["Undergraduate", "Postgraduate"], courses: ["Engineering", "Science"], minPercent: 75, maxIncomeLakh: null, domicile: null,
    sector: "Private", types: ["STEM", "Merit"],
    documents: ["Latest Semester Marksheet", "Aadhaar / Identity Proof", "Statement of Purpose", "Recommendation Letter"],
    opens: "2026-10-15", deadline: "2026-11-20", results: "2027-01-10", url: null, awards: 200, duration: "One-time award",
    benefits: ["₹75,000 one-time grant", "Mentorship with industry researchers"],
    conditions: ["Statement of purpose (500 words)", "Interview round for shortlisted candidates"],
  },
  {
    id: "post-matric-need",
    name: "Post-Matric Assistance Scholarship",
    provider: "Demo State Social Welfare Department",
    description: "Need-based financial support for students from low-income families continuing education after Class 10.",
    amount: 25000, amountNote: "per year",
    levels: ["Class 12", "Diploma", "Undergraduate", "Postgraduate"], courses: ["Any"], minPercent: 50, maxIncomeLakh: 2.5, domicile: "Maharashtra",
    sector: "Government", types: ["Need"],
    documents: ["Previous Year Marksheet", "Aadhaar / Identity Proof", "Income Certificate", "Domicile Certificate", "Bank Account Details"],
    opens: "2026-08-01", deadline: "2027-01-31", results: null, url: null, awards: null, duration: "Renewable annually",
    benefits: ["Maintenance allowance", "Reimbursement of compulsory fees"],
    conditions: ["Must hold domicile of the state", "Annual family income up to ₹2.5 lakh"],
  },
  {
    id: "kanya-shiksha",
    name: "Kanya Shiksha Protsahan Award",
    provider: "Demo Saraswati Trust",
    description: "Recognises meritorious girl students completing Class 12 and continuing to higher education.",
    amount: 30000, amountNote: "one-time",
    levels: ["Class 12", "Undergraduate"], courses: ["Any"], minPercent: 70, maxIncomeLakh: 6, domicile: null,
    sector: "Private", types: ["Women", "Merit"], femaleOnly: true,
    documents: ["Class 12 Marksheet", "Aadhaar / Identity Proof", "Income Certificate"],
    opens: "2026-09-15", deadline: "2026-12-05", results: "2027-01-20", url: null, awards: 500, duration: "One-time award",
    benefits: ["₹30,000 one-time award", "Certificate of recognition"],
    conditions: ["Must be the first year of higher education"],
  },
  {
    id: "global-scholars-abroad",
    name: "Global Scholars Study Abroad Grant",
    provider: "Demo Horizon Education Fund",
    description: "Partial funding for Indian students admitted to postgraduate programmes at accredited universities abroad.",
    amount: 500000, amountNote: "one-time",
    levels: ["Postgraduate", "PhD"], courses: ["Any"], minPercent: 65, maxIncomeLakh: 15, domicile: null,
    sector: "Private", types: ["Abroad", "Merit"],
    documents: ["Degree Certificate & Transcripts", "Passport", "Admission Letter", "Income Certificate", "Statement of Purpose"],
    opens: "2026-11-01", deadline: "2027-03-15", results: "2027-05-30", url: null, awards: 50, duration: "First year of study",
    benefits: ["Up to ₹5,00,000 towards tuition", "Pre-departure orientation"],
    conditions: ["Confirmed admission offer required", "Must return to India for 2 years after study (programme rule)"],
  },
  {
    id: "inspire-research",
    name: "Inspire Doctoral Research Fellowship",
    provider: "Demo Department of Science Programme",
    description: "Monthly fellowship supporting full-time doctoral research in basic and applied sciences.",
    amount: 37000, amountNote: "per month",
    levels: ["PhD"], courses: ["Science", "Engineering", "Medical"], minPercent: 60, maxIncomeLakh: null, domicile: null,
    sector: "Government", types: ["STEM", "Merit"],
    documents: ["Postgraduate Marksheet", "Aadhaar / Identity Proof", "Research Proposal", "Institution ID / Bonafide Certificate"],
    opens: "2026-10-01", deadline: "2026-12-31", results: "2027-03-31", url: null, awards: 1000, duration: "Up to 5 years",
    benefits: ["₹37,000 monthly stipend", "Annual contingency grant of ₹20,000"],
    conditions: ["Full-time PhD registration", "Age limit of 32 years (programme rule)"],
  },
  {
    id: "commerce-leaders",
    name: "Future Commerce Leaders Scholarship",
    provider: "Demo FinServe CSR Initiative",
    description: "Supports commerce and management students who show strong academics and financial need.",
    amount: 40000, amountNote: "per year",
    levels: ["Undergraduate", "Postgraduate"], courses: ["Commerce", "Management"], minPercent: 65, maxIncomeLakh: 5, domicile: null,
    sector: "Private", types: ["Need", "Merit"],
    documents: ["Latest Semester Marksheet", "Aadhaar / Identity Proof", "Income Certificate", "Bank Account Details"],
    opens: "2026-09-01", deadline: "2026-10-31", results: "2026-12-15", url: null, awards: 300, duration: "Renewable annually",
    benefits: ["₹40,000 per year", "Internship opportunity"],
    conditions: ["Enrolled in B.Com, BBA, M.Com or MBA"],
  },
  {
    id: "class10-talent",
    name: "Young Talent Search Award",
    provider: "Demo National Talent Council",
    description: "Identifies and nurtures talented students in Class 10 with a monthly scholarship through higher secondary studies.",
    amount: 1250, amountNote: "per month",
    levels: ["Class 10"], courses: ["Any"], minPercent: 85, maxIncomeLakh: null, domicile: null,
    sector: "Government", types: ["Merit"],
    documents: ["Class 9 Marksheet", "School ID / Bonafide Certificate", "Aadhaar / Identity Proof"],
    opens: "2026-08-15", deadline: "2026-11-25", results: "2027-02-28", url: null, awards: 2000, duration: "Class 11 to PhD (stage-wise)",
    benefits: ["₹1,250 per month during Class 11–12", "Higher amounts at later stages"],
    conditions: ["Selection via a two-stage written test"],
  },
  {
    id: "medical-aspire",
    name: "Aspire Medical Education Grant",
    provider: "Demo Arogya Health Foundation",
    description: "Helps MBBS, BDS, nursing and allied health students from modest backgrounds manage tuition costs.",
    amount: 60000, amountNote: "per year",
    levels: ["Undergraduate"], courses: ["Medical"], minPercent: 70, maxIncomeLakh: 6, domicile: null,
    sector: "Private", types: ["Need", "STEM"],
    documents: ["Class 12 Marksheet", "Entrance Exam Scorecard", "Income Certificate", "Aadhaar / Identity Proof", "Admission Letter"],
    opens: "2026-10-10", deadline: "2027-01-15", results: "2027-03-10", url: null, awards: 150, duration: "Renewable annually",
    benefits: ["₹60,000 per year", "Book and equipment allowance"],
    conditions: ["Admitted through a recognised entrance exam"],
  },
  {
    id: "diploma-skill",
    name: "Kaushal Diploma Support Scheme",
    provider: "Demo State Skill Development Mission",
    description: "Financial support for diploma students in polytechnic and vocational programmes.",
    amount: 20000, amountNote: "per year",
    levels: ["Diploma"], courses: ["Engineering", "Other"], minPercent: 55, maxIncomeLakh: 3, domicile: "Karnataka",
    sector: "Government", types: ["Need"],
    documents: ["Class 10 Marksheet", "Aadhaar / Identity Proof", "Income Certificate", "Domicile Certificate", "Bank Account Details"],
    opens: "2026-09-20", deadline: "2026-12-20", results: null, url: null, awards: null, duration: "Course duration",
    benefits: ["₹20,000 per year", "Tool-kit allowance"],
    conditions: ["Enrolled in a government-approved polytechnic"],
  },
  {
    id: "arts-humanities",
    name: "Vidya Arts & Humanities Scholarship",
    provider: "Demo Kalam Literary Trust",
    description: "For students passionate about literature, history, social sciences and the arts.",
    amount: 35000, amountNote: "per year",
    levels: ["Undergraduate", "Postgraduate"], courses: ["Arts & Humanities", "Law"], minPercent: 65, maxIncomeLakh: 6, domicile: null,
    sector: "Private", types: ["Merit", "Need"],
    documents: ["Latest Semester Marksheet", "Aadhaar / Identity Proof", "Income Certificate", "Writing Sample"],
    opens: "2026-11-01", deadline: "2027-02-10", results: "2027-04-01", url: null, awards: 120, duration: "Renewable annually",
    benefits: ["₹35,000 per year", "Annual scholars' workshop"],
    conditions: ["Submit a 1,000-word essay or portfolio"],
  },
  {
    id: "women-pg-research",
    name: "Shakti Women Postgraduate Scholarship",
    provider: "Demo University Grants Programme",
    description: "Supports women pursuing postgraduate studies, especially those who are the first in their family to do so.",
    amount: 36000, amountNote: "per year",
    levels: ["Postgraduate"], courses: ["Any"], minPercent: 55, maxIncomeLakh: null, domicile: null,
    sector: "Government", types: ["Women"], femaleOnly: true,
    documents: ["Graduation Marksheet", "Aadhaar / Identity Proof", "Institution ID / Bonafide Certificate", "Bank Account Details"],
    opens: "2026-10-01", deadline: "2027-01-05", results: "2027-03-20", url: null, awards: 3000, duration: "2 years",
    benefits: ["₹36,000 per year", "Contingency grant"],
    conditions: ["Regular full-time PG course", "Age below 30 at admission"],
  },
];

export const getScholarship = (id: string) => scholarships.find((s) => s.id === id);

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export function deadlineInfo(date: string, now = new Date()) {
  const d = new Date(date + "T23:59:59");
  const days = Math.ceil((d.getTime() - now.getTime()) / 86400000);
  if (days < 0) return { days, label: "Deadline passed", tone: "passed" as const };
  if (days <= 21) return { days, label: days === 0 ? "Due today" : `Due in ${days}d`, tone: "soon" as const };
  return { days, label: `${days} days left`, tone: "upcoming" as const };
}

export const formatDate = (d: string) =>
  new Date(d + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export const ALL_DOCUMENTS = Array.from(new Set(scholarships.flatMap((s) => s.documents))).sort();

export function docCategory(doc: string): string {
  const d = doc.toLowerCase();
  if (/marksheet|transcript|degree|scorecard/.test(d)) return "Academic Documents";
  if (/aadhaar|identity|passport/.test(d)) return "Identity Documents";
  if (/income|bank/.test(d)) return "Income Documents";
  if (/institution|school id|admission|bonafide/.test(d)) return "Institution Documents";
  return "Other Documents";
}
