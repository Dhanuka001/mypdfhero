import Link from "next/link";
import { blogPosts } from "@/content/blog-posts";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "MyPDFHero Blog | Long-Tail PDF Workflows & Tutorials",
  description:
    "Expert guides that teach you how to compress, merge, and convert PDFs for every scenario—admissions, HR, visas, classrooms, and more.",
  path: "/blog",
  keywords: [
    "pdf blog",
    "compress pdf tutorial",
    "merge pdf guide",
    "jpg to pdf tips",
    "pdf troubleshooting",
  ],
});

export default function BlogIndexPage() {
  const posts = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return (
    <div className="bg-[#FCFAFF] text-[#120529]">
      <section className="mx-auto max-w-5xl px-4 pb-12 pt-16 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-purple-500">Insights</p>
        <h1 className="mt-3 text-5xl font-semibold">MyPDFHero Blog</h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-[#4b3b63]">
          Deep dives into long-tail PDF problems. Each post includes screenshots, schema-backed FAQs, official resources, and
          internal links so Google sees MyPDFHero as the trusted hub for document workflows.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-20">
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-3xl border border-purple-100 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-purple-200"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.4em] text-purple-400">{post.category}</span>
              <h2 className="mt-3 text-2xl font-semibold text-[#120529]">{post.title}</h2>
              <p className="mt-2 text-sm text-[#4b3b63]">{post.excerpt}</p>
              <div className="mt-4 flex flex-wrap gap-4 text-xs text-[#6b5c84]">
                <span>{post.readTime}</span>
                <span>Updated {new Date(post.updatedAt).toLocaleDateString()}</span>
              </div>
              <span className="mt-5 inline-flex items-center text-sm font-semibold text-[#7c3aed]">
                Read guide <span className="ml-2 transition group-hover:translate-x-1">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

