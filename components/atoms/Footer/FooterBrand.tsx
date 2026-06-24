import React from "react";
import type { FooterSocial } from "@/utils/types";
import type { IconName } from "@/utils/icons";
import { cn } from "@/utils/helpers";
import Icon from "@/components/atoms/Icon";


interface FooterBrandProps {
  brand: string;
  brandIcon?: IconName;
  tagline?: string;
  social: FooterSocial[];
  textMain: string;
  textMuted: string;
  socialButton: string;
}

const FooterBrand = React.memo(function FooterBrand({
  brand,
  brandIcon,
  tagline,
  social,
  textMain,
  textMuted,
  socialButton,
}: FooterBrandProps) {
  return (
    <div>
      <div className={cn("text-2xl font-black mb-2 flex items-center gap-2", textMain)}>
        {brandIcon && <Icon name={brandIcon} className="w-7 h-7" />}
        {brand}
      </div>
      {tagline && (
        <p className={cn("text-sm leading-relaxed mb-5", textMuted)}>
          {tagline}
        </p>
      )}
      {social.length > 0 && (
        <div className="flex gap-3 flex-wrap">
          {social.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center text-sm transition-colors",
                socialButton
              )}
            >
              {s.icon}
            </a>
          ))}
        </div>
      )}
    </div>
  );
});

export default FooterBrand;
