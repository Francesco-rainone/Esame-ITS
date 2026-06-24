import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/atoms/Icon";
import type { BadgeColor, CardCtaColor, MetaItem } from "@/utils/types";
import type { IconName } from "@/utils/icons";
import type { StaticImageData } from "next/dist/shared/lib/image-external";

interface CardProps {
  title: string;
  subtitle?: string;
  description?: string;
  image?: StaticImageData | string;
  badge?: string;
  badgeColor?: BadgeColor;
  ctaLabel?: string;
  ctaHref?: string;
  ctaColor?: CardCtaColor;
  meta?: MetaItem[];
  tags?: string[];
  className?: string;
}

const BADGE_COLORS: Record<BadgeColor, string> = {
  slate:   "bg-slate-500 text-white",
  gray:    "bg-gray-500 text-white",
  zinc:    "bg-zinc-500 text-white",
  neutral: "bg-neutral-500 text-white",
  stone:   "bg-stone-500 text-white",
  red:     "bg-red-500 text-white",
  orange:  "bg-orange-500 text-white",
  amber:   "bg-amber-500 text-white",
  yellow:  "bg-yellow-500 text-black",
  lime:    "bg-lime-500 text-black",
  green:   "bg-green-500 text-white",
  emerald: "bg-emerald-500 text-white",
  teal:    "bg-teal-500 text-white",
  cyan:    "bg-cyan-500 text-white",
  sky:     "bg-sky-500 text-white",
  blue:    "bg-blue-500 text-white",
  indigo:  "bg-indigo-500 text-white",
  violet:  "bg-violet-500 text-white",
  purple:  "bg-purple-500 text-white",
  fuchsia: "bg-fuchsia-500 text-white",
  pink:    "bg-pink-500 text-white",
  rose:    "bg-rose-500 text-white",
  brown:   "bg-amber-700 text-white",
};

const CTA_COLORS: Record<CardCtaColor, string> = {
  slate:   "bg-slate-600 hover:bg-slate-700",
  gray:    "bg-gray-600 hover:bg-gray-700",
  zinc:    "bg-zinc-600 hover:bg-zinc-700",
  neutral: "bg-neutral-600 hover:bg-neutral-700",
  stone:   "bg-stone-600 hover:bg-stone-700",
  red:     "bg-red-600 hover:bg-red-700",
  orange:  "bg-orange-600 hover:bg-orange-700",
  amber:   "bg-amber-500 hover:bg-amber-600",
  yellow:  "bg-yellow-500 hover:bg-yellow-600",
  lime:    "bg-lime-500 hover:bg-lime-600",
  green:   "bg-green-600 hover:bg-green-700",
  emerald: "bg-emerald-600 hover:bg-emerald-700",
  teal:    "bg-teal-600 hover:bg-teal-700",
  cyan:    "bg-cyan-600 hover:bg-cyan-700",
  sky:     "bg-sky-500 hover:bg-sky-600",
  blue:    "bg-blue-600 hover:bg-blue-700",
  indigo:  "bg-indigo-600 hover:bg-indigo-700",
  violet:  "bg-violet-600 hover:bg-violet-700",
  purple:  "bg-purple-600 hover:bg-purple-700",
  fuchsia: "bg-fuchsia-600 hover:bg-fuchsia-700",
  pink:    "bg-pink-600 hover:bg-pink-700",
  rose:    "bg-rose-600 hover:bg-rose-700",
  brown:   "bg-amber-700 hover:bg-amber-800",
};

const Card = ({
  title,
  subtitle,
  description,
  image: imgSrc,
  badge,
  badgeColor = "gray",
  ctaLabel,
  ctaHref,
  ctaColor = "blue",
  meta,
  tags,
  className = "",
}: CardProps) => {
  const badgeClass = BADGE_COLORS[badgeColor] || BADGE_COLORS.gray;
  const ctaClass = CTA_COLORS[ctaColor] || CTA_COLORS.blue;

  return (
    <div
      className={`h-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col ${className}`}
    >
      {/* Immagine di copertina */}
      {imgSrc && (
        <div className="relative h-48 w-full shrink-0">
          <Image
            src={imgSrc}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Badge */}
        {badge && (
          <span
            className={`inline-block w-fit px-3 py-1 text-xs font-semibold rounded-full ${badgeClass}`}
          >
            {badge}
          </span>
        )}

        {/* Titolo e sottotitolo */}
        <div>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>

        {/* Descrizione */}
        {description && (
          <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
        )}

        {/* Meta (location, età, ecc.) */}
        {meta && meta.length > 0 && (
          <div className="flex flex-wrap gap-3 text-xs text-gray-500 mt-1">
            {meta.map((m, i) => (
              <span key={i} className="flex items-center gap-1">
                <Icon name={m.icon as IconName} size="sm" />
                {m.text}
              </span>
            ))}
          </div>
        )}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA Button – spinto in fondo */}
        {ctaLabel && (
          <Link
            href={ctaHref || "#"}
            className={`mt-auto w-full py-2.5 rounded-xl text-white font-semibold text-sm transition-colors text-center inline-block ${ctaClass}`}
          >
            {ctaLabel}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Card;