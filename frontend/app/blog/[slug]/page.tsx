import type { Metadata } from "next";
import { BlogArticle } from "@/components/BlogArticle";
import { blogPosts, getBlogPost } from "@/content/blog-posts";
import { buildMetadata } from "@/lib/metadata";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  return buildMetadata({
    title: `${post.title} | MyPDFHero Blog`,
    description: post.description,
    path: `/blog/${slug}`,
    keywords: post.keywords,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const relatedCandidates = post.relatedSlugs
    .map((slug) => blogPosts.find((entry) => entry.slug === slug))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  const fallback = blogPosts.filter((entry) => entry.slug !== post.slug).slice(0, 3);
  const relatedPosts = relatedCandidates.length ? relatedCandidates : fallback;

  return <BlogArticle post={post} relatedPosts={relatedPosts} />;
}
