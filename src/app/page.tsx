import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { FadeIn } from "@/components/ui/FadeIn";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { DownloadButton } from "@/components/ui/DownloadButton";
import { GitHubButton } from "@/components/ui/GitHubButton";
import { Logo } from "@/components/ui/Logo";

const GITHUB_URL = "https://github.com/helrabelo/tokencentric";

// Fetch latest release info from GitHub API
async function getLatestRelease() {
  try {
    const res = await fetch(
      "https://api.github.com/repos/helrabelo/tokencentric/releases/latest",
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "tokencentric-site",
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!res.ok) throw new Error("GitHub API error");

    const data = await res.json();
    const dmgAsset = data.assets?.find((a: { name: string }) =>
      a.name.endsWith(".dmg")
    );

    return {
      version: data.tag_name?.replace(/^v/, "") || "0.1.0",
      downloadUrl:
        dmgAsset?.browser_download_url ||
        "https://github.com/helrabelo/tokencentric/releases/latest",
    };
  } catch {
    // Fallback to latest known version
    return {
      version: "0.1.0",
      downloadUrl: "https://github.com/helrabelo/tokencentric/releases/latest",
    };
  }
}

function FeatureIcon({ icon }: { icon: string }) {
  const iconClasses = "w-6 h-6";

  switch (icon) {
    case "tools":
      return (
        <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      );
    case "token":
      return (
        <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
        </svg>
      );
    case "hierarchy":
      return (
        <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      );
    case "editor":
      return (
        <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      );
    case "template":
      return (
        <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case "moon":
      return (
        <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      );
    case "refresh":
      return (
        <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      );
    case "gift":
      return (
        <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      );
    default:
      return null;
  }
}

function ToolIcon({ tool }: { tool: string }) {
  const colors: Record<string, string> = {
    claude: "bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400",
    cursor: "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400",
    copilot: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
    windsurf: "bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400",
    openai: "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400",
  };

  const icons: Record<string, string> = {
    claude: "C",
    cursor: "Cu",
    copilot: "GH",
    windsurf: "W",
    openai: "AI",
  };

  return (
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors[tool]}`}>
      <span className="text-sm font-bold">{icons[tool]}</span>
    </div>
  );
}

export default async function LandingPage() {
  const t = await getTranslations();
  const release = await getLatestRelease();
  const DOWNLOAD_URL = release.downloadUrl;
  const VERSION = release.version;

  const features = [
    { icon: "tools", key: "multiTool", popular: true, isNew: false },
    { icon: "token", key: "tokenCounting", popular: true, isNew: false },
    { icon: "hierarchy", key: "hierarchy", popular: false, isNew: true },
    { icon: "editor", key: "editor", popular: false, isNew: false },
    { icon: "template", key: "templates", popular: false, isNew: false },
    { icon: "moon", key: "darkMode", popular: false, isNew: false },
    { icon: "refresh", key: "autoUpdate", popular: false, isNew: false },
    { icon: "gift", key: "free", popular: true, isNew: false },
  ];

  const tools = ["claude", "cursor", "copilot", "windsurf", "openai"];

  const steps = [
    { number: 1, key: "scan" },
    { number: 2, key: "edit" },
    { number: 3, key: "manage" },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-50/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Logo width={32} height={32} />
              <span className="font-semibold text-lg">TokenCentric</span>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <ThemeToggle />
              <GitHubButton
                href={GITHUB_URL}
                location="nav"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </GitHubButton>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              {t("hero.badge")}
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              {t("hero.title")}{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                {t("hero.titleHighlight")}
              </span>
              {t("hero.titleEnd")}
            </h1>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
              {t("hero.description")}
            </p>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <DownloadButton
                href={DOWNLOAD_URL}
                version={VERSION}
                location="hero"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-lg transition-all hover:scale-105 shadow-lg shadow-emerald-500/25"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {t("hero.downloadButton")}
              </DownloadButton>
              <a
                href="#features"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 font-medium transition-colors"
              >
                {t("hero.featuresButton")}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={400}>
            <p className="mt-6 text-sm text-slate-500 dark:text-slate-500">
              {t("hero.requirements")}
            </p>
          </FadeIn>
        </div>

        {/* App Preview */}
        <FadeIn delay={500} className="mt-16 max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-2 text-sm text-slate-500">{t("preview.menuBar")}</span>
            </div>
            <div className="flex gap-4 bg-white dark:bg-slate-900 rounded-lg overflow-hidden">
              {/* Sidebar */}
              <div className="w-64 border-r border-slate-200 dark:border-slate-700 p-4">
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-3">
                  {t("preview.globalConfig")}
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 mb-4">
                  <span className="text-sm">~/.claude/CLAUDE.md</span>
                  <span className="ml-auto text-xs font-mono">1.2k</span>
                </div>
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-3">
                  {t("preview.projectFiles")}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">
                    <span className="w-5 h-5 rounded bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 text-xs flex items-center justify-center font-bold">C</span>
                    <span className="text-sm">CLAUDE.md</span>
                    <span className="ml-auto text-xs font-mono text-green-600">2.8k</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
                    <span className="w-5 h-5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-xs flex items-center justify-center font-bold">Cu</span>
                    <span className="text-sm">.cursorrules</span>
                    <span className="ml-auto text-xs font-mono text-yellow-600">8.4k</span>
                  </div>
                </div>
              </div>
              {/* Editor */}
              <div className="flex-1 p-4">
                <div className="text-sm font-mono text-slate-600 dark:text-slate-400 space-y-1">
                  <div><span className="text-blue-600 dark:text-blue-400"># Project Instructions</span></div>
                  <div className="text-slate-400">...</div>
                  <div><span className="text-purple-600 dark:text-purple-400">## Tech Stack</span></div>
                  <div>- React + TypeScript</div>
                  <div>- Tailwind CSS</div>
                  <div className="text-slate-400">...</div>
                </div>
              </div>
            </div>
            {/* Status bar */}
            <div className="mt-2 flex items-center gap-4 text-xs text-slate-500 px-2">
              <span>Cursor</span>
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <span>This file: 8,421</span>
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <span>Total: 11,247</span>
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <span className="text-green-600 dark:text-green-400">Fits all models</span>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Tools Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-2xl font-bold text-center mb-8">
              {t("tools.title")}
            </h2>
          </FadeIn>
          <div className="flex flex-wrap justify-center gap-8">
            {tools.map((tool, index) => (
              <FadeIn key={tool} delay={index * 50}>
                <div className="flex flex-col items-center gap-2">
                  <ToolIcon tool={tool} />
                  <span className="text-sm font-medium">{t(`tools.items.${tool}.name`)}</span>
                  <span className="text-xs text-slate-500 font-mono">{t(`tools.items.${tool}.pattern`)}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
              {t("features.title")}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-center mb-12 max-w-2xl mx-auto">
              {t("features.description")}
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FadeIn key={feature.key} delay={index * 100}>
                <div
                  className={`relative p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border transition-all hover:shadow-lg hover:scale-[1.02] ${
                    feature.isNew
                      ? "border-emerald-200 dark:border-emerald-800"
                      : feature.popular
                      ? "border-amber-200 dark:border-amber-800"
                      : "border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {feature.isNew ? (
                    <span className="absolute -top-3 right-4 px-3 py-1 text-xs font-medium bg-emerald-600 text-white rounded-full">
                      {t("features.new")}
                    </span>
                  ) : feature.popular ? (
                    <span className="absolute -top-3 right-4 px-3 py-1 text-xs font-medium bg-amber-600 text-white rounded-full">
                      {t("features.popular")}
                    </span>
                  ) : null}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    feature.isNew
                      ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                  }`}>
                    <FeatureIcon icon={feature.icon} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{t(`features.items.${feature.key}.title`)}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    {t(`features.items.${feature.key}.description`)}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800/30">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
              {t("howItWorks.title")}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-center mb-12">
              {t("howItWorks.description")}
            </p>
          </FadeIn>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <FadeIn key={step.number} delay={index * 150}>
                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-600 text-white font-bold text-xl flex items-center justify-center">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">{t(`howItWorks.steps.${step.key}.title`)}</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      {t(`howItWorks.steps.${step.key}.description`)}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {t("cta.title")}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              {t("cta.description")}
            </p>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <DownloadButton
                href={DOWNLOAD_URL}
                version={VERSION}
                location="cta"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-lg transition-all hover:scale-105 shadow-lg shadow-emerald-500/25"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {t("cta.downloadButton")}
              </DownloadButton>
              <GitHubButton
                href={GITHUB_URL}
                location="cta"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 font-medium transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                {t("cta.githubButton")}
              </GitHubButton>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="mt-6 text-sm text-slate-500">
              v{VERSION} • {t("cta.version")}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-100 dark:bg-slate-800/30">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <div className="text-4xl mb-4">☕</div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              {t("support.title")}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              {t("support.description")}
            </p>
            <a
              href={t("support.coffeeUrl")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold transition-all hover:scale-105"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.9 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z"/>
              </svg>
              {t("support.coffee")}
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo width={24} height={24} />
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {t("footer.builtBy")}{" "}
              <a
                href="https://github.com/helrabelo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                Hel Rabelo
              </a>
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <GitHubButton
              href={GITHUB_URL}
              location="footer"
              className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
            >
              {t("nav.github")}
            </GitHubButton>
            <a
              href={`${GITHUB_URL}/releases`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
            >
              {t("footer.releases")}
            </a>
            <a
              href={`${GITHUB_URL}/issues`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
            >
              {t("footer.issues")}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
