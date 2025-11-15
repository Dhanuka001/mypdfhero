import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contact MyPDFHero | Support & Partnerships",
  description: "Reach the MyPDFHero team for support, security questions, partnership ideas, or press inquiries.",
  path: "/contact",
  keywords: ["contact mypdfhero", "mypdfhero support", "pdf tool contact"],
});

const contacts = [
  {
    heading: "Product support",
    description:
      "Questions about compression quality, file limits, or roadmap ideas? We reply to every user ticket within one business day.",
    email: siteConfig.contactEmail,
    extras: ["Attach sample PDFs if possible", "Include browser + device info"],
  },
  {
    heading: "Partnerships & integrations",
    description:
      "Want to bundle MyPDFHero inside your app or co-market an offer? Share your proposal and audience size so we can scope the next steps quickly.",
    email: "partners@mypdfhero.com",
    extras: ["Mention KPIs you care about", "Add timelines or launch windows"],
  },
  {
    heading: "Press & legal",
    description:
      "Media interviews, takedown requests, and compliance questionnaires use our dedicated channel so the right team member responds.",
    email: "press@mypdfhero.com",
    extras: ["Link to published stories", "Attach compliance documents if needed"],
  },
];

export default function ContactPage() {
  return (
    <div className="bg-[#FCFAFF] text-[#120529]">
      <section className="mx-auto max-w-4xl px-4 pb-12 pt-16">
        <p className="text-xs uppercase tracking-[0.4em] text-purple-500">Contact</p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight md:text-5xl">Talk to the MyPDFHero team.</h1>
        <p className="mt-4 text-lg text-[#4b3b63]">
          We keep communication simple—no chatbots, no endless ticket queues. Email us with as much context as you can provide and
          we will route it to an engineer, designer, or founder within one business day.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16">
        <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-sm md:p-10">
          <h2 className="text-2xl font-semibold">How to reach us</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {contacts.map((item) => (
              <div key={item.heading} className="rounded-2xl border border-purple-50 bg-[#fcf8ff] p-4">
                <p className="text-lg font-semibold text-[#120529]">{item.heading}</p>
                <p className="mt-2 text-sm text-[#4b3b63]">{item.description}</p>
                <a href={`mailto:${item.email}`} className="mt-3 inline-flex text-sm font-semibold text-[#7c3aed]">
                  {item.email}
                </a>
                <ul className="mt-3 list-disc space-y-1 pl-4 text-xs text-[#6b5c84]">
                  {item.extras.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-20">
        <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-sm md:p-10">
          <h2 className="text-2xl font-semibold">Mailing details</h2>
          <p className="mt-4 text-sm text-[#4b3b63]">
            MyPDFHero is operated remotely. For contract notices or invoices, address them to:
          </p>
          <div className="mt-3 rounded-2xl border border-purple-50 bg-[#fcf8ff] p-4 text-sm text-[#4b3b63]">
            <p className="font-semibold text-[#120529]">MyPDFHero HQ</p>
            <p>2261 Market Street #4010</p>
            <p>San Francisco, CA 94114</p>
            <p>United States</p>
          </div>
          <p className="mt-4 text-sm text-[#4b3b63]">
            Need legal docs first? Review our{" "}
            <Link href="/terms" className="font-semibold text-[#7c3aed]">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="font-semibold text-[#7c3aed]">
              Privacy Policy
            </Link>{" "}
            anytime.
          </p>
        </div>
      </section>
    </div>
  );
}

