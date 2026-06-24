"use client";
import type { ReactNode } from "react";
import type { Variant, Size, Rounded } from "@/utils/types";
import Spinner from "@/components/atoms/Spinner";

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  rounded?: Rounded;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconRight?: ReactNode;
  className?: string;
}

const VARIANTS: Record<Variant, string> = {
  primary:   "bg-blue-700 text-white hover:bg-blue-800 active:bg-blue-900 shadow-sm hover:shadow focus-visible:ring-blue-500",
  secondary: "bg-blue-100 text-blue-800 hover:bg-blue-200 active:bg-blue-300 focus-visible:ring-blue-400",
  outline:   "border-2 border-blue-700 text-blue-700 bg-transparent hover:bg-blue-50 active:bg-blue-100 focus-visible:ring-blue-500",
  ghost:     "text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus-visible:ring-gray-400",
  danger:    "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm focus-visible:ring-red-500",
  success:   "bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 shadow-sm focus-visible:ring-emerald-500",
  white:     "bg-white text-blue-900 hover:bg-gray-50 active:bg-gray-100 shadow focus-visible:ring-blue-400",
};

const SIZES: Record<Size, string> = {
  xs: "px-3 py-1.5 text-xs gap-1.5",
  sm: "px-4 py-2   text-sm gap-2",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-7 py-3   text-base gap-2.5",
  xl: "px-9 py-4   text-lg gap-3",
};

const ROUNDEDS: Record<Rounded, string> = {
  sm:   "rounded",
  md:   "rounded-lg",
  lg:   "rounded-xl",
  xl:   "rounded-2xl",
  full: "rounded-full",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center font-semibold transition-all duration-150 " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
  "disabled:opacity-50 disabled:cursor-not-allowed select-none";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  rounded = "xl",
  href = "",
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  fullWidth = false,
  icon = null,
  iconRight = null,
  className = "",
}: ButtonProps) => {
  const cls = [
    BASE_CLASSES,
    VARIANTS[variant],
    SIZES[size],
    ROUNDEDS[rounded],
    fullWidth ? "w-full" : "",
    className,
  ].join(" ");

  const content = (
    <>
      {loading
        ? <Spinner size="sm" />
        : icon
        ? <span className="shrink-0">{icon}</span>
        : null}
      <span>{children}</span>
      {!loading && iconRight && <span className="shrink-0">{iconRight}</span>}
    </>
  );

  if (href && !disabled && !loading) {
    return <a href={href} className={cls}>{content}</a>;
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled || loading} className={cls}>
      {content}
    </button>
  );
};

export default Button;