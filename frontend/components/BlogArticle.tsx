import Link from "next/link";
import Script from "next/script";
import type { BlogPost } from "@/content/blog-posts";
import { siteConfig } from "@/lib/site";

type BlogArticleProps = {
  post: BlogPost;
  relatedPosts: BlogPost[];
};

const toolCtas = [
  {
    label: "Compress PDF",
    href: "/tools/compress-pdf",
    description: "Shrink assignments, contracts, or reports to fit email and LMS limits.",
  },
  {
    label: "Merge PDF",
    href: "/tools/merge-pdf",
    description: "Combine chapters, receipts, or scans before submitting a single file.",
  },
  {
    label: "JPG to PDF",
    href: "/tools/jpg-to-pdf",
    description: "Turn photos, scans, or screenshots into polished PDFs in seconds.",
  },
];

export function BlogArticle({ post, relatedPosts }: BlogArticleProps) {
  const tocItems = post.sections.map((section, index) => ({
    id: `${post.slug}-section-${index}`,
    heading: section.heading,
  }));

  const formatDate = (value: string) => new Date(value).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: post.title,
    description: post.description,
    step: post.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.description,
    })),
  };

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 text-[#120529]">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.4em] text-purple-500">{post.category}</p>
        <h1 className="text-4xl font-semibold leading-tight md:text-5xl">{post.title}</h1>
        <p className="text-lg text-[#4b3b63]">{post.excerpt}</p>
        <div className="flex flex-wrap gap-4 text-sm text-[#6b5c84]">
          <span>{post.readTime}</span>
          <span>Updated {formatDate(post.updatedAt)}</span>
        </div>
      </header>

      <div className="mt-10 rounded-3xl border border-purple-100 bg-white p-6 shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-purple-400">Table of contents</p>
        <ol className="mt-4 space-y-2 text-[#4b3b63]">
          {tocItems.map((item, idx) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="text-base font-medium text-[#7c3aed] hover:text-[#5d28aa]">
                {idx + 1}. {item.heading}
              </a>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-12 space-y-12">
        {post.sections.map((section, index) => (
          <section key={section.heading} id={tocItems[index]?.id} className="space-y-4">
            <h2 className="text-3xl font-semibold">{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph} className="text-base text-[#4b3b63]">
                {paragraph}
              </p>
            ))}
            {index === 0 && (
              <div className="rounded-3xl border border-purple-100 bg-[#fcf8ff] p-6">
                <p className="text-lg font-semibold text-[#120529]">Try the tools mentioned in this guide</p>
                <p className="mt-1 text-sm text-[#4b3b63]">
                  Every workflow here is powered by MyPDFHero. Jump straight into the tool that fits your task.
                </p>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  {toolCtas.map((cta) => (
                    <Link
                      key={cta.href}
                      href={cta.href}
                      className="rounded-2xl border border-purple-50 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5"
                    >
                      <p className="text-base font-semibold text-[#7c3aed]">{cta.label}</p>
                      <p className="mt-1 text-xs text-[#4b3b63]">{cta.description}</p>
                      <span className="mt-3 inline-flex items-center text-sm font-semibold text-[#120529]">
                        Open tool <span className="ml-2">&rarr;</span>
                      </span>
                    </Link>
                  ))}
                </div>
                <div className="mt-4 text-sm text-[#4b3b63]">
                  Need the rest of the toolkit?{" "}
                  <Link href="/" className="font-semibold text-[#7c3aed] hover:text-[#5d28aa]">
                    Visit the MyPDFHero homepage
                  </Link>{" "}
                  for upcoming releases.
                </div>
              </div>
            )}
          </section>
        ))}
      </div>

      <section className="mt-12 space-y-6">
        <div>
          <h2 className="text-3xl font-semibold">Step-by-step workflow</h2>
          <p className="mt-2 text-sm text-[#4b3b63]">
            Follow these practical steps inside MyPDFHero or your operating system to complete the task quickly.
          </p>
        </div>
        <ol className="grid gap-6 md:grid-cols-2">
          {post.steps.map((step, index) => (
            <li key={step.title} className="rounded-3xl border border-purple-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.4em] text-purple-400">Step {index + 1}</p>
              <p className="mt-2 text-xl font-semibold text-[#120529]">{step.title}</p>
              <p className="mt-1 text-sm text-[#4b3b63]">{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12 rounded-3xl border border-purple-100 bg-white p-6 shadow-sm">
        <h2 className="text-3xl font-semibold">Official resources</h2>
        <p className="mt-2 text-sm text-[#4b3b63]">
          Validate your workflow with trusted documentation from Google, Microsoft, Adobe, and other official sources.
        </p>
        <ul className="mt-4 space-y-4">
          {post.externalLinks.map((resource) => (
            <li key={resource.href} className="rounded-2xl border border-purple-50 p-4">
              <a href={resource.href} target="_blank" rel="noreferrer" className="text-lg font-semibold text-[#7c3aed]">
                {resource.label}
              </a>
              <p className="text-sm text-[#4b3b63]">{resource.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 space-y-4">
        <h2 className="text-3xl font-semibold">Frequently asked questions</h2>
        <div className="space-y-4 text-[#4b3b63]">
          {post.faqs.map((faq) => (
            <details key={faq.question} className="rounded-2xl border border-purple-100 bg-white p-4">
              <summary className="cursor-pointer text-lg font-semibold text-[#120529]">{faq.question}</summary>
              <p className="mt-2 text-sm">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-3xl border border-purple-100 bg-[#fcf8ff] p-6">
        <h2 className="text-3xl font-semibold text-[#120529]">Related reading</h2>
        <p className="mt-2 text-sm text-[#4b3b63]">
          Expand your PDF toolkit with more long-tail guides from MyPDFHero.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {relatedPosts.map((entry) => (
            <Link key={entry.slug} href={`/blog/${entry.slug}`} className="rounded-2xl border border-purple-50 bg-white p-4 shadow-sm transition hover:-translate-y-0.5">
              <p className="text-base font-semibold text-[#7c3aed]">{entry.title}</p>
              <p className="mt-1 text-sm text-[#4b3b63]">{entry.excerpt}</p>
              <span className="mt-3 inline-flex items-center text-xs font-semibold text-[#120529]">
                Read more <span className="ml-2">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Script id={`${post.slug}-article-schema`} type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </Script>
      <Script id={`${post.slug}-faq-schema`} type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </Script>
      <Script id={`${post.slug}-howto-schema`} type="application/ld+json">
        {JSON.stringify(howToSchema)}
      </Script>
    </article>
  );
}
