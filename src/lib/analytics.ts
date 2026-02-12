declare global {
  interface Window {
    umami?: {
      track: (eventName: string, properties?: Record<string, unknown>) => void;
    };
  }
}

// Track custom events via Umami
export function trackEvent(
  eventName: string,
  properties?: Record<string, unknown>
) {
  if (typeof window !== "undefined" && window.umami) {
    window.umami.track(eventName, properties);
  }
}

// TokenCentric site-specific events
export const ANALYTICS_EVENTS = {
  // Downloads
  DOWNLOAD_CLICKED: "download_clicked",
  GITHUB_CLICKED: "github_clicked",

  // Support
  PIX_COPIED: "pix_copied",

  // Language
  LANGUAGE_CHANGED: "language_changed",

  // Content
  BLOG_POST_READ: "blog_post_read",
  FEATURE_SECTION_VIEWED: "feature_section_viewed",
  OUTBOUND_LINK: "outbound_link",
} as const;
