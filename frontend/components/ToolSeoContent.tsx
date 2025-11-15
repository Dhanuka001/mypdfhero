import Link from "next/link";
import Script from "next/script";
import type { ToolSeoContentConfig } from "@/content/tool-pages";

type ToolSeoContentProps = {
  content: ToolSeoContentConfig;
};

export function ToolSeoContent({ content }: ToolSeoContentProps) {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: content.schema.howTo.name,
    description: content.schema.howTo.description,
    step: content.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.description,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="mx-auto mt-10 w-full max-w-4xl px-4 pb-16 text-[#120529]">
      <div className="rounded-[32px] border border-purple-100 bg-white p-8 shadow-lg">
        <div className="space-y-4">
          {content.intro.map((paragraph) => (
            <p key={paragraph} className="text-base text-[#4b3b63] md:text-lg">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-10 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold">{content.headings.features}</h2>
            <ul className="mt-4 grid gap-4 md:grid-cols-2">
              {content.features.map((feature) => (
                <li key={feature.title} className="rounded-2xl border border-purple-50 bg-[#fcf8ff] p-4">
                  <p className="text-lg font-semibold text-[#120529]">{feature.title}</p>
                  <p className="mt-2 text-sm text-[#4b3b63]">{feature.description}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">{content.headings.howTo}</h2>
            <ol className="mt-4 space-y-4">
              {content.steps.map((step, index) => (
                <li key={step.title} className="rounded-2xl border border-purple-50 bg-white p-4 shadow-sm">
                  <div className="text-sm font-bold uppercase tracking-[0.3em] text-purple-400">Step {index + 1}</div>
                  <p className="mt-2 text-lg font-semibold text-[#120529]">{step.title}</p>
                  <p className="mt-1 text-sm text-[#4b3b63]">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">{content.headings.faq}</h2>
            <div className="mt-4 space-y-5 text-[#4b3b63]">
              {content.faqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl border border-purple-50 bg-white/80 p-4">
                  <p className="text-lg font-semibold text-[#120529]">{faq.question}</p>
                  <p className="mt-2 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-purple-100 bg-[#fcf8ff] p-5">
              <h3 className="text-xl font-semibold text-[#120529]">Switch tools</h3>
              <p className="mt-2 text-sm text-[#4b3b63]">Continue working with the rest of the MyPDFHero toolkit.</p>
              <div className="mt-4 space-y-3">
                {content.relatedTools.map((tool) => (
                  <Link key={tool.href} href={tool.href} className="block rounded-2xl bg-white p-4 shadow-sm transition hover:-translate-y-0.5">
                    <p className="font-semibold text-[#7c3aed]">{tool.label}</p>
                    <p className="text-sm text-[#4b3b63]">{tool.description}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-purple-100 bg-white p-5">
              <h3 className="text-xl font-semibold text-[#120529]">Expert guides</h3>
              <p className="mt-2 text-sm text-[#4b3b63]">
                Dive deeper with long-form blog posts that build topical authority and answer real user questions.
              </p>
              <div className="mt-4 space-y-3">
                {content.relatedBlogs.map((blog) => (
                  <Link key={blog.href} href={blog.href} className="block rounded-2xl border border-purple-50 p-4 transition hover:-translate-y-0.5 hover:border-purple-200">
                    <p className="font-semibold text-[#7c3aed]">{blog.label}</p>
                    <p className="text-sm text-[#4b3b63]">{blog.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Script id={`${content.slug}-howto-schema`} type="application/ld+json">
        {JSON.stringify(howToSchema)}
      </Script>
      <Script id={`${content.slug}-faq-schema`} type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </Script>
    </section>
  );
}
