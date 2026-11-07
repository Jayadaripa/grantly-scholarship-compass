
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  CircleHelp,
  ExternalLink,
  FileText,
  GraduationCap,
  IndianRupee,
  MapPin,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import {
  getScholarship,
  formatINR,
  formatDate,
  deadlineInfo,
} from "@/lib/scholarships";

import { matchScholarship } from "@/lib/match";
import { useAppState } from "@/lib/store";

export const Route = createFileRoute("/_shell/scholarship/$id")({
  head: () => ({
    meta: [
      { title: "Scholarship Details — GRANTLY" },
      {
        name: "description",
        content:
          "Explore scholarship benefits, eligibility criteria, deadlines, and required documents.",
      },
    ],
  }),
  component: ScholarshipDetailsPage,
});

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[18px] border border-[#E2E8F0] bg-white p-5 shadow-[0_2px_8px_rgba(15,23,42,0.02)] sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D1FAE5] text-[#0F766E]">
          <Icon size={20} />
        </div>

        <h2 className="text-lg font-semibold text-[#0F172A]">{title}</h2>
      </div>

      {children}
    </section>
  );
}

function ScholarshipDetailsPage() {
  const { id } = Route.useParams();
  const { profile } = useAppState();

  const scholarship = getScholarship(id);

  if (!scholarship) {
    return (
      <div className="min-h-[60vh] bg-[#F8FAFC] px-4 py-16 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F1F5F9] text-[#64748B]">
          <CircleHelp size={28} />
        </div>

        <h1 className="mt-5 text-2xl font-bold text-[#0F172A]">
          Scholarship not found
        </h1>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#64748B]">
          This scholarship may have been removed or the link may be incorrect.
        </p>

        <Link
          to="/explore"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#0F766E] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#134E4A]"
        >
          Explore scholarships
        </Link>
      </div>
    );
  }

  const match = matchScholarship(scholarship, profile);
  const deadline = deadlineInfo(scholarship.deadline);

  const matchColor =
    match.label === "Strong Match"
      ? "text-[#16A34A]"
      : match.label === "Not Eligible"
        ? "text-[#EF4444]"
        : "text-[#B45309]";

  const deadlineColor =
    deadline.tone === "passed"
      ? "text-[#EF4444]"
      : deadline.tone === "soon"
        ? "text-[#B45309]"
        : "text-[#16A34A]";

  const deadlineBackground =
    deadline.tone === "passed"
      ? "bg-[#FEF2F2]"
      : deadline.tone === "soon"
        ? "bg-[#FFFBEB]"
        : "bg-[#F0FDF4]";

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 py-5 text-[#0F172A] sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Back navigation */}
        <Link
          to="/explore"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#64748B] transition-colors hover:text-[#0F766E]"
        >
          <ArrowLeft size={17} />
          Back to scholarships
        </Link>

        {/* Scholarship overview */}
        <div className="rounded-[20px] border border-[#E2E8F0] bg-white p-5 shadow-[0_2px_8px_rgba(15,23,42,0.02)] sm:p-8">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#D1FAE5] px-3 py-1 text-xs font-semibold text-[#0F766E]">
              {scholarship.sector}
            </span>

            {scholarship.types.map((type) => (
              <span
                key={type}
                className="rounded-full bg-[#F1F5F9] px-3 py-1 text-xs font-medium text-[#64748B]"
              >
                {type}
              </span>
            ))}
          </div>

          <h1 className="max-w-3xl text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
            {scholarship.name}
          </h1>

          <p className="mt-2 text-sm font-medium text-[#64748B]">
            {scholarship.provider}
          </p>

          <p className="mt-5 max-w-3xl text-sm leading-7 text-[#64748B] sm:text-base">
            {scholarship.description}
          </p>

          {/* Summary information */}
          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <SummaryItem
              icon={IndianRupee}
              label="Scholarship amount"
              value={`${formatINR(scholarship.amount)} ${scholarship.amountNote}`}
            />

            <SummaryItem
              icon={CalendarDays}
              label="Application deadline"
              value={formatDate(scholarship.deadline)}
              valueClass={deadlineColor}
            />

            <SummaryItem
              icon={GraduationCap}
              label="Education level"
              value={scholarship.levels.join(", ")}
            />

            <SummaryItem
              icon={Users}
              label="Number of awards"
              value={
                scholarship.awards == null
                  ? "Not specified"
                  : scholarship.awards.toLocaleString("en-IN")
              }
            />
          </div>
        </div>

        {/* Details + sidebar */}
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* Main details */}
          <div className="space-y-6">
            {/* Eligibility */}
            <Section title="Eligibility criteria" icon={GraduationCap}>
              <div className="grid gap-3 sm:grid-cols-2">
                <Requirement
                  label="Education level"
                  value={scholarship.levels.join(", ")}
                />

                <Requirement
                  label="Eligible courses"
                  value={
                    scholarship.courses.includes("Any")
                      ? "All courses"
                      : scholarship.courses.join(", ")
                  }
                />

                <Requirement
                  label="Minimum academic score"
                  value={
                    scholarship.minPercent == null
                      ? "Not specified"
                      : `${scholarship.minPercent}%`
                  }
                />

                <Requirement
                  label="Family income limit"
                  value={
                    scholarship.maxIncomeLakh == null
                      ? "Not specified"
                      : `Up to ${formatINR(scholarship.maxIncomeLakh * 100000)} per year`
                  }
                />

                <Requirement
                  label="Domicile"
                  value={scholarship.domicile ?? "No specific state listed"}
                />

                <Requirement
                  label="Gender requirement"
                  value={
                    scholarship.femaleOnly
                      ? "Female students only"
                      : "Not specified"
                  }
                />
              </div>

              {scholarship.conditions.length > 0 && (
                <div className="mt-6">
                  <h3 className="mb-3 text-sm font-semibold text-[#0F172A]">
                    Additional conditions
                  </h3>

                  <ul className="space-y-3">
                    {scholarship.conditions.map((condition) => (
                      <li
                        key={condition}
                        className="flex items-start gap-3 text-sm leading-6 text-[#64748B]"
                      >
                        <CheckCircle2
                          size={17}
                          className="mt-1 shrink-0 text-[#16A34A]"
                        />

                        <span>{condition}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Section>

            {/* Benefits */}
            <Section title="Scholarship benefits" icon={IndianRupee}>
              <ul className="space-y-3">
                {scholarship.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-3 text-sm leading-6 text-[#64748B]"
                  >
                    <CheckCircle2
                      size={18}
                      className="mt-1 shrink-0 text-[#16A34A]"
                    />

                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 rounded-xl bg-[#F1F5F9] p-4">
                <p className="text-sm text-[#64748B]">
                  <span className="font-semibold text-[#0F172A]">
                    Duration:{" "}
                  </span>

                  {scholarship.duration ?? "Not specified"}
                </p>
              </div>
            </Section>

            {/* Documents */}
            <Section title="Required documents" icon={FileText}>
              <p className="mb-4 text-sm leading-6 text-[#64748B]">
                Prepare the following documents before starting your
                application.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {scholarship.documents.map((document) => (
                  <div
                    key={document}
                    className="flex items-start gap-3 rounded-xl border border-[#E2E8F0] bg-white p-3.5 transition-colors hover:border-[#A7F3D0] hover:bg-[#F0FDF4]"
                  >
                    <FileText
                      size={18}
                      className="mt-0.5 shrink-0 text-[#0F766E]"
                    />

                    <span className="text-sm leading-5 text-[#334155]">
                      {document}
                    </span>
                  </div>
                ))}
              </div>
            </Section>

            {/* Important dates */}
            <Section title="Important dates" icon={CalendarDays}>
              <div className="space-y-4">
                <DateItem
                  label="Applications open"
                  date={scholarship.opens}
                />

                <DateItem
                  label="Application deadline"
                  date={scholarship.deadline}
                />

                <DateItem
                  label="Expected result date"
                  date={scholarship.results}
                />
              </div>
            </Section>
          </div>

          {/* Right sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-6">
            {/* Eligibility match */}
            <div className="rounded-[20px] border border-[#A7F3D0] bg-[#ECFDF5] p-5">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-base font-semibold text-[#134E4A]">
                  Your eligibility match
                </h2>

                <span
                  className={`text-xs font-semibold ${matchColor}`}
                >
                  {match.label}
                </span>
              </div>

              {profile ? (
                <>
                  <div className="mt-5 flex items-end gap-2">
                    <span className="text-4xl font-bold tracking-tight text-[#0F766E]">
                      {match.percent}%
                    </span>

                    <span className="mb-1 text-sm text-[#64748B]">
                      match score
                    </span>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#D1FAE5]">
                    <div
                      className="h-full rounded-full bg-[#10B981] transition-all duration-500"
                      style={{
                        width: `${Math.min(100, Math.max(0, match.percent))}%`,
                      }}
                    />
                  </div>

                  <div className="mt-5 space-y-4">
                    {match.criteria.map((criterion) => (
                      <div
                        key={criterion.label}
                        className="flex items-start gap-3"
                      >
                        {criterion.status === "met" ? (
                          <CheckCircle2
                            size={18}
                            className="mt-0.5 shrink-0 text-[#16A34A]"
                          />
                        ) : (
                          <CircleHelp
                            size={18}
                            className={`mt-0.5 shrink-0 ${
                              criterion.status === "fail"
                                ? "text-[#EF4444]"
                                : "text-[#F59E0B]"
                            }`}
                          />
                        )}

                        <div>
                          <p className="text-sm font-medium text-[#134E4A]">
                            {criterion.label}
                          </p>

                          <p className="mt-1 text-xs leading-5 text-[#64748B]">
                            {criterion.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="mt-4">
                  <p className="text-sm leading-6 text-[#64748B]">
                    Complete your profile to see how well you match this
                    scholarship.
                  </p>

                  <Link
                    to="/profile"
                    className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-[#0F766E] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#134E4A]"
                  >
                    Complete profile
                  </Link>
                </div>
              )}
            </div>

            {/* Application panel */}
            <div className="rounded-[20px] border border-[#E2E8F0] bg-white p-5 shadow-[0_2px_8px_rgba(15,23,42,0.02)]">
              <h2 className="text-base font-semibold text-[#0F172A]">
                Application information
              </h2>

              <div
                className={`mt-3 inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${deadlineBackground} ${deadlineColor}`}
              >
                {deadline.label}
              </div>

              {scholarship.url ? (
                <a
                  href={scholarship.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#134E4A]"
                >
                  Apply Now
                  <ExternalLink size={16} />
                </a>
              ) : (
                <div className="mt-5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5">
                  <p className="text-sm font-medium text-[#0F172A]">
                    Application link unavailable
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#64748B]">
                    This demo scholarship does not have an official application
                    URL.
                  </p>
                </div>
              )}

              <p className="mt-4 text-xs leading-5 text-[#94A3B8]">
                Verify the requirements and dates with the official provider
                before applying.
              </p>
            </div>
          </aside>
        </div>

        {/* Demo notice */}
        <div className="rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-4">
          <p className="text-sm leading-6 text-[#92400E]">
            <span className="font-semibold">Demo notice: </span>
            This scholarship is fictional sample content created for the GRANTLY
            demonstration. It is not a verified funding opportunity.
          </p>
        </div>
      </div>
    </div>
  );
}

function SummaryItem({
  icon: Icon,
  label,
  value,
  valueClass = "",
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
      <div className="mb-3 flex items-center gap-2 text-[#64748B]">
        <Icon size={16} />

        <span className="text-xs font-medium">{label}</span>
      </div>

      <p className={`text-sm font-semibold leading-5 text-[#0F172A] ${valueClass}`}>
        {value}
      </p>
    </div>
  );
}

function Requirement({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5">
      <p className="text-xs font-medium text-[#64748B]">{label}</p>

      <p className="mt-1.5 text-sm font-semibold leading-5 text-[#0F172A]">
        {value}
      </p>
    </div>
  );
}

function DateItem({
  label,
  date,
}: {
  label: string;
  date: string | null;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-[#64748B]">{label}</span>

      <span className="text-right text-sm font-semibold text-[#0F172A]">
        {date ? formatDate(date) : "Not specified"}
      </span>
    </div>
  );
}
