import posthog from "posthog-js";

// Track custom events
export function trackEvent(
  eventName: string,
  properties?: Record<string, unknown>
) {
  if (typeof window !== "undefined") {
    posthog.capture(eventName, properties);
  }
}

// DropVox site-specific events
export const ANALYTICS_EVENTS = {
  // Landing page
  LANDING_VIEWED: "landing_viewed",
  FEATURE_SECTION_VIEWED: "feature_section_viewed",

  // Downloads
  DOWNLOAD_CLICKED: "download_clicked",
  DOWNLOAD_STARTED: "download_started",
  GITHUB_CLICKED: "github_clicked",

  // Documentation
  DOCS_VIEWED: "docs_viewed",
  FAQ_EXPANDED: "faq_expanded",

  // Social
  SOCIAL_LINK_CLICKED: "social_link_clicked",
  SHARE_CLICKED: "share_clicked",

  // Language
  LANGUAGE_CHANGED: "language_changed",
} as const;
