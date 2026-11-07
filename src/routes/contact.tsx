import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/grantly/MarketingLayout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — GRANTLY" },
      { name: "description", content: "We'd love to hear from you." },
      { property: "og:title", content: "Contact — GRANTLY" },
      { property: "og:description", content: "We'd love to hear from you." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <InfoPage eyebrow="Contact" title="We'd love to hear from you.">
        <p>GRANTLY is a hackathon prototype, so there's no support desk yet. Share feedback with the team that presented it to you.</p>
        <p>For questions about a specific scholarship, always contact the official provider directly — GRANTLY does not process applications.</p>
    </InfoPage>
  );
}
