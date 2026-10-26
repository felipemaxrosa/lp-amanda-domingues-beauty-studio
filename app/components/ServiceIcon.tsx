import type { ReactNode } from "react";

export type ServiceIconName = "manicure" | "maquiagem" | "penteado" | "sobrancelhas";

// Família "Fine Line Gold" — viewBox 32×32, traço 1.75, currentColor, fill none.
const PATHS: Record<ServiceIconName, ReactNode> = {
  manicure: (
    <>
      <path d="M13.4 12V5.6a1.8 1.8 0 0 1 1.8-1.8h1.6a1.8 1.8 0 0 1 1.8 1.8V12" />
      <path d="M13.4 12h5.2" />
      <path d="M12.5 13h7c.8 0 1.5.7 1.5 1.5v8.5c0 2.2-1.8 4-4 4h-2c-2.2 0-4-1.8-4-4V14.5c0-.8.7-1.5 1.5-1.5z" />
    </>
  ),
  maquiagem: (
    <>
      <path d="M6.8 25.2 15 16.4" />
      <path d="M13.6 15 16.8 18.2" />
      <path d="M24.2 7.8C20.4 9 17.3 11.6 15.6 15.4c-.5 1.1.4 2.1 1.5 1.6C20.9 15.2 23.4 12 24.2 7.8Z" />
    </>
  ),
  penteado: (
    <>
      <circle cx="16" cy="17" r="6.6" />
      <circle cx="16" cy="6.6" r="2.5" />
      <path d="M13.7 8.6c1.4 1 3.2 1 4.6 0" />
    </>
  ),
  sobrancelhas: (
    <>
      <path d="M6.5 12C11 8.5 21 8.5 25.5 12 21 10.2 11 10.2 6.5 12Z" />
      <path d="M7 18.6C11 15.6 21 15.6 25 18.6 21 21.6 11 21.6 7 18.6Z" />
      <circle cx="16" cy="18.6" r="2.1" />
      <path d="M9 21.4 8.2 23.1M13 22.1 12.6 24M19 22.1 19.4 24M23 21.4 23.8 23.1" />
    </>
  ),
};

export function ServiceIcon({
  name,
  size = 32,
  className,
  title,
}: {
  name: ServiceIconName;
  size?: number;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      {PATHS[name]}
    </svg>
  );
}
