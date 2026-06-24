/**
 * page.tsx — Pagina di esempio con Carousel / Slideshow
 * ───────────────────────────────────────────────────────
 * Percorso consigliato: app/showcase/page.tsx
 *
 * Mostra:
 * 1. Carousel hero a schermo pieno con slide + CTA
 * 2. Carousel compatto in una sezione dedicata (sfondo Slate)
 * 3. Card con immagine di default e varianti colori CTA (sfondo Yellow)
 * 4. Tutti i colori Badge disponibili (sfondo Pink)
 * 5. Carousel minimale (sfondo Violet)
 * 6. Tutti gli sfondi della palette (nuova sezione!)
 */

"use client";
import Navbar      from "@/components/organisms/Navbar";
import Carousel    from "@/components/molecules/Carousel";
import SectionWrapper from "@/components/organisms/SectionWrapper";
import Card        from "@/components/organisms/Card";
import Footer      from "@/components/organisms/Footer";
import Badge       from "@/components/atoms/Badge";
import type { CarouselSlide, BadgeColor, CardCtaColor, ColorPalette } from "@/utils/types";
import { NAVBAR_CONTENT, FOOTER_CONTENT } from "@/utils/content";

const HERO_SLIDES: CarouselSlide[] = [
  {
    image: "/next.svg",
    badge: "Novità",
    title: "ZampaCasa — Adotta un amico",
    subtitle: "Dai una casa a un cane in cerca di amore.",
    cta: { label: "Scopri i cani", href: "#cani" },
  },
  {
    image: "/next.svg",
    badge: "In evidenza",
    title: "Oltre 142 adozioni riuscite",
    subtitle: "Unisciti alla nostra rete e cambia una vita.",
    cta: { label: "Candidati ora", href: "#form" },
  },
  {
    image: "/next.svg",
    title: "Verifica rapida in 2-3 settimane",
    subtitle: "Il nostro team ti seguirà in ogni passo.",
  },
];

const COMPACT_SLIDES: CarouselSlide[] = [
  {
    image: "/next.svg",
    title: "Macchia — Dalmata",
    subtitle: "Dolce e giocoso, perfetto per famiglie.",
    cta: { label: "Adotta Macchia", href: "#form" },
  },
  {
    image: "/next.svg",
    title: "Max — Alano",
    subtitle: "Simpatico giocherellone in cerca di compagnia.",
    cta: { label: "Adotta Max", href: "#form" },
  },
  {
    image: "/next.svg",
    title: "Spotty — Dobermann",
    subtitle: "Energico e fedele, ideale per chi ama le passeggiate.",
    cta: { label: "Adotta Spotty", href: "#form" },
  },
];

const ALL_BADGE_COLORS: BadgeColor[] = [
  "slate", "gray", "zinc", "neutral", "stone",
  "red", "orange", "amber", "yellow", "lime",
  "green", "emerald", "teal", "cyan", "sky",
  "blue", "indigo", "violet", "purple", "fuchsia",
  "pink", "rose", "brown"
];

const CARD_CTA_COLORS: CardCtaColor[] = [
  "rose", "amber", "emerald", "sky", "indigo", "fuchsia", "stone", "teal"
];

const ALL_BG_COLORS: ColorPalette[] = ALL_BADGE_COLORS;

export default function CarouselShowcasePage() {
  return (
    <>
      <Navbar
        brand={NAVBAR_CONTENT.brand}
        brandIcon={NAVBAR_CONTENT.brandIcon}
        links={NAVBAR_CONTENT.links}
        ctaLabel={NAVBAR_CONTENT.cta.label}
        ctaHref={NAVBAR_CONTENT.cta.href}
        sticky={NAVBAR_CONTENT.sticky}
      />

      {/* 1. Carousel Hero a schermo pieno */}
      <section className="w-full">
        <Carousel
          slides={HERO_SLIDES}
          height="h-[600px]"
          autoPlay
          interval={5000}
          showArrows
          showDots
          overlay
          rounded="none"
        />
      </section>

      {/* 2. Carousel compatto (sfondo Slate) */}
      <SectionWrapper
        id="slideshow"
        title="I Nostri Cani in Evidenza"
        subtitle="Scorri le schede per conoscere i cani disponibili all'adozione"
        badge="Slideshow"
        badgeColor="slate"
        bg="bg-slate-50"
      >
        <div className="max-w-2xl mx-auto">
          <Carousel
            slides={COMPACT_SLIDES}
            height="h-[360px]"
            autoPlay
            interval={4000}
            showArrows
            showDots
            overlay
            rounded="2xl"
          />
        </div>
      </SectionWrapper>

      {/* 3. Card con colori CTA (sfondo Yellow) */}
      <SectionWrapper
        id="cani"
        title="Colori CTA delle Card"
        subtitle="Moltissimi nuovi colori disponibili per variare lo stile del bottone."
        badge="Esempio"
        badgeColor="yellow"
        bg="bg-yellow-50"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CARD_CTA_COLORS.map((color) => (
            <Card
              key={color}
              title={`CTA ${color}`}
              subtitle="Esempio colore"
              description="L'immagine di default è /next.svg quando non ne viene passata una."
              badge="Demo"
              badgeColor="gray"
              ctaLabel={`Bottone ${color}`}
              ctaHref="#"
              ctaColor={color}
              meta={[{ icon: "location", text: "Esempio" }]}
              tags={[color]}
            />
          ))}
        </div>
      </SectionWrapper>

      {/* 4. Badge showcase (sfondo Pink) */}
      <SectionWrapper
        id="badge"
        title="Tutti i Colori Badge"
        subtitle="Adesso supportano l'intera palette espansa da types.ts!"
        badge="Palette Estesa"
        badgeColor="pink"
        bg="bg-pink-50"
      >
        <div className="flex flex-wrap gap-3 justify-center">
          {ALL_BADGE_COLORS.map((c) => (
            <Badge key={c} color={c} dot size="md">
              {c}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 justify-center mt-8">
          {(["xs","sm","md","lg","xl"] as const).map((s) => (
            <Badge key={s} color="blue" size={s}>
              size {s}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 justify-center mt-4">
          {(["sm","md","lg","xl","full"] as const).map((r) => (
            <Badge key={r} color="emerald" rounded={r} size="md">
              rounded {r}
            </Badge>
          ))}
        </div>
      </SectionWrapper>

      {/* 5. Carousel minimal (sfondo Violet) */}
      <SectionWrapper
        id="minimal"
        title="Carousel Minimale"
        subtitle="Senza overlay e senza dots — solo frecce di navigazione"
        bg="bg-violet-50"
        badge="Variante"
        badgeColor="violet"
      >
        <div className="max-w-3xl mx-auto">
          <Carousel
            slides={COMPACT_SLIDES}
            height="h-[280px]"
            autoPlay={false}
            showArrows
            showDots={false}
            overlay={false}
            rounded="xl"
          />
        </div>
      </SectionWrapper>

      {/* 6. Tutti gli sfondi disponibili */}
      <SectionWrapper
        id="sfondi"
        title="Sfondi disponibili"
        subtitle="Ora puoi usare uno qualsiasi di questi 23 colori come sfondo per le sezioni. Basta passare la classe Tailwind corrispondente (es. bg-{colore}-50)."
        badge="Background"
        badgeColor="stone"
        bg="bg-stone-50"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {ALL_BG_COLORS.map((color) => (
            <div key={color} className="flex flex-col items-center gap-2">
              <div className={`w-full h-16 rounded-xl bg-${color}-50 border border-${color}-200 shadow-sm`} />
              <span className="text-xs font-medium text-gray-600 capitalize">{color}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 mt-6">
          Le classi Tailwind corrispondenti: <code className="bg-gray-100 px-1 rounded">bg-{'{colore}'}-50</code> (chiaro) e 
          <code className="bg-gray-100 px-1 rounded ml-1">bg-{'{colore}'}-100</code> (leggermente più intenso).
        </p>
      </SectionWrapper>

      <Footer
        brand={FOOTER_CONTENT.brand}
        brandIcon={FOOTER_CONTENT.brandIcon}
        tagline={FOOTER_CONTENT.tagline}
        contact={FOOTER_CONTENT.contact}
        columns={FOOTER_CONTENT.columns}
        legal={FOOTER_CONTENT.legal}
        copyright={FOOTER_CONTENT.copyright}
        dark={FOOTER_CONTENT.dark}
      />
    </>
  );
}