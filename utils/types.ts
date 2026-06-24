import type { ReactNode } from "react";
import type { IconName } from "./icons";
import { StaticImageData } from "next/dist/shared/lib/image-external";

export interface LinkItem {
  label: string;
  href: string;
}

export interface CTAButton {
  label: string;
  href: string;
}

export interface MetaItem {
  icon: IconName | string;
  text: string;
}

export interface Step {
  icon?: IconName;
  title: string;
  description: string;
}

export interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "number" | "textarea" | "select" | "radio" | "checkbox" | "date" | "url";
  placeholder?: string;
  required?: boolean;
  options?: string[];
  rows?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  hint?: string;
  half?: boolean;
}

export interface ColumnDef<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => ReactNode;
  badge?: boolean;
  truncate?: boolean;
}

export interface ToastItem {
  id: number | string;
  message: string;
  type: "success" | "error" | "info" | "warning";
}

export interface NavbarLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: LinkItem[];
}

export interface FooterContact {
  address?: string;
  email?: string;
  phone?: string;
  vatId?: string;
}

export interface FooterSocial {
  icon: ReactNode;
  href: string;
  label: string;
}

export interface FooterLegal {
  label: string;
  href: string;
}

export type Variant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "success"
  | "white";

export type Size = "xs" | "sm" | "md" | "lg" | "xl";
export type Rounded = "sm" | "md" | "lg" | "xl" | "full";


export type ColorPalette = 
  | "slate" | "gray" | "zinc" | "neutral" | "stone"
  | "red" | "orange" | "amber" | "yellow" | "lime"
  | "green" | "emerald" | "teal" | "cyan" | "sky"
  | "blue" | "indigo" | "violet" | "purple" | "fuchsia"
  | "pink" | "rose" | "brown";

export type BadgeColor = ColorPalette;
export type AccentColor = ColorPalette;
export type CardCtaColor = ColorPalette;


export type CarouselSlide = {
  image?: StaticImageData | string;
  title?: string;
  subtitle?: string;
  badge?: string;
  cta?: CTAButton;
};

export type StatItem = {
  value: number | string;
  label: string;
  suffix?: string;
  prefix?: string;
  icon?: IconName;
  color?: string;
};

export type StepLayout = "horizontal" | "vertical" | "numbered";

export type AccordionVariant = "bordered" | "flat" | "separated";

export type AccordionItem = {
  question: string;
  answer: string;
};

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export type CardShadow = "sm" | "md" | "lg" | "none";

export type ProfileContact = {
  email?: string;
  linkedin?: string;
  phone?: string;
};

export type StatusMap = Record<string, { label?: string; color?: BadgeColor }>;

export interface WORKINGSPACE {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image?: StaticImageData | string;
  meta: MetaItem[];
  tags: string[];
  badge: string;
  badgeColor?: BadgeColor;
  ctaLabel: string;
  ctaColor?: CardCtaColor;
}

export interface Candidatura {
  id: number;
  numeroPersone: number;
  spazioSelezionato: string;
  città: string;
  azienda: string;
  email: string;
  statoApprovazione: "In Attesa" | "Approvato" | "Rifiutato";
  dataRegistrazione?: string;
  descrizione?: string;
  privacy?: boolean;
}

export interface SPAZI {
  id: number;
  title: string;
  image?: StaticImageData | string;
  subtitle: string;
  description: string;
  meta: MetaItem[];
  tags: string[];
  badge: string;
  badgeColor?: BadgeColor;
  ctaLabel: string;
  ctaColor?: CardCtaColor;
}