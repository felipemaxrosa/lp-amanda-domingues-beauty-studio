import Image from "next/image";
import type { IconName, Tone } from "@/lib/types";

type IconDef = { stroke: boolean; el: React.ReactNode };

const ICONS: Record<string, IconDef> = {
  nail: { stroke: true, el: <path d="M8 21h8M9 21V9a3 3 0 0 1 6 0v12M9 9c0-3 1-6 3-6s3 3 3 6" /> },
  makeup: {
    stroke: true,
    el: (
      <>
        <path d="M4 20l6-6M14 10l5-5a2 2 0 0 0-3-3l-5 5M10 14l-1 1 1 1 1-1M11 7l6 6" />
        <path d="M8 16c-2 2-3 2-4 4 2-1 2-2 4-4z" />
      </>
    ),
  },
  hair: { stroke: true, el: <path d="M6 20c-1-5 0-11 6-13 5-1 7 3 5 6-2 2-5 1-5 1M12 20c3 0 6-1 6-4" /> },
  brow: {
    stroke: true,
    el: <path d="M3 13c3-4 11-5 18-2M6 11.4l-1-2M10 10.2l-.6-2.1M14 10.3l.4-2M18 11.6l1-1.8" />,
  },
  star: { stroke: false, el: <path d="M12 2l2.9 6.3 6.8.7-5 4.6 1.4 6.7L12 17.8 5.9 20.9 7.3 14.2l-5-4.6 6.8-.7z" /> },
  wa: {
    stroke: true,
    el: (
      <>
        <path d="M3 21l1.7-5A8 8 0 1 1 8 19.3z" />
        <path d="M8.5 9c.2 2.5 4 6.3 6.5 6.5.8.06 1.7-.8 2-1.5l-2-1.3-1.2 1a7 7 0 0 1-3.3-3.3l1-1.2L10.2 7C9.5 7.3 8.6 8.2 8.5 9z" />
      </>
    ),
  },
  pin: {
    stroke: true,
    el: (
      <>
        <path d="M12 21s-6-5.3-6-10a6 6 0 1 1 12 0c0 4.7-6 10-6 10z" />
        <circle cx="12" cy="11" r="2" />
      </>
    ),
  },
  clock: { stroke: true, el: (<><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>) },
  ig: {
    stroke: true,
    el: (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
      </>
    ),
  },
  cal: { stroke: true, el: (<><rect x="3.5" y="5" width="17" height="16" rx="2" /><path d="M3.5 9h17M8 3v4M16 3v4" /></>) },
  quote: { stroke: false, el: <path d="M10 7c-3 1-5 3.5-5 7v3h5v-5H7c0-2 1-3.5 3-4zm9 0c-3 1-5 3.5-5 7v3h5v-5h-3c0-2 1-3.5 3-4z" /> },
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const def = ICONS[name] ?? ICONS.star;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill={def.stroke ? "none" : "currentColor"}
      stroke={def.stroke ? "currentColor" : "none"}
      strokeWidth={def.stroke ? 1.3 : undefined}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {def.el}
    </svg>
  );
}

export function Stars() {
  return (
    <span className="stars" aria-label="5 de 5 estrelas">
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} name="star" />
      ))}
    </span>
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export function BrandLockup({
  name,
  studio,
  small,
  onLight,
}: {
  name: string;
  studio: string;
  small?: boolean;
  onLight?: boolean;
}) {
  const cls = ["brand", small ? "sm" : "", onLight ? "brand--onlight" : ""].filter(Boolean).join(" ");
  return (
    <span className={cls} aria-label={`${name} ${studio}`}>
      <span className="mono">{initials(name)}</span>
      <span className="nm">{name}</span>
      {!small && (
        <span className="sub" aria-hidden="true">
          <i />
          <span>{studio}</span>
          <i />
        </span>
      )}
    </span>
  );
}

export function Figure({
  tone,
  icon,
  caption,
  tag,
  imageUrl,
  alt,
  className,
  sizes = "(max-width: 860px) 100vw, 50vw",
}: {
  tone: Tone;
  icon: IconName;
  caption?: string;
  tag?: string;
  imageUrl?: string;
  alt?: string;
  className?: string;
  sizes?: string;
}) {
  const cls = ["fig", `fig--${tone}`, className].filter(Boolean).join(" ");
  return (
    <div className={cls}>
      {imageUrl ? (
        <Image src={imageUrl} alt={alt || caption || ""} fill sizes={sizes} style={{ objectFit: "cover" }} />
      ) : (
        <>
          <Icon name={icon} className="fig-ic" />
          {caption && <span className="fig-cap">{caption}</span>}
          {tag && <span className="fig-tag">{tag}</span>}
        </>
      )}
    </div>
  );
}
