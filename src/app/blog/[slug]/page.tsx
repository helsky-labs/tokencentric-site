import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs, getAllPosts } from "@/lib/blog";
import { Logo } from "@/components/ui/Logo";
import { BlogPostTracker } from "@/components/ui/BlogPostTracker";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

function BlogJsonLd({
  post,
}: {
  post: NonNullable<ReturnType<typeof getPostBySlug>>;
}) {
  const baseUrl = "https://tokencentric.app";

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
      url: "https://github.com/helrabelo",
    },
    publisher: {
      "@type": "Organization",
      name: "TokenCentric",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/icon.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
    />
  );
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return (
    <div className="min-h-screen">
      <BlogPostTracker slug={slug} title={post.title} />
      <BlogJsonLd post={post} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#F7F7F7]/80 dark:bg-[#222831]/80 border-b border-[#E0E0E0] dark:border-[#393E46]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <span className="transition-transform duration-200 hover:rotate-6">
                <Logo width={32} height={32} />
              </span>
              <span className="font-semibold text-lg">TokenCentric</span>
            </Link>
            <Link
              href="/blog"
              className="text-[#4A5058] dark:text-[#7D8188] hover:text-[#222831] dark:hover:text-[#EEEEEE] transition-colors"
            >
              Back to Blog
            </Link>
          </div>
        </div>
      </nav>

      {/* Article */}
      <article className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs font-medium bg-[#00ADB5]/15 dark:bg-[#008B92]/30 text-[#008B92] dark:text-[#00ADB5]/40 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              {post.title}
            </h1>
            <p className="text-lg text-[#4A5058] dark:text-[#7D8188] mb-6">
              {post.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-[#F7F7F7]0 border-b border-[#E0E0E0] dark:border-[#393E46] pb-6">
              <span>{post.author}</span>
              <span>-</span>
              <span>{post.date}</span>
              <span>-</span>
              <span>{post.readingTime}</span>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-headings:font-semibold prose-a:text-[#00ADB5] dark:prose-a:text-[#00ADB5] prose-code:text-[#00ADB5] dark:prose-code:text-[#00ADB5]">
            {post.content.split("\n").map((paragraph, index) => {
              const trimmed = paragraph.trim();
              if (!trimmed) return null;

              if (trimmed.startsWith("## ")) {
                return (
                  <h2 key={index} className="text-2xl font-semibold mt-8 mb-4">
                    {trimmed.replace("## ", "")}
                  </h2>
                );
              }

              if (trimmed.startsWith("### ")) {
                return (
                  <h3 key={index} className="text-xl font-semibold mt-6 mb-3">
                    {trimmed.replace("### ", "")}
                  </h3>
                );
              }

              if (trimmed.startsWith("- **")) {
                const match = trimmed.match(/^- \*\*(.+?)\*\*:?\s*(.*)$/);
                if (match) {
                  return (
                    <li key={index} className="ml-4">
                      <strong>{match[1]}</strong>
                      {match[2] && `: ${match[2]}`}
                    </li>
                  );
                }
              }

              if (trimmed.startsWith("- ")) {
                return (
                  <li key={index} className="ml-4">
                    {trimmed.replace("- ", "")}
                  </li>
                );
              }

              if (/^\d+\.\s/.test(trimmed)) {
                return (
                  <li key={index} className="ml-4 list-decimal">
                    {trimmed.replace(/^\d+\.\s/, "")}
                  </li>
                );
              }

              // Bold text within paragraphs
              const parts = trimmed.split(/(\*\*[^*]+\*\*)/g);
              return (
                <p
                  key={index}
                  className="mb-4 text-[#393E46] dark:text-[#B8BCC2]"
                >
                  {parts.map((part, i) => {
                    if (part.startsWith("**") && part.endsWith("**")) {
                      return <strong key={i}>{part.slice(2, -2)}</strong>;
                    }
                    return part;
                  })}
                </p>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-[#00ADB5]/100 to-teal-600 text-white text-center">
            <h3 className="text-2xl font-bold mb-2">
              Ready to try TokenCentric?
            </h3>
            <p className="text-[#00ADB5]/15 mb-6">
              Free, open-source AI config file manager for your projects.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#00ADB5] font-semibold transition-all hover:scale-105 shadow-lg"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download TokenCentric
            </Link>
          </div>

          {/* Navigation */}
          <div className="mt-12 grid sm:grid-cols-2 gap-4">
            {prevPost && (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="p-4 rounded-xl border border-[#E0E0E0] dark:border-[#393E46] hover:border-[#00ADB5]/25 dark:hover:border-[#008B92] transition-colors"
              >
                <span className="text-sm text-[#F7F7F7]0">Previous</span>
                <p className="font-medium text-[#222831] dark:text-[#EEEEEE]">
                  {prevPost.title}
                </p>
              </Link>
            )}
            {nextPost && (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="p-4 rounded-xl border border-[#E0E0E0] dark:border-[#393E46] hover:border-[#00ADB5]/25 dark:hover:border-[#008B92] transition-colors sm:text-right"
              >
                <span className="text-sm text-[#F7F7F7]0">Next</span>
                <p className="font-medium text-[#222831] dark:text-[#EEEEEE]">
                  {nextPost.title}
                </p>
              </Link>
            )}
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-[#E0E0E0] dark:border-[#393E46]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo width={24} height={24} />
            <span className="text-sm text-[#4A5058] dark:text-[#7D8188]">
              Built by{" "}
              <a
                href="https://github.com/helrabelo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00ADB5] dark:text-[#00ADB5] hover:underline"
              >
                Hel Rabelo
              </a>
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-[#F7F7F7]0">
            <Link
              href="/"
              className="hover:text-[#393E46] dark:hover:text-[#B8BCC2] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="hover:text-[#393E46] dark:hover:text-[#B8BCC2] transition-colors"
            >
              Blog
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
