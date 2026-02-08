"use client";

import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics";

interface DownloadButtonProps {
  href: string;
  version: string;
  children: React.ReactNode;
  className?: string;
  location: "hero" | "cta" | "how-it-works";
  platform?: "mac" | "windows";
}

export function DownloadButton({
  href,
  version,
  children,
  className,
  location,
  platform,
}: DownloadButtonProps) {
  const handleClick = () => {
    trackEvent(ANALYTICS_EVENTS.DOWNLOAD_CLICKED, {
      version,
      location,
      platform,
      download_url: href,
    });
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
