"use client";

import { useEffect } from "react";
import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics";

interface BlogPostTrackerProps {
  slug: string;
  title: string;
}

export function BlogPostTracker({ slug, title }: BlogPostTrackerProps) {
  useEffect(() => {
    trackEvent(ANALYTICS_EVENTS.BLOG_POST_READ, { slug, title });
  }, [slug, title]);

  return null;
}
