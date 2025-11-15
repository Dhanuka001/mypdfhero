import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Terms of Service | MyPDFHero",
  description: "Review the rules of using MyPDFHero’s PDF tools, from acceptable use to disclaimers and governing law.",
  path: "/terms",
  keywords: ["mypdfhero terms", "pdf tool terms of service"],
});

const sections = [
  {
    title: "1. Acceptance",
    body: [
      "By using MyPDFHero you agree to these terms and any referenced policies. If you do not agree, do not upload files or access the APIs.",
    ],
  },
  {
    title: "2. Eligibility",
    body: [
      "You must be at least 13 years old or have parental permission to use the tools. Organizations are responsible for ensuring their team members comply with these terms.",
    ],
  },
  {
    title: "3. Acceptable use",
    body: [
      "Do not upload files that violate applicable laws, contain malware, or infringe intellectual property. Automated scraping or denial-of-service attempts are prohibited.",
    ],
  },
  {
    title: "4. Intellectual property",
    body: [
      "All site content, branding, and underlying code belongs to MyPDFHero. You retain ownership of the PDFs and images you upload.",
    ],
  },
  {
    title: "5. Disclaimers",
    body: [
      "The service is provided “as is” without warranties of any kind. We strive for 99.9% uptime but do not guarantee uninterrupted availability or specific compression ratios.",
    ],
  },
  {
    title: "6. Limitation of liability",
    body: [
      "To the fullest extent permitted by law, MyPDFHero will not be liable for lost profits, data loss, or indirect damages exceeding USD $100.",
    ],
  },
  {
    title: "7. Governing law",
    body: [
      "These terms are governed by the laws of the State of California, excluding conflict-of-law principles. Disputes will be handled in San Francisco County courts.",
    ],
  },
  {
    title: "8. Contact",
    body: [
      `For questions about these terms email ${siteConfig.contactEmail}.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="bg-[#FCFAFF] text-[#120529]">
      <section className="mx-auto max-w-4xl px-4 pb-12 pt-16">
        <p className="text-xs uppercase tracking-[0.4em] text-purple-500">Terms</p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight md:text-5xl">Terms of Service.</h1>
        <p className="mt-4 text-lg text-[#4b3b63]">
          These terms set the expectations for anyone using the MyPDFHero website, API, or related services. Please review them
          alongside our Privacy Policy before uploading files.
        </p>
        <p className="mt-2 text-sm text-[#6b5c84]">Last updated: January 2025</p>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-20">
        <div className="space-y-8 rounded-3xl border border-purple-100 bg-white p-6 shadow-sm md:p-10">
          {sections.map((section) => (
            <div key={section.title} className="space-y-2">
              <h2 className="text-2xl font-semibold">{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="text-sm text-[#4b3b63]">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

