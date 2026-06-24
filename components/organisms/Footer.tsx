import React, { useMemo } from "react";
import type { FooterColumn, FooterContact, FooterSocial, FooterLegal } from "@/utils/types";
import { getFooterTheme, getGridColsClass, cn } from "@/utils/helpers";
import FooterBrand from "../atoms/Footer/FooterBrand";
import FooterColumns from "../atoms/Footer/FooterColumns";
import FooterContactSection from "../atoms/Footer/FooterContact";
import FooterBottom from "../atoms/Footer/FooterBottom";


interface FooterProps {
  brand?: string;
  brandIcon?: import("@/utils/icons").IconName;
  tagline?: string;
  columns?: FooterColumn[];
  contact?: FooterContact;
  social?: FooterSocial[];
  legal?: FooterLegal[];
  copyright?: string;
  dark?: boolean;
}

const Footer = React.memo(function Footer({
  brand = "MyApp",
  brandIcon,
  tagline = "",
  columns = [],
  contact,
  social = [],
  legal = [],
  copyright = "Tutti i diritti riservati.",
  dark = true,
}: FooterProps) {
  const year = new Date().getFullYear();
  const theme = useMemo(() => getFooterTheme(dark), [dark]);

  const gridColsClass = useMemo(() => {
    const columnCount = columns.length + (contact ? 1 : 0) + 1;
    return getGridColsClass(columnCount);
  }, [columns.length, contact]);

  return (
    <footer
      className={cn("w-full pt-14 pb-8 px-4", theme.bg)}
      id="footer"
      role="contentinfo"
      aria-label="Informazioni del sito"
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Griglia principale ── */}
        <div className={cn(
          "grid grid-cols-1 sm:grid-cols-2 gap-10 pb-10 border-b",
          gridColsClass,
          theme.divider
        )}>
          {/* Brand + tagline + social */}
          <FooterBrand
            brand={brand}
            brandIcon={brandIcon}
            tagline={tagline}
            social={social}
            textMain={theme.textMain}
            textMuted={theme.textMuted}
            socialButton={theme.socialButton}
          />

          {/* Colonne link */}
          <FooterColumns
            columns={columns}
            headingCls={theme.headingCls}
            textMuted={theme.textMuted}
            textHover={theme.textHover}
          />

          {/* Contatti */}
          {contact && (
            <FooterContactSection
              contact={contact}
              headingCls={theme.headingCls}
              textMuted={theme.textMuted}
              textHover={theme.textHover}
            />
          )}
        </div>

        {/* ── Bottom bar ── */}
        <FooterBottom
          copyright={copyright}
          year={year}
          legal={legal}
          textMuted={theme.textMuted}
          textHover={theme.textHover}
        />
      </div>
    </footer>
  );
});

export default Footer;