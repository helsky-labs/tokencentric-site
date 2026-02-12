"use client";

import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics";

interface OutboundLinkProps {
  href: string;
  location: string;
  children: React.ReactNode;
  className?: string;
}

export function OutboundLink({ href, location, children, className }: OutboundLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent(ANALYTICS_EVENTS.OUTBOUND_LINK, { href, location })}
      className={className}
    >
      {children}
    </a>
  );
}
