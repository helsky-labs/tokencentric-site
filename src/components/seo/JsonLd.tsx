export function JsonLd() {
  const baseUrl = "https://tokencentric.app";

  const softwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "TokenCentric",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "macOS 12+ or Windows 10+",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Desktop app for managing AI coding assistant context files. Scan projects, edit CLAUDE.md, .cursorrules, copilot-instructions, and more. Real-time token counting with official tokenizers. Free and open source.",
    softwareVersion: "0.1.0",
    downloadUrl: `${baseUrl}`,
    screenshot: `${baseUrl}/og-image.png`,
    author: {
      "@type": "Person",
      name: "Hel Rabelo",
      url: "https://github.com/helrabelo",
    },
    publisher: {
      "@type": "Person",
      name: "Hel Rabelo",
    },
    featureList: [
      "Multi-tool support: Claude Code, Cursor, GitHub Copilot, Windsurf, OpenAI",
      "Real-time token counting with official tokenizers",
      "Monaco editor with markdown preview",
      "7 built-in templates for common scenarios",
      "Hierarchy view showing file inheritance",
      "Dark mode with system detection",
      "Auto-updates via GitHub releases",
      "100% free and open source",
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "TokenCentric",
    url: baseUrl,
    description:
      "TokenCentric is a desktop app for managing AI coding assistant context files like CLAUDE.md, .cursorrules, and copilot-instructions.",
    publisher: {
      "@type": "Person",
      name: "Hel Rabelo",
    },
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TokenCentric",
    url: baseUrl,
    logo: `${baseUrl}/icon.png`,
    sameAs: ["https://github.com/helsky-labs/tokencentric"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
    </>
  );
}
