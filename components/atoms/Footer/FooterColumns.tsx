import React from "react";
import type { FooterColumn } from "@/utils/types";
import { cn } from "@/utils/helpers";


interface FooterColumnsProps {
  columns: FooterColumn[];
  headingCls: string;
  textMuted: string;
  textHover: string;
}

const FooterColumns = React.memo(function FooterColumns({
  columns,
  headingCls,
  textMuted,
  textHover,
}: FooterColumnsProps) {
  return (
    <>
      {columns.map((col) => (
        <div key={col.title}>
          <h3 className={cn("text-xs font-bold uppercase tracking-widest mb-4", headingCls)}>
            {col.title}
          </h3>
          <nav aria-label={col.title}>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={cn("text-sm transition-colors", textMuted, textHover)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ))}
    </>
  );
});

export default FooterColumns;
