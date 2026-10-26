import Image from "next/image";
import type { IconName, Tone } from "@/lib/types";

type IconDef = { stroke: boolean; el: React.ReactNode };

const ICONS: Record<string, IconDef> = {
  nail: {
    stroke: true,
    el: (
      <>
        <path d="M9 21.3h6" />
        <path d="M9.3 21V10.6c0-1.6 1.2-2.7 2.7-2.7s2.7 1.1 2.7 2.7V21" />
        <path d="M9.5 10.7c.05-3 1.1-5.2 2.5-5.2s2.45 2.2 2.5 5.2" />
        <path d="M9.7 11.2h4.6" />
      </>
    ),
  },
  makeup: {
    stroke: true,
    el: (
      <>
        <path d="M4.6 19.4 11.4 12.6" />
        <path d="M10.4 11.6 12.4 13.6" />
        <path d="M11.7 11c1.4-1.7 3.4-3.2 5-3.4.2 1.6-1.3 3.6-3.4 5-.9.6-2 .4-2.6-.3-.6-.6-.7-1.6 0-2.3z" />
      </>
    ),
  },
  hair: {
    stroke: true,
    el: (
      <>
        <circle cx="12.6" cy="7" r="2.7" />
        <path d="M10.1 8.4C6.9 9.8 5.3 12.3 5.3 15.4c0 1.7.5 3.1 1.5 4.2.5-1.1.6-2.2.3-3.3" />
        <path d="M15.1 8.6c1.9 1.2 3.1 3.3 3.1 5.9 0 1.5-.4 2.7-1.2 3.6-.4-.9-.5-1.8-.3-2.7" />
      </>
    ),
  },
  brow: {
    stroke: true,
    el: (
      <>
        <path d="M4.5 10.2c3-2.2 12-2.2 15 0" />
        <path d="M6.2 9.1 5.6 7.5M9.1 8.2 8.8 6.5M12 8V6.3M14.9 8.2l.3-1.7M17.8 9.1l.6-1.6" />
        <path d="M5.6 15c2.3-2.7 11-2.7 13.3 0 -2.3 2.5-11 2.5-13.3 0z" />
        <circle cx="12.2" cy="15" r="1.7" />
      </>
    ),
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
  imageUrl,
}: {
  name: string;
  studio: string;
  small?: boolean;
  onLight?: boolean;
  imageUrl?: string | null;
}) {
  if (imageUrl) {
    const imgCls = ["brand-img", small ? "brand-img--sm" : ""].filter(Boolean).join(" ");
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={imageUrl} alt={`${name} ${studio}`} className={imgCls} />;
  }
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
  priority = false,
}: {
  tone: Tone;
  icon: IconName;
  caption?: string;
  tag?: string;
  imageUrl?: string;
  alt?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const cls = ["fig", `fig--${tone}`, className].filter(Boolean).join(" ");
  return (
    <div className={cls}>
      {imageUrl ? (
        <Image src={imageUrl} alt={alt || caption || ""} fill sizes={sizes} priority={priority} className="object-cover" />
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
