import { getTranslations } from "next-intl/server";
import { Logo } from "@/components/ui/Logo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "TokenCentric privacy policy. Learn what data we collect, how we use it, and how to opt out.",
  alternates: {
    canonical: "/privacy",
  },
};

export default async function PrivacyPage() {
  const t = await getTranslations("privacy");

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#F7F7F7]/80 dark:bg-[#222831]/80 border-b border-[#E0E0E0] dark:border-[#393E46]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="flex items-center gap-3">
              <Logo width={32} height={32} />
              <span className="font-semibold text-lg">TokenCentric</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">{t("title")}</h1>
          <p className="text-sm text-[#F7F7F7]0 dark:text-[#7D8188] mb-10">
            {t("lastUpdated")}
          </p>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
            <p className="text-lg text-[#4A5058] dark:text-[#B8BCC2]">
              {t("intro")}
            </p>

            {/* What we DON'T collect */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {t("notCollectTitle")}
              </h2>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  <span className="text-[#4A5058] dark:text-[#B8BCC2]">{t("notCollect1")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  <span className="text-[#4A5058] dark:text-[#B8BCC2]">{t("notCollect2")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  <span className="text-[#4A5058] dark:text-[#B8BCC2]">{t("notCollect3")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  <span className="text-[#4A5058] dark:text-[#B8BCC2]">{t("notCollect4")}</span>
                </li>
              </ul>
            </section>

            {/* What we collect */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {t("collectTitle")}
              </h2>
              <p className="text-[#4A5058] dark:text-[#B8BCC2] mb-6">
                {t("collectIntro")}
              </p>

              <h3 className="text-xl font-semibold mb-2">
                {t("anonymousIdTitle")}
              </h3>
              <p className="text-[#4A5058] dark:text-[#B8BCC2] mb-6">
                {t("anonymousIdDesc")}
              </p>

              <h3 className="text-xl font-semibold mb-2">
                {t("eventsTitle")}
              </h3>
              <p className="text-[#4A5058] dark:text-[#B8BCC2] mb-6">
                {t("eventsIntro")}
              </p>

              <h3 className="text-xl font-semibold mb-2">
                {t("metadataTitle")}
              </h3>
              <p className="text-[#4A5058] dark:text-[#B8BCC2] mb-6">
                {t("metadataDesc")}
              </p>
            </section>

            {/* Where data is sent */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {t("whereTitle")}
              </h2>
              <p className="text-[#4A5058] dark:text-[#B8BCC2]">
                {t("whereDesc")}
              </p>
            </section>

            {/* How to opt out */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {t("optOutTitle")}
              </h2>
              <p className="text-[#4A5058] dark:text-[#B8BCC2]">
                {t("optOutDesc")}
              </p>
            </section>

            {/* Data storage */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {t("storageTitle")}
              </h2>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#00ADB5]/100 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-[#4A5058] dark:text-[#B8BCC2]">{t("storage1")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00ADB5]/100 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-[#4A5058] dark:text-[#B8BCC2]">{t("storage2")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00ADB5]/100 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-[#4A5058] dark:text-[#B8BCC2]">{t("storage3")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00ADB5]/100 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-[#4A5058] dark:text-[#B8BCC2]">{t("storage4")}</span>
                </li>
              </ul>
            </section>

            {/* Open source */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {t("openSourceTitle")}
              </h2>
              <p className="text-[#4A5058] dark:text-[#B8BCC2]">
                {t("openSourceDesc")}
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {t("contactTitle")}
              </h2>
              <p className="text-[#4A5058] dark:text-[#B8BCC2]">
                {t("contactDesc")}
              </p>
            </section>
          </div>

          {/* Back to home */}
          <div className="mt-12 pt-8 border-t border-[#E0E0E0] dark:border-[#393E46]">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-[#00ADB5] dark:text-[#00ADB5] hover:underline"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to TokenCentric
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
