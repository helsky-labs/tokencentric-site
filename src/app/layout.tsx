import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { PostHogProvider } from "@/components/providers/PostHogProvider";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const BASE_URL = "https://tokencentric.app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "TokenCentric - The Dashboard for Your AI Coding Assistants",
    template: "%s | TokenCentric",
  },
  description:
    "Desktop app for managing AI coding assistant context files. Scan projects, edit CLAUDE.md, .cursorrules, copilot-instructions, and more. Real-time token counting with official tokenizers. Free and open source.",
  keywords: [
    "claude code",
    "cursor ai",
    "github copilot",
    "windsurf ai",
    "context files",
    "CLAUDE.md",
    "cursorrules",
    "copilot instructions",
    "token counting",
    "ai coding assistant",
    "developer tools",
    "context management",
    "ai context files",
    "code assistant",
    "prompt engineering",
    "anthropic claude",
    "openai",
  ],
  authors: [{ name: "Hel Rabelo", url: "https://github.com/helrabelo" }],
  creator: "Hel Rabelo",
  publisher: "Hel Rabelo",
  applicationName: "TokenCentric",
  category: "Developer Tools",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TokenCentric - The Dashboard for Your AI Coding Assistants",
    description:
      "See all your CLAUDE.md, .cursorrules, and copilot-instructions files in one place. Real-time token counting, built-in templates, and a beautiful editor. Free forever.",
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "TokenCentric",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TokenCentric - AI Context File Manager",
      },
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "TokenCentric Icon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TokenCentric - AI Context File Manager",
    description:
      "Desktop app for managing CLAUDE.md, .cursorrules, and other AI context files. Real-time token counting. Free and open source.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <JsonLd />
        {/* TODO: Add analytics ID when tokencentric site is registered in Umami */}
        {/* <Script
          defer
          src="https://analytics.helsky-labs.com/script.js"
          data-website-id="TOKENCENTRIC_WEBSITE_ID"
        /> */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100`}
      >
        <PostHogProvider>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider>{children}</ThemeProvider>
          </NextIntlClientProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
