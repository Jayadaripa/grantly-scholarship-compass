import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/grantly/MarketingLayout";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How GRANTLY works — GRANTLY" },
      { name: "description", content: "Three steps to your next scholarship." },
      { property: "og:title", content: "How GRANTLY works — GRANTLY" },
      { property: "og:description", content: "Three steps to your next scholarship." },
    ],
  }),
  component: HowItWorksPage,
});

function HowItWorksPage() {
  return (
    <InfoPage eyebrow="How It Works" title="Three steps to your next scholarship.">
        <h2>1. Build your profile</h2>
        <p>Share your education level, course, academic score and — only where needed — your family income range. It takes about two minutes.</p>
        <h2>2. Discover your matches</h2>
        <p>Our rule-based engine compares your profile against each scholarship's requirements and explains every result: requirement met, needs verification, or not eligible. A match percentage reflects profile fit — never a probability of winning.</p>
        <h2>3. Manage your applications</h2>
        <p>Save opportunities, tick off documents, and move each application from Interested to Awarded. Everything is saved on your device.</p>
    </InfoPage>
  );
}
