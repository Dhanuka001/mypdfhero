import Link from "next/link";

const tools = [
  {
    title: "Compress PDF",
    description: "Shrink PDFs without killing quality. Perfect for email + uploads.",
    href: "/tools/compress-pdf",
    badge: "Smaller files",
    gradient: "from-[#ede7ff] via-[#f7e3ff] to-[#fff7ee]",
  },
  {
    title: "Merge PDF",
    description: "Stack multiple PDFs into one tidy file in a single click.",
    href: "/tools/merge-pdf",
    badge: "Batch ready",
    gradient: "from-[#f8e9ff] via-[#f1f4ff] to-[#e9fbff]",
  },
  {
    title: "JPG to PDF",
    description: "Convert scans or screenshots into a clean PDF packet.",
    href: "/tools/jpg-to-pdf",
    badge: "Photo friendly",
    gradient: "from-[#ffeef4] via-[#fef6ff] to-[#ecf6ff]",
  },
];

const highlights = [
  {
    title: "No account, ever",
    copy: "We never ask for sign-ups. Drop your files, grab the result, and move on.",
  },
  {
    title: "Secure & temporary",
    copy: "Uploads travel over HTTPS and stay only long enough to process.",
  },
  {
    title: "Mobile friendly",
    copy: "Fix PDFs on your phone or laptop without squinting.",
  },
];

const trustSignals = [
  {
    title: "About MyPDFHero",
    copy:
      "MyPDFHero is built by a distributed team of PDF automation specialists who maintain cloud workflows for publishers and edtech companies. Every optimization in the app mirrors the audit checklists we use for enterprise clients—just simplified and offered for free.",
  },
  {
    title: "How we process files securely",
    copy:
      "Documents travel only over encrypted HTTPS connections and are stored in isolated buckets with automatic deletion scripts that wipe originals within minutes after processing finishes. We never inspect or use your content for training.",
  },
  {
    title: "No watermark guarantee",
    copy:
      "Every export is 100% watermark-free. You receive the same fidelity we see in QA, whether you are shrinking a slide deck or stitching scans for a visa application.",
  },
  {
    title: "Auto-delete policy",
    copy:
      "Temporary objects expire automatically, and you can manually clear them by hitting Reset after a task. The infrastructure is monitored so old files simply cannot linger on our servers.",
  },
];

const faqs = [
  {
    question: "Is MyPDFHero really free?",
    answer:
      "Yes. The current toolset is free for everyone. We plan to keep core actions free forever and fund the roadmap through lightweight affiliate partnerships and optional pro automations.",
  },
  {
    question: "Do you keep copies of my PDFs?",
    answer:
      "No. Files are removed automatically after processing or 15 minutes after upload—whichever comes first. The entire pipeline runs inside secure US/EU data centers that meet SOC 2 standards.",
  },
  {
    question: "Will my PDFs receive a watermark or footer?",
    answer:
      "Never. The compressor carefully resamples fonts and images without stamping a watermark or changing the page count. You get professional, ready-to-send files.",
  },
  {
    question: "How do I contact the team?",
    answer:
      "Email hello@mypdfhero.com for support, security questions, or partnership ideas. We reply within one business day.",
  },
];

const guideLinks = [
  {
    title: "How to Compress a PDF Without Losing Quality",
    href: "/blog/how-to-compress-pdf",
    description: "Step-by-step workflow with screenshots plus troubleshooting tips for extra-large files.",
  },
  {
    title: "How to Combine PDF Files on Windows and Mac",
    href: "/blog/combine-pdf-windows-mac",
    description: "Walkthrough for desktop users who need to stitch receipts or contracts quickly.",
  },
  {
    title: "How to Convert JPG to PDF on Any Device",
    href: "/blog/convert-jpg-to-pdf-any-device",
    description: "Explains our JPG to PDF tool plus native tricks inside Android, iOS, and Chromebooks.",
  },
];

export default function Home() {
  return (
    <div className="bg-[#FCFAFF] text-[#120529]">
      <section className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16 pt-16 md:flex-row md:items-center">
        <div className="flex-1 space-y-6">
          <p className="text-xs uppercase tracking-[0.4em] text-purple-500">MyPDFHero</p>
          <h1 className="text-5xl font-semibold leading-tight md:text-6xl">
            Your free hero for PDF problems.
          </h1>
          <p className="text-lg text-[#4b3b63] md:text-xl">
            Compress, merge, and convert files right in your browser. Clean UI, generous limits, and files deleted minutes
            after processing.
          </p>
          <div className="flex flex-col gap-4 text-base font-semibold text-white sm:flex-row">
            <Link
              href="/tools/compress-pdf"
              className="rounded-full bg-[#7c3aed] px-8 py-3 text-center shadow-lg shadow-purple-200 transition hover:bg-[#6d32d4]"
            >
              Start compressing
            </Link>
            <Link
              href="#tools"
              className="rounded-full border border-purple-200 px-8 py-3 text-center text-[#7c3aed] transition hover:bg-[#ede7ff]"
            >
              Explore tools
            </Link>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4 rounded-3xl border border-purple-100 bg-white p-6 text-base text-[#4b3b63] shadow-sm">
          <p className="text-lg font-semibold text-[#120529]">Why people like it</p>
          <ul className="space-y-3">
            <li>• Friendly interface on phones and laptops.</li>
            <li>• Transparent privacy – no login, quick file deletion.</li>
            <li>• Purple accents highlight CTAs without overwhelming.</li>
          </ul>
        </div>
      </section>

      <section id="tools" className="mx-auto max-w-6xl px-4 pb-16">
        <div className="flex flex-col gap-3 pb-8">
          <p className="text-xs uppercase tracking-[0.4em] text-purple-500">TOOLS</p>
          <h2 className="text-3xl font-semibold md:text-4xl">Pick your superpower.</h2>
          <p className="text-base text-[#4b3b63]">Each tool opens instantly with the same simple workflow.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className={`group relative overflow-hidden rounded-3xl border border-transparent bg-gradient-to-br ${tool.gradient} p-1 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl`}
            >
              <div className="h-full rounded-[30px] border border-white/70 bg-white/95 p-6 shadow-sm transition group-hover:bg-white">
                <span className="rounded-full bg-[#ede7ff] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#7c3aed]">
                  {tool.badge}
                </span>
                <h3 className="mt-4 text-2xl font-semibold text-[#120529]">{tool.title}</h3>
                <p className="mt-2 text-base text-[#4b3b63]">{tool.description}</p>
                <span className="mt-6 inline-flex items-center text-sm font-semibold text-[#7c3aed]">
                  Open tool
                  <span className="ml-2 text-lg transition group-hover:translate-x-1">{">"}</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-sm md:p-10">
          <h2 className="text-3xl font-semibold text-[#120529]">Built for everyday workflows</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.title} className="rounded-2xl border border-purple-50 bg-[#fcf8ff] p-5">
                <p className="text-lg font-semibold text-[#120529]">{item.title}</p>
                <p className="mt-2 text-sm text-[#4b3b63]">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-sm md:p-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-purple-500">Trust &amp; Safety</p>
              <h2 className="text-3xl font-semibold text-[#120529]">Transparent, secure, and human-led.</h2>
              <p className="mt-3 text-base text-[#4b3b63]">
                Users rely on MyPDFHero for admissions packets, HR onboarding, and finance paperwork. Here&apos;s how we show up with
                clarity, guardrails, and documented policies.
              </p>
            </div>
            <div className="rounded-2xl border border-purple-100 bg-[#fcf8ff] p-5 text-sm text-[#4b3b63]">
              <p className="text-lg font-semibold text-[#120529]">Need a direct line?</p>
              <p>Contact the team at</p>
              <a className="mt-1 block font-semibold text-[#7c3aed]" href="mailto:hello@mypdfhero.com">
                hello@mypdfhero.com
              </a>
              <p className="mt-3 text-xs uppercase tracking-[0.3em] text-[#a388d9]">Response window</p>
              <p className="mt-1 text-sm">We aim to reply within one business day for support and security questions.</p>
            </div>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {trustSignals.map((item) => (
              <div key={item.title} className="rounded-2xl border border-purple-50 bg-white/70 p-5">
                <p className="text-base font-semibold text-[#120529]">{item.title}</p>
                <p className="mt-2 text-sm text-[#4b3b63]">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-sm md:p-10">
          <div className="flex flex-col gap-3 pb-6">
            <p className="text-xs uppercase tracking-[0.4em] text-purple-500">Guides</p>
            <h2 className="text-3xl font-semibold text-[#120529]">Learn the workflows step-by-step.</h2>
            <p className="text-base text-[#4b3b63]">
              Our long-form tutorials walk through tricky PDF scenarios with screenshots, best practices, and internal links
              to every tool.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {guideLinks.map((guide) => (
              <div key={guide.href} className="flex flex-col rounded-2xl border border-purple-50 bg-[#fcf8ff] p-5">
                <p className="text-lg font-semibold text-[#120529]">{guide.title}</p>
                <p className="mt-2 flex-1 text-sm text-[#4b3b63]">{guide.description}</p>
                <Link
                  href={guide.href}
                  className="mt-4 inline-flex items-center font-semibold text-[#7c3aed] transition hover:text-[#5d28aa]"
                >
                  Read guide
                  <span className="ml-2 text-lg">&rarr;</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-sm md:p-10">
          <h2 className="text-3xl font-semibold text-[#120529]">FAQ</h2>
          <div className="mt-6 space-y-5 text-[#4b3b63]">
            {faqs.map((item) => (
              <div key={item.question}>
                <p className="text-lg font-semibold text-[#120529]">{item.question}</p>
                <p className="mt-1 text-base">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
