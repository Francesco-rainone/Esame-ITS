import { useMemo } from "react";
import { faLocationDot, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { FooterContact } from "@/utils/types";


export interface ContactItem {
  icon: IconDefinition;
  text: string;
  href?: string;
  ariaLabel?: string;
}

export const useContactItems = (contact: FooterContact): ContactItem[] => {
  return useMemo(() => {
    const items: ContactItem[] = [];

    if (contact.address) {
      items.push({
        icon: faLocationDot,
        text: contact.address,
      });
    }

    if (contact.email) {
      items.push({
        icon: faEnvelope,
        text: contact.email,
        href: `mailto:${contact.email}`,
        ariaLabel: `Invia email a ${contact.email}`,
      });
    }

    if (contact.phone) {
      items.push({
        icon: faPhone,
        text: contact.phone,
        href: `tel:${contact.phone.replace(/\s/g, "")}`,
        ariaLabel: `Chiama ${contact.phone}`,
      });
    }

    return items;
  }, [contact]);
};