"use client";
import type { ReactNode } from "react";
import type { BadgeColor } from "@/utils/types";
import type { IconName } from "@/utils/icons";
import Icon from "@/components/atoms/Icon";
import { StaticImageData } from "next/dist/shared/lib/image-external";

interface SectionWrapperProps {
  id?: string;
  title?: string;
  subtitle?: string;
  titleAlign?: "left" | "center";
  /** Qualsiasi classe Tailwind bg-* — es. "bg-gray-50", "bg-emerald-900" */
  bg?: string | StaticImageData; // mantenuto per compatibilità, anche se StaticImageData è inusuale per bg
  maxW?: string;
  py?: string;
  px?: string;
  children: ReactNode;
  badge?: string;
  badgeIcon?: IconName;
  badgeColor?: BadgeColor;
  divider?: boolean;
}


const BADGE_COLORS: Record<BadgeColor, string> = {
  slate:   "bg-slate-100   text-slate-700   border-slate-200",
  gray:    "bg-gray-100    text-gray-600    border-gray-200",
  zinc:    "bg-zinc-100    text-zinc-600    border-zinc-200",
  neutral: "bg-neutral-100 text-neutral-700 border-neutral-200",
  stone:   "bg-stone-100   text-stone-700   border-stone-200",
  red:     "bg-red-100     text-red-800     border-red-200",
  orange:  "bg-orange-100  text-orange-700  border-orange-200",
  amber:   "bg-amber-100   text-amber-800   border-amber-200",
  yellow:  "bg-yellow-100  text-yellow-800  border-yellow-200",
  lime:    "bg-lime-100    text-lime-800    border-lime-200",
  green:   "bg-emerald-100 text-emerald-700 border-emerald-200",
  emerald: "bg-emerald-100 text-emerald-800 border-emerald-200",
  teal:    "bg-teal-100    text-teal-700    border-teal-200",
  cyan:    "bg-cyan-100    text-cyan-800    border-cyan-200",
  sky:     "bg-sky-100     text-sky-800     border-sky-200",
  blue:    "bg-blue-100    text-blue-700    border-blue-200",
  indigo:  "bg-indigo-100  text-indigo-800  border-indigo-200",
  violet:  "bg-violet-100  text-violet-800  border-violet-200",
  purple:  "bg-purple-100  text-purple-800  border-purple-200",
  fuchsia: "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200",
  pink:    "bg-pink-100    text-pink-800    border-pink-200",
  rose:    "bg-rose-100    text-rose-800    border-rose-200",
  brown:   "bg-stone-100   text-stone-800   border-stone-200", 
};

const SectionWrapper = ({
  id = "",
  title = "",
  subtitle = "",
  titleAlign = "center",
  bg = "bg-white",
  maxW = "max-w-7xl",
  py = "py-16",
  px = "px-4 sm:px-6",
  children,
  badge = "",
  badgeIcon,
  badgeColor = "blue",
  divider = false,
}: SectionWrapperProps) => {
  const isCenter = titleAlign === "center";
  const badgeCls = BADGE_COLORS[badgeColor] ?? BADGE_COLORS.blue;

  return (
    <section id={id || undefined} className={`w-full ${typeof bg === "string" ? bg : "bg-white"} ${py}`}>
      {divider && <div className="w-full border-t border-gray-100 mb-0" />}

      <div className={`${maxW} mx-auto ${px}`}>
        {(badge || title || subtitle) && (
          <div className={`mb-10 ${isCenter ? "text-center" : "text-left"}`}>
            {badge && (
              <div className={`mb-3 ${isCenter ? "flex justify-center" : ""}`}>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${badgeCls}`}>
                  {badgeIcon && <Icon name={badgeIcon} size="sm" />}
                  {badge}
                </span>
              </div>
            )}
            {title && (
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={`mt-3 text-base text-gray-500 leading-relaxed ${isCenter ? "max-w-2xl mx-auto" : "max-w-xl"}`}>
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;