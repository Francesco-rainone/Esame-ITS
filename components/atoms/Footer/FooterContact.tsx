"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContactItems } from "@/utils/hooks/useContactItems";
import type { FooterContact } from "@/utils/types";
import { cn } from "@/utils/helpers";


interface FooterContactProps {
  contact: FooterContact;
  headingCls: string;
  textMuted: string;
  textHover: string;
}

const FooterContactSection = React.memo(function FooterContactSection({
  contact,
  headingCls,
  textMuted,
  textHover,
}: FooterContactProps) {
  const items = useContactItems(contact);

  return (
    <div>
      <h3
        className={cn(
          "text-xs font-bold uppercase tracking-widest mb-4",
          headingCls
        )}
      >
        Contatti
      </h3>
      <address className="not-italic">
        <ul className="space-y-2">
          {items.map((item) =>
            item.href ? (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    "text-sm flex items-center gap-2 transition-colors",
                    textMuted,
                    textHover
                  )}
                  aria-label={item.ariaLabel}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="w-3.5 h-3.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{item.text}</span>
                </a>
              </li>
            ) : (
              <li
                key={item.text}
                className={cn("text-sm flex items-start gap-2", textMuted)}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className="w-3.5 h-3.5 mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <span>{item.text}</span>
              </li>
            )
          )}
          {contact.vatId && (
            <li className={cn("text-xs mt-3", textMuted)}>
              <span>P.IVA / C.F.: {contact.vatId}</span>
            </li>
          )}
        </ul>
      </address>
    </div>
  );
});

export default FooterContactSection;