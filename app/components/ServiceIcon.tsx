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
      <path d="M16 4C20.4 4 23 7.4 23 11.6 23 15.8 20.4 19.2 16 19.2 11.6 19.2 9 15.8 9 11.6 9 7.4 11.6 4 16 4Z" />
      <path d="M14.6 19v5.2a1.4 1.4 0 0 0 2.8 0V19" />
      <circle cx="12.8" cy="10" r=".75" fill="currentColor" stroke="none" />
      <circle cx="16" cy="8.9" r=".75" fill="currentColor" stroke="none" />
      <circle cx="19.2" cy="10" r=".75" fill="currentColor" stroke="none" />
      <circle cx="14.4" cy="13" r=".75" fill="currentColor" stroke="none" />
      <circle cx="17.6" cy="13" r=".75" fill="currentColor" stroke="none" />
    </>
  ),
  sobrancelhas: (
    <>
      <path d="M6.5 11.2C11 8.2 21 8.2 25.5 11.2 21 9.4 11 9.4 6.5 11.2Z" />
      <path d="M7 19C11 15.8 21 15.8 25 19 21 22.2 11 22.2 7 19Z" />
      <circle cx="16" cy="18.9" r="2.1" />
      <path d="M10 16 8.9 13.9M13.4 15.1 12.9 13M18.6 15.1 19.1 13M22 16 23.1 13.9" />
    </>
  ),
};

export function ServiceIcon({
  name,
  size = 32,
  className,
  title,
  strokeWidth = 1.4,
}: {
  name: ServiceIconName;
  size?: number;
  className?: string;
  title?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
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
