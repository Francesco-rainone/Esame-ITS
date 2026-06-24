"use client";
import React, { memo } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/dist/shared/lib/image-external";
import type { CTAButton } from "@/utils/types";
import type { IconName } from "@/utils/icons";
import Icon from "@/components/atoms/Icon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/helpers";


type HeroBgImage = string | StaticImageData;

interface HeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeIcon?: IconName;
  ctaPrimary?: CTAButton;
  ctaSecondary?: CTAButton;
  bgImage?: HeroBgImage;
  gradient?: string;
  overlay?: boolean;
  overlayOp?: string;
  minH?: string;
  align?: "center" | "left";
  children?: React.ReactNode;
}

const HeroBackgroundImage = memo(({ bgImage }: { bgImage: HeroBgImage }) => (
  <Image
    src={bgImage}
    alt=""
    fill
    priority
    aria-hidden="true"
    sizes="100vw"
    className="object-cover -z-10"
  />
));
HeroBackgroundImage.displayName = "HeroBackgroundImage";

const HeroDecorations = memo(() => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl" />
    <div className="absolute bottom-0 -left-24 w-80 h-80 rounded-full bg-white/5 blur-2xl" />
  </div>
));
HeroDecorations.displayName = "HeroDecorations";

const HeroBadge = memo(({
  badge,
  icon,
  isCenter,
}: {
  badge: string;
  icon?: IconName;
  isCenter: boolean;
}) => (
  <div className={cn("mb-5", isCenter && "flex justify-center")}>
    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-white text-sm font-semibold border border-white/20 backdrop-blur-sm">
      {icon && <Icon name={icon} />}
      {badge}
    </span>
  </div>
));
HeroBadge.displayName = "HeroBadge";

const HeroBackground = memo(({
  bgImage,
  gradient,
  overlay,
  overlayOp,
}: Pick<HeroProps, "bgImage" | "gradient" | "overlay" | "overlayOp">) => (
  <>
    {!bgImage && <div className={cn("absolute inset-0 bg-gradient-to-br", gradient)} />}

    {bgImage && <HeroBackgroundImage bgImage={bgImage} />}

    {bgImage && overlay && <div className={cn("absolute inset-0", overlayOp)} />}
  </>
));
HeroBackground.displayName = "HeroBackground";

const HeroCTAs = memo(({
  ctaPrimary,
  ctaSecondary,
  alignmentClass,
}: {
  ctaPrimary?: CTAButton;
  ctaSecondary?: CTAButton;
  alignmentClass: string;
}) => {
  if (!ctaPrimary && !ctaSecondary) return null;

  return (
    <div className={cn("mt-9 flex flex-wrap gap-4", alignmentClass)}>
      {ctaPrimary && (
        <Button
          href={ctaPrimary.href}
          variant="white"
          size="lg"
          rounded="xl"
          className="shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          {ctaPrimary.label}
        </Button>
      )}
      {ctaSecondary && (
        <Button
          href={ctaSecondary.href}
          variant="outline"
          size="lg"
          rounded="xl"
          className="bg-white/10 text-white border-white/25 backdrop-blur-sm hover:bg-white/20 hover:-translate-y-0.5"
        >
          {ctaSecondary.label}
        </Button>
      )}
    </div>
  );
});
HeroCTAs.displayName = "HeroCTAs";

const HeroContent = memo(({
  badge,
  badgeIcon,
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  children,
  align,
}: Pick<HeroProps, "badge" | "badgeIcon" | "title" | "subtitle" | "ctaPrimary" | "ctaSecondary" | "children" | "align">) => {
  const isCenter = align === "center";
  const containerClass = isCenter ? "mx-auto text-center" : "text-left";
  const subtitleClass = isCenter ? "max-w-2xl mx-auto" : "max-w-xl";
  const ctasClass = isCenter ? "justify-center" : "justify-start";

  return (
    <div className={cn("relative z-10 max-w-5xl w-full", containerClass)}>
      {badge && <HeroBadge badge={badge} icon={badgeIcon} isCenter={isCenter} />}

      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-lg">
        {title}
      </h1>

      {subtitle && (
        <p className={cn("mt-5 text-lg sm:text-xl text-white/80 leading-relaxed", subtitleClass)}>
          {subtitle}
        </p>
      )}

      <HeroCTAs ctaPrimary={ctaPrimary} ctaSecondary={ctaSecondary} alignmentClass={ctasClass} />

      {children && <div className="mt-8">{children}</div>}
    </div>
  );
});
HeroContent.displayName = "HeroContent";

//Main Hero

const Hero = memo(({
  title = "Titolo della piattaforma",
  subtitle = "Descrizione del progetto e del suo obiettivo principale.",
  badge = "",
  badgeIcon,
  ctaPrimary = { label: "Inizia ora", href: "#form" },
  ctaSecondary,
  bgImage,
  gradient = "from-blue-900 via-blue-800 to-cyan-700",
  overlay = true,
  overlayOp = "bg-black/50",
  minH = "min-h-screen",
  align = "center",
  children = null,
}: HeroProps) => (
  <section
    className={cn("relative flex flex-col justify-center overflow-hidden px-6 py-28", minH)}
  >
    <HeroBackground
      bgImage={bgImage}
      gradient={gradient}
      overlay={overlay}
      overlayOp={overlayOp}
    />

    <HeroDecorations />

    <HeroContent
      badge={badge}
      badgeIcon={badgeIcon}
      title={title}
      subtitle={subtitle}
      ctaPrimary={ctaPrimary}
      ctaSecondary={ctaSecondary}
      align={align}
    >
      {children}
    </HeroContent>
  </section>
));

Hero.displayName = "Hero";

export default Hero;