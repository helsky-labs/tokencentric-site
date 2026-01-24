"use client";

import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics";

interface GitHubButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  location: "nav" | "cta" | "footer";
}

export function GitHubButton({
  href,
  children,
  className,
  location,
}: GitHubButtonProps) {
  const handleClick = () => {
    trackEvent(ANALYTICS_EVENTS.GITHUB_CLICKED, {
      location,
    });
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
