import React from "react";
import type { FooterLegal } from "@/utils/types";
import { cn } from "@/utils/helpers";

interface FooterBottomProps {
  copyright: string;
  year: number;
  legal: FooterLegal[];
  textMuted: string;
  textHover: string;
}

const FooterBottom = React.memo(function FooterBottom({
  copyright,
  year,
  legal,
  textMuted,
  textHover,
}: FooterBottomProps) {
  return (
    <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
      <p className={cn("text-xs", textMuted)}>
        © {year} {copyright}
      </p>
      {legal.length > 0 && (
        <nav aria-label="Link legali">
          <ul className="flex flex-wrap gap-4">
            {legal.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn("text-xs transition-colors", textMuted, textHover)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
});

export default FooterBottom;
