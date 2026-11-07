import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/grantly/MarketingLayout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — GRANTLY" },
      { name: "description", content: "Your data stays with you." },
      { property: "og:title", content: "Privacy Policy — GRANTLY" },
      { property: "og:description", content: "Your data stays with you." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <InfoPage eyebrow="Privacy Policy" title="Your data stays with you.">
        <p>This prototype stores your profile, saved scholarships, application statuses and document checklist only in your browser's local storage. Nothing is sent to a server.</p>
        <p>No documents are uploaded anywhere — marking a document as ready simply records a checkmark on your device. Clearing your browser data, or using Settings → Reset, removes everything.</p>
    </InfoPage>
  );
}
