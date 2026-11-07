import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/grantly/MarketingLayout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — GRANTLY" },
      { name: "description", content: "Please read before using GRANTLY." },
      { property: "og:title", content: "Terms of Service — GRANTLY" },
      { property: "og:description", content: "Please read before using GRANTLY." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <InfoPage eyebrow="Terms of Service" title="Please read before using GRANTLY.">
        <p>GRANTLY is provided as a demonstration. Scholarship listings are sample data and must not be relied upon as real opportunities.</p>
        <p>Match results are informational guidance based on what you entered and do not guarantee eligibility or selection. Always verify requirements with the official scholarship provider.</p>
    </InfoPage>
  );
}
