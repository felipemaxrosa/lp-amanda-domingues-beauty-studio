"use client";

import type { ComponentPropsWithoutRef, MouseEvent } from "react";
import { trackEvent, type GaEvent } from "@/lib/analytics";

type Props = ComponentPropsWithoutRef<"a"> & {
  event: GaEvent;
  eventParams?: Record<string, unknown>;
};

/** `<a>` que dispara um evento GA4 (via trackEvent) ao ser clicado. */
export function TrackedLink({ event, eventParams, onClick, children, ...rest }: Props) {
  return (
    <a
      {...rest}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        trackEvent(event, eventParams);
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
