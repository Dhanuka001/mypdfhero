import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Privacy Policy | MyPDFHero",
  description: "Learn how MyPDFHero collects, stores, and protects your PDF files, analytics data, and account-free sessions.",
  path: "/privacy",
  keywords: ["mypdfhero privacy policy", "pdf tool privacy", "file deletion policy"],
});

const sections = [
  {
    title: "1. Data we process",
    paragraphs: [
      "We only process the files you upload, anonymous analytics, and any emails you voluntarily send us. MyPDFHero does not require user accounts, so there are no passwords, billing profiles, or personal dashboards stored on our servers.",
      "Analytics is collected via privacy-focused tooling that tracks pageviews, device types, and conversion events in aggregate. We do not build behavioral profiles or sell data to third parties.",
    ],
  },
  {
    title: "2. File handling & deletion",
    paragraphs: [
      "Uploaded PDFs and images are encrypted in transit via HTTPS and stored temporarily in isolated object storage. Processing jobs usually complete within seconds. We automatically delete temporary objects within 15 minutes after completion or immediately when you close the tab.",
      "If you hit the Reset button inside any tool, we revoke the download URL and purge the temporary copy right away. We never review file contents unless you explicitly share them with us for debugging.",
    ],
  },
  {
    title: "3. Cookies & analytics",
    paragraphs: [
      "We run a single first-party analytics script to measure site performance. It does not set marketing cookies, nor does it share data with advertising networks. Browser-level preferences such as “Do Not Track” are honored.",
    ],
  },
  {
    title: "4. Third-party infrastructure",
    paragraphs: [
      "MyPDFHero is hosted on SOC 2 compliant infrastructure providers. Vendors only receive the minimum data required to deliver the service (for example, CDN logs that include IP addresses for security purposes).",
    ],
  },
  {
    title: "5. Your rights",
    paragraphs: [
      "You can request deletion of support emails, ask for a copy of any information you shared with us, or raise a complaint about our practices. Email privacy@mypdfhero.com and we will respond within 72 hours.",
    ],
  },
  {
    title: "6. Updates",
    paragraphs: [
      "We may update this policy as we add new tools or compliance requirements. The “Last updated” date below reflects the most recent changes. Significant updates will be announced via the homepage and email newsletter if you subscribed.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="bg-[#FCFAFF] text-[#120529]">
      <section className="mx-auto max-w-4xl px-4 pb-12 pt-16">
        <p className="text-xs uppercase tracking-[0.4em] text-purple-500">Privacy Policy</p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight md:text-5xl">We protect your PDFs and your trust.</h1>
        <p className="mt-4 text-lg text-[#4b3b63]">
          This policy explains what we collect, how long we retain it, and how you can reach us with privacy requests. MyPDFHero
          is designed to process files without accounts, so we keep the footprint small by default.
        </p>
        <p className="mt-2 text-sm text-[#6b5c84]">Last updated: January 2025</p>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-20">
        <div className="space-y-8 rounded-3xl border border-purple-100 bg-white p-6 shadow-sm md:p-10">
          {sections.map((section) => (
            <div key={section.title} className="space-y-3">
              <h2 className="text-2xl font-semibold">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-sm text-[#4b3b63]">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
          <div className="rounded-2xl border border-purple-50 bg-[#fcf8ff] p-4 text-sm text-[#4b3b63]">
            Questions? Email{" "}
            <a href={`mailto:${siteConfig.contactEmail}`} className="font-semibold text-[#7c3aed]">
              {siteConfig.contactEmail}
            </a>{" "}
            or privacy@mypdfhero.com.
          </div>
        </div>
      </section>
    </div>
  );
}

