import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/grantly/MarketingLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About GRANTLY — GRANTLY" },
      { name: "description", content: "Scholarship search shouldn't be complicated." },
      { property: "og:title", content: "About GRANTLY — GRANTLY" },
      { property: "og:description", content: "Scholarship search shouldn't be complicated." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <InfoPage eyebrow="About" title="Scholarship search shouldn't be complicated.">
        <p>Every year, thousands of Indian students miss out on financial support simply because opportunities are scattered across portals, eligibility rules are hard to read, and deadlines slip by.</p>
        <p>GRANTLY brings discovery, eligibility understanding and application tracking into one calm, personal workspace — so students can move from confusion to clarity.</p>
        <h2>About this prototype</h2>
        <p>GRANTLY was built as a hackathon project. All scholarships shown are demonstration data and are not verified real opportunities. Your profile and progress are stored only in your browser.</p>
    </InfoPage>
  );
}
