import type { ReactNode } from "react";
import type { BadgeColor, Size, Rounded } from "@/utils/types";

interface BadgeProps {
  children: ReactNode;
  color?: BadgeColor;
  size?: Size;
  rounded?: Rounded;
  dot?: boolean;
  className?: string;
}

const PALETTES: Record<BadgeColor, { bg: string; text: string; dot: string; ring: string }> = {
  slate:   { bg: "bg-slate-100",   text: "text-slate-800",   dot: "bg-slate-500",   ring: "ring-slate-500/10" },
  gray:    { bg: "bg-gray-100",    text: "text-gray-800",    dot: "bg-gray-500",    ring: "ring-gray-500/10" },
  zinc:    { bg: "bg-zinc-100",    text: "text-zinc-800",    dot: "bg-zinc-500",    ring: "ring-zinc-500/10" },
  neutral: { bg: "bg-neutral-100", text: "text-neutral-800", dot: "bg-neutral-500", ring: "ring-neutral-500/10" },
  stone:   { bg: "bg-stone-100",   text: "text-stone-800",   dot: "bg-stone-500",   ring: "ring-stone-500/10" },
  red:     { bg: "bg-red-100",     text: "text-red-800",     dot: "bg-red-500",     ring: "ring-red-500/10" },
  orange:  { bg: "bg-orange-100",  text: "text-orange-800",  dot: "bg-orange-500",  ring: "ring-orange-500/10" },
  amber:   { bg: "bg-amber-100",   text: "text-amber-800",   dot: "bg-amber-500",   ring: "ring-amber-500/10" },
  yellow:  { bg: "bg-yellow-100",  text: "text-yellow-800",  dot: "bg-yellow-500",  ring: "ring-yellow-500/10" },
  lime:    { bg: "bg-lime-100",    text: "text-lime-800",    dot: "bg-lime-500",    ring: "ring-lime-500/10" },
  green:   { bg: "bg-green-100",   text: "text-green-800",   dot: "bg-green-500",   ring: "ring-green-500/10" },
  emerald: { bg: "bg-emerald-100", text: "text-emerald-800", dot: "bg-emerald-500", ring: "ring-emerald-500/10" },
  teal:    { bg: "bg-teal-100",    text: "text-teal-800",    dot: "bg-teal-500",    ring: "ring-teal-500/10" },
  cyan:    { bg: "bg-cyan-100",    text: "text-cyan-800",    dot: "bg-cyan-500",    ring: "ring-cyan-500/10" },
  sky:     { bg: "bg-sky-100",     text: "text-sky-800",     dot: "bg-sky-500",     ring: "ring-sky-500/10" },
  blue:    { bg: "bg-blue-100",    text: "text-blue-800",    dot: "bg-blue-500",    ring: "ring-blue-500/10" },
  indigo:  { bg: "bg-indigo-100",  text: "text-indigo-800",  dot: "bg-indigo-500",  ring: "ring-indigo-500/10" },
  violet:  { bg: "bg-violet-100",  text: "text-violet-800",  dot: "bg-violet-500",  ring: "ring-violet-500/10" },
  purple:  { bg: "bg-purple-100",  text: "text-purple-800",  dot: "bg-purple-500",  ring: "ring-purple-500/10" },
  fuchsia: { bg: "bg-fuchsia-100", text: "text-fuchsia-800", dot: "bg-fuchsia-500", ring: "ring-fuchsia-500/10" },
  pink:    { bg: "bg-pink-100",    text: "text-pink-800",    dot: "bg-pink-500",    ring: "ring-pink-500/10" },
  rose:    { bg: "bg-rose-100",    text: "text-rose-800",    dot: "bg-rose-500",    ring: "ring-rose-500/10" },
  brown:   { bg: "bg-amber-100",   text: "text-amber-900",   dot: "bg-amber-700",   ring: "ring-amber-900/10" }, 
};

const SIZES: Record<Size, string> = {
  xs: "text-[10px] px-1.5 py-0.5",
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-2.5 py-0.5",
  lg: "text-base px-3 py-1",
  xl: "text-lg px-3.5 py-1",
};

const ROUNDED: Record<Rounded, string> = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

export default function Badge({
  children,
  color = "blue",
  size = "sm",
  rounded = "full",
  dot = false,
  className = "",
}: BadgeProps) {
  const c = PALETTES[color] || PALETTES.gray;
  const s = SIZES[size];
  const r = ROUNDED[rounded];

  return (
    <span
      className={`inline-flex items-center font-medium ring-1 ring-inset ${c.bg} ${c.text} ${c.ring} ${s} ${r} ${className}`}
    >
      {dot && (
        <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${c.dot}`} aria-hidden="true" />
      )}
      {children}
    </span>
  );
}