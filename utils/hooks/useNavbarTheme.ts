import { useState, useEffect, useMemo } from "react";

export interface NavbarTheme {
  isDark: boolean;
  bgClass: string;
  textClass: string;
  linkHover: string;
  mobileMenuBg: string;
  loginBtnClasses: string;
}

export const useNavbarTheme = (
  dark: boolean,
  transparent: boolean
): NavbarTheme => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!transparent) return;
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [transparent]);

  const isDark = useMemo(
    () => dark || (transparent && !scrolled),
    [dark, transparent, scrolled]
  );

  const bgClass = useMemo(
    () =>
      transparent && !scrolled
        ? "bg-transparent"
        : dark
        ? "bg-gray-900 border-gray-800"
        : "bg-white border-gray-100 shadow-sm",
    [transparent, scrolled, dark]
  );

  const textClass = useMemo(
    () => (isDark ? "text-gray-100" : "text-gray-700"),
    [isDark]
  );

  const linkHover = useMemo(
    () => (isDark ? "hover:text-white" : "hover:text-blue-700"),
    [isDark]
  );

  const mobileMenuBg = useMemo(
    () => (dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"),
    [dark]
  );

  const loginBtnClasses = useMemo(
    () =>
      isDark
        ? "border border-gray-500 text-gray-300 hover:bg-white/10 hover:text-white"
        : "border border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900",
    [isDark]
  );

  return { isDark, bgClass, textClass, linkHover, mobileMenuBg, loginBtnClasses };
};