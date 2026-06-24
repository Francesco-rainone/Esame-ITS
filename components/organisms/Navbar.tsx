"use client";
import { useState, useMemo, memo } from "react";
import Image from "next/image";
import clsx from "clsx";
import type { IconName } from "@/utils/icons";
import type { NavbarLink } from "@/utils/types"; 
import Icon from "@/components/atoms/Icon";
import { useEscapeClose } from "@/utils/hooks/useEscapeClose";
import { useNavbarTheme } from "@/utils/hooks/useNavbarTheme";

export interface NavbarProps {
  brand?: string;
  brandIcon?: IconName;
  brandHref?: string;
  logo?: string;
  links?: NavbarLink[];
  ctaLabel?: string;
  ctaHref?: string;
  loginLabel?: string;
  loginHref?: string;
  dark?: boolean;
  sticky?: boolean;
  transparent?: boolean;
  brandTextClass?: string;
  brandIconClass?: string;
  ctaClass?: string;
}

interface MobileMenuProps {
  open: boolean;
  links: NavbarLink[];
  loginLabel?: string;
  loginHref: string;
  ctaLabel?: string;
  ctaHref: string;
  mobileMenuBg: string;
  textClass: string;
  linkHover: string;
  ctaClass?: string;
  onClose: () => void;
}

const MobileMenu = memo(({
  open,
  links,
  loginLabel,
  loginHref,
  ctaLabel,
  ctaHref,
  mobileMenuBg,
  textClass,
  linkHover,
  ctaClass,
  onClose,
}: MobileMenuProps) => {
  const linkClasses = useMemo(
    () => clsx("py-2.5 px-3 rounded-lg text-sm font-medium transition-colors", textClass, linkHover),
    [textClass, linkHover]
  );

  useEscapeClose(open, onClose);

  return (
    <nav
      id="mobile-nav-menu"
      role="navigation"
      aria-label="Mobile navigation"
      {...(!open ? { "aria-hidden": "true" as const } : {})}
      className={clsx(
        "md:hidden border-t overflow-hidden transition-all",
        "duration-300",
        mobileMenuBg,
        open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      )}
    >
      <div className="px-4 py-3 flex flex-col gap-1">
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={onClose} className={linkClasses}>
            {l.label}
          </a>
        ))}
        {loginLabel && (
          <a href={loginHref} onClick={onClose} className={linkClasses}>
            {loginLabel}
          </a>
        )}
        {ctaLabel && (
          <a 
            href={ctaHref} 
            onClick={onClose} 
            className={clsx(
              "mt-2 py-3 rounded-xl text-sm font-semibold text-center transition-colors duration-150",
              ctaClass || "bg-blue-700 text-white hover:bg-blue-800"
            )}
          >
            {ctaLabel}
          </a>
        )}
      </div>
    </nav>
  );
});

MobileMenu.displayName = "MobileMenu";

interface HamburgerProps {
  open: boolean;
  isDark: boolean;
  onToggle: () => void;
}

const Hamburger = memo(({ open, isDark, onToggle }: HamburgerProps) => (
  <button
    className={clsx(
      "md:hidden p-2 rounded-lg transition",
      isDark ? "hover:bg-white/10" : "hover:bg-gray-100"
    )}
    onClick={onToggle}
    aria-label={open ? "Chiudi menu" : "Apri menu"}
    aria-expanded={String(open) as "true" | "false"}
    aria-controls="mobile-nav-menu"
  >
    <svg
      className={clsx("w-6 h-6", isDark ? "text-white" : "text-gray-700")}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {open
        ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
    </svg>
  </button>
));

Hamburger.displayName = "Hamburger";

export default function Navbar({
  brand = "MyApp",
  brandIcon,
  brandHref = "/",
  logo = "",
  links = [],
  ctaLabel = "",
  ctaHref = "#form",
  loginLabel = "Accedi come admin",
  loginHref = "/admin/login",
  dark = false,
  sticky = true,
  transparent = false,
  brandTextClass,
  brandIconClass,
  ctaClass,
}: NavbarProps) {
  const [open, setOpen] = useState(false);
  const { isDark, bgClass, textClass, linkHover, mobileMenuBg, loginBtnClasses } =
    useNavbarTheme(dark, transparent);

  return (
    <nav className={clsx("z-50 w-full border-b transition-all duration-300", bgClass, sticky && "sticky top-0")}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <a href={brandHref} className="flex items-center gap-2 shrink-0">
            {logo && <Image src={logo} alt={brand} width={32} height={32} className="h-8 w-auto" />}
            {brandIcon && !logo && (
              <Icon 
                name={brandIcon} 
                className={brandIconClass || (isDark ? "text-white" : "text-blue-600")} 
              />
            )}
            <span className={clsx(
              "text-xl font-extrabold tracking-tight", 
              brandTextClass || (isDark ? "text-white" : "text-blue-700")
            )}>
              {brand}
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={clsx(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150",
                  textClass,
                  linkHover
                )}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {loginLabel && (
              <a href={loginHref} className={clsx("px-5 py-2 rounded-xl text-sm font-semibold transition-colors duration-150", loginBtnClasses)}>
                {loginLabel}
              </a>
            )}
            {ctaLabel && (
              <a 
                href={ctaHref} 
                className={clsx(
                  "px-5 py-2 rounded-xl text-sm font-semibold transition-colors duration-150 shadow-sm",
                  ctaClass || "bg-blue-700 text-white hover:bg-blue-800"
                )}
              >
                {ctaLabel}
              </a>
            )}
          </div>

          <Hamburger open={open} isDark={isDark} onToggle={() => setOpen((v) => !v)} />
        </div>
      </div>

      <MobileMenu
        open={open}
        links={links}
        loginLabel={loginLabel}
        loginHref={loginHref}
        ctaLabel={ctaLabel}
        ctaHref={ctaHref}
        mobileMenuBg={mobileMenuBg}
        textClass={textClass}
        linkHover={linkHover}
        ctaClass={ctaClass}
        onClose={() => setOpen(false)}
      />
    </nav>
  );
}