"use client";
import Navbar from "@/components/organisms/Navbar";
import Hero from "@/components/organisms/Hero";
import StatsCounter from "@/components/organisms/StatsCounter";
import SectionWrapper from "@/components/organisms/SectionWrapper";
import Card from "@/components/organisms/Card";
import StepGuide from "@/components/organisms/StepGuide";
import ContactForm from "@/components/molecules/ContactForm";
import DataTable from "@/components/organisms/DataTable";
import Accordion from "@/components/molecules/FAQSection";
import Footer from "@/components/organisms/Footer";
import { WORKINGSPACE_MOCK, FORM_FIELDS, COLUMNS, STATUS_MAP } from "@/utils/data";
import {
  NAVBAR_CONTENT,
  HERO_CONTENT,
  STATS_CONTENT,
  WORKINGSPACE_SECTION,
  STEPS_SECTION,
  FORM_SECTION,
  PRENOTAZIONI_SECTION,
  FAQ_SECTION,
  FOOTER_CONTENT,
} from "@/utils/content";
import type { Candidatura } from "@/utils/types";

const API_URL = process.env.NEXT_PUBLIC_SPRING_BOOT_API_URL || "http://localhost:8080";

export default function Home() {
  return (
    <>
      <Navbar 
        brand={NAVBAR_CONTENT.brand}
        brandIcon={NAVBAR_CONTENT.brandIcon}
        links={NAVBAR_CONTENT.links}
        ctaLabel={NAVBAR_CONTENT.cta.label}
        ctaHref={NAVBAR_CONTENT.cta.href}
        sticky={NAVBAR_CONTENT.sticky}
        brandTextClass={NAVBAR_CONTENT.brandTextClass} 
        brandIconClass={NAVBAR_CONTENT.brandIconClass} 
        ctaClass={NAVBAR_CONTENT.ctaClass}             
      />

     <Hero
        title={HERO_CONTENT.title}
        subtitle={HERO_CONTENT.subtitle}
        badge={HERO_CONTENT.badge}
        badgeIcon={HERO_CONTENT.badgeIcon}
         bgImage={HERO_CONTENT.bgImage}
         ctaPrimary={HERO_CONTENT.ctaPrimary}
         ctaSecondary={HERO_CONTENT.ctaSecondary}
       />
       
      <StatsCounter
        bg={STATS_CONTENT.bg}
        stats={STATS_CONTENT.stats}
      />

      <SectionWrapper
        id={WORKINGSPACE_SECTION.id}
        title={WORKINGSPACE_SECTION.title}
        subtitle={WORKINGSPACE_SECTION.subtitle}
        badge={WORKINGSPACE_SECTION.badge}
        badgeIcon={WORKINGSPACE_SECTION.badgeIcon}
        badgeColor={WORKINGSPACE_SECTION.badgeColor}
        bg={WORKINGSPACE_SECTION.bg}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WORKINGSPACE_MOCK.map((p) => (
            <Card key={p.id} {...p} />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper id={STEPS_SECTION.id} bg={STEPS_SECTION.bg}>
        <StepGuide
          title={STEPS_SECTION.title}
          subtitle={STEPS_SECTION.subtitle}
          accent={STEPS_SECTION.accent}
          steps={STEPS_SECTION.steps}
        />
      </SectionWrapper>

      <SectionWrapper
        id={FORM_SECTION.id}
        title={FORM_SECTION.title}
        subtitle={FORM_SECTION.subtitle}
        bg={FORM_SECTION.bg}
        maxW={FORM_SECTION.maxW}
        badge={FORM_SECTION.badge}
        badgeIcon={FORM_SECTION.badgeIcon}
        badgeColor={FORM_SECTION.badgeColor}
      >
        <ContactForm
          submitLabel={FORM_SECTION.submitLabel}
          accentColor={FORM_SECTION.accentColor}
          fields={FORM_FIELDS}
          onSuccess={() => {}}
        />
      </SectionWrapper>

      <SectionWrapper
        id={PRENOTAZIONI_SECTION.id}
        title={PRENOTAZIONI_SECTION.title}
        bg={PRENOTAZIONI_SECTION.bg}
        maxW={PRENOTAZIONI_SECTION.maxW}
      >
        <DataTable<Candidatura>
          endpoint={`${API_URL}/api/richieste`}
          columns={COLUMNS}
          statusMap={STATUS_MAP}
          enableActions={PRENOTAZIONI_SECTION.enableActions}
          filter={PRENOTAZIONI_SECTION.filter}
          title={PRENOTAZIONI_SECTION.tableTitle}
          emptyMsg={PRENOTAZIONI_SECTION.emptyMsg}
          pageSize={PRENOTAZIONI_SECTION.pageSize}
        />
      </SectionWrapper>

      <SectionWrapper id={FAQ_SECTION.id} bg={FAQ_SECTION.bg}>
        <Accordion
          title={FAQ_SECTION.title}
          subtitle={FAQ_SECTION.subtitle}
          items={FAQ_SECTION.items}
        />
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