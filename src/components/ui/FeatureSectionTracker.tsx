"use client";

import { useEffect, useRef } from "react";
import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics";

export function FeatureSectionTracker() {
  const tracked = useRef(false);

  useEffect(() => {
    const section = document.getElementById("features");
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked.current) {
          tracked.current = true;
          trackEvent(ANALYTICS_EVENTS.FEATURE_SECTION_VIEWED);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return null;
}
