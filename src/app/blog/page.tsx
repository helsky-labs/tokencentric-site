import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Logo } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tips, guides, and updates about AI coding assistant configuration files, token management, and the TokenCentric app.",
  openGraph: {
    title: "TokenCentric Blog - AI Config File Tips & Guides",
    description:
      "Tips, guides, and updates about AI coding assistant configuration files, token management, and the TokenCentric app.",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen">
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
              href="/"
              className="text-[#4A5058] dark:text-[#7D8188] hover:text-[#222831] dark:hover:text-[#EEEEEE] transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Blog
          </h1>
          <p className="text-lg text-[#4A5058] dark:text-[#7D8188] max-w-2xl mx-auto">
            Tips, guides, and updates about AI coding assistant config files and
            token management.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[#F7F7F7]0 dark:text-[#7D8188] text-lg">
                No posts yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="group p-6 rounded-2xl bg-white dark:bg-[#393E46] border border-[#E0E0E0] dark:border-[#393E46] transition-all hover:shadow-lg hover:border-[#00ADB5]/25 dark:hover:border-[#008B92]"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs font-medium bg-[#00ADB5]/15 dark:bg-[#008B92]/30 text-[#008B92] dark:text-[#00ADB5]/40 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-semibold mb-2 group-hover:text-[#00ADB5] dark:group-hover:text-[#00ADB5] transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-[#4A5058] dark:text-[#7D8188] mb-4">
                      {post.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-[#F7F7F7]0">
                      <span>{post.date}</span>
                      <span>-</span>
                      <span>{post.readingTime}</span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

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
