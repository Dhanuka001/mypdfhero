import Link from "next/link";

const tools = [
  {
    title: "Compress PDF",
    description: "Shrink PDFs without killing quality. Perfect for email + uploads.",
    href: "/tools/compress-pdf",
    badge: "Smaller files",
  },
  {
    title: "Merge PDF",
    description: "Stack multiple PDFs into one tidy file in a single click.",
    href: "/tools/merge-pdf",
    badge: "Batch ready",
  },
  {
    title: "JPG to PDF",
    description: "Convert scans or screenshots into a clean PDF packet.",
    href: "/tools/jpg-to-pdf",
    badge: "Photo friendly",
  },
];

export default function Home() {
  return (
    <div className="bg-[#FCFAFF] text-[#120529]">
      <section className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16 pt-16 md:flex-row md:items-center">
        <div className="flex-1 space-y-6">
          <p className="text-xs uppercase tracking-[0.4em] text-purple-500">MyPDFHero</p>
          <h1 className="text-5xl font-black leading-tight md:text-6xl">
            Free PDF tools with no login, no fuss.
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

      <section id="tools" className="mx-auto max-w-6xl px-4 pb-20">
        <div className="flex flex-col gap-3 pb-8">
          <p className="text-xs uppercase tracking-[0.4em] text-purple-500">TOOLS</p>
          <h2 className="text-3xl font-black md:text-4xl">Pick your superpower.</h2>
          <p className="text-base text-[#4b3b63]">Each tool opens instantly with the same simple workflow.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group rounded-3xl border border-purple-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-purple-300"
            >
              <span className="rounded-full bg-[#ede7ff] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#7c3aed]">
                {tool.badge}
              </span>
              <h3 className="mt-4 text-2xl font-black text-[#120529]">{tool.title}</h3>
              <p className="mt-2 text-base text-[#4b3b63]">{tool.description}</p>
              <span className="mt-6 inline-flex items-center text-sm font-semibold text-[#7c3aed]">
                Open tool
                <span className="ml-2 text-lg transition group-hover:translate-x-1">{">"}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
