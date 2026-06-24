📦 ITS Exam Components — Libreria React/Next.js TypeScript (Atomic Design)
Libreria di componenti React 19 / Next.js (App Router) + TypeScript + Tailwind CSS pensata per le prove pratiche ITS.
Tutti i componenti sono "use client" quando necessario, autonomi, altamente tipizzati e organizzati secondo i principi dell'Atomic Design.
Le icone sono gestite tramite Font Awesome 6 (con componente Icon personalizzato).

⚡ Personalizzazione rapida: Per cambiare testi, colori, campi del form e dati dimostrativi, modifica esclusivamente i file utils/content.ts, utils/data.ts e utils/types.ts (per i tipi di dominio).
Non serve toccare i componenti!

🚀 Setup iniziale
# Crea il progetto Next.js con TypeScript e Tailwind
npx create-next-app@latest my-exam-app --typescript --eslint --tailwind --app --src-dir=false

# Entra nella cartella
cd my-exam-app

# Installa le dipendenze aggiuntive
npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/fontawesome-svg-core
bash
Copia le cartelle components/ e utils/ all'interno del progetto.
📂 Struttura del progetto (Atomic Design)

my-exam-app/
├── app/
│   ├── layout.tsx              ← ToastProvider globale
│   ├── page.tsx                ← Homepage con sezioni
│   └── carousel/
│       └── page.tsx            ← Pagina dimostrativa Carousel e colori
├── components/
│   ├── atoms/                  ← Componenti base
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Icon.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── Label.tsx
│   │   ├── Spinner.tsx
│   │   └── Footer/
│   │       ├── FooterBrand.tsx
│   │       ├── FooterColumns.tsx
│   │       ├── FooterContact.tsx
│   │       └── FooterBottom.tsx
│   ├── molecules/              ← Combinazioni di atomi
│   │   ├── FormField.tsx
│   │   ├── FAQSection.tsx
│   │   ├── Toast.tsx
│   │   ├── Card.tsx
│   │   └── Carousel.tsx        ← Slideshow con autoplay e CTA
│   ├── organisms/              ← Sezioni autonome
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Footer.tsx
│   │   ├── StatsCounter.tsx
│   │   ├── StepGuide.tsx
│   │   ├── ContactForm.tsx
│   │   ├── DataTable.tsx
│   │   ├── ProfileCard.tsx
│   │   └── Modal.tsx
│   └── templates/              ← Layout riutilizzabili
│       └── SectionWrapper.tsx
├── utils/                      ← Tipi, helper, hook e contenuti
│   ├── types.ts                ← ⚡ INTERFACCE DI DOMINIO (modifica per cambiare tipo)
│   ├── helpers.ts
│   ├── icons.ts                ← Mappatura nomi → icone Font Awesome
│   ├── content.ts              ← ⚡ TESTI E CONFIGURAZIONI
│   ├── data.ts                 ← ⚡ DATI MOCK E CAMPI FORM
│   └── hooks/
│       ├── useCountUp.ts
│       ├── useAccordion.ts
│       ├── useCarousel.ts
│       ├── useContactItems.ts
│       ├── useEscapeClose.ts
│       ├── useNavbarTheme.ts
│       ├── useTableData.ts
│       └── useTableActions.ts
└── public/
    └── img/                    ← Immagini placeholder
🧩 Componenti disponibili
Categoria Componente Descrizione Atoms Button Pulsante con 7 varianti + stati (loading, disabled) Badge Pillola colorata (22 colori + dot) Icon Wrapper Font Awesome tipizzato Input / Textarea Campi di input accessibili Label Etichetta con asterisco di obbligatorietà Spinner Indicatore di caricamento animato Molecules FormField Campo form completo (label + input + errore + hint) Card Scheda generica con immagine, badge, meta, tags e CTA personalizzabile FAQSection Sezione FAQ/Accordion accessibile Toast Sistema di notifiche (Provider + hook) Carousel Slideshow con autoplay, frecce, dots e CTA Organisms Navbar Barra di navigazione responsive con hamburger Hero Sezione hero con gradiente/immagine, badge e CTA Footer Piè di pagina modulare (brand, colonne link, contatti, legali) StatsCounter Contatori animati al rialzo StepGuide "Come funziona" a step (3 layout) ContactForm Form contatto con server action (React 19) DataTable Tabella con fetch GET e azioni (approva/rifiuta/cancella) ProfileCard Scheda profilo (avatar, rating, skills, contatti) Modal Dialog modale accessibile Templates SectionWrapper Contenitore sezione con titolo, sottotitolo e badge 🎨 Personalizzazione facile: modifica content.ts, data.ts e types.ts

Testi, link e colori Tutti i testi, i link, i badge, i colori delle sezioni e del footer sono centralizzati in utils/content.ts. Modifica gli oggetti esportati (es. NAVBAR_CONTENT, HERO_CONTENT, FORM_SECTION) per cambiare ogni aspetto della UI senza toccare i componenti.
Dati mock e campi del form I dati dimostrativi e la struttura del form si trovano in utils/data.ts. Qui puoi:
Cambiare i dati delle card (WORKINGSPACE_MOCK)

Modificare i campi del form (FORM_FIELDS), aggiungendo o rimuovendo campi, cambiando etichette, opzioni, validazioni

Aggiornare le colonne della tabella (COLUMNS) e la mappa degli stati (STATUS_MAP)

Tipi di dominio (ES: da Spazi a Locali, da Candidatura a Prenotazione) Le interfacce TypeScript che descrivono i tuoi dati sono in utils/types.ts. Per adattare il progetto a un dominio diverso, modifica queste interfacce:
// Esempio: cambia WORKINGSPACE in un nuovo tipo
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
Puoi rinominarlo (es. SPAZIO, LOCALE, PRODOTTO) e aggiungere/rimuovere campi.

Per i dati della candidatura, modifica l'interfaccia Candidatura:

export interface Candidatura {
  id: number;
  numeroPersone: number;
  spazioSelezionato: string;
  città: string;
  azienda: string;   // ← cambia in "nome" o "nomeAttivita"
  email: string;
  statoApprovazione: "In Attesa" | "Approvato" | "Rifiutato";
  dataRegistrazione?: string;
  descrizione?: string;
  privacy?: boolean;
}
🖥️ Backend Spring Boot Il backend è un'applicazione Spring Boot 4 (Java 21) che espone API REST per la gestione delle candidature e l'autenticazione degli amministratori.

Stack tecnologico Java 21

Spring Boot 4 con Spring Web, Spring Data JPA

MySQL per la persistenza

BCrypt per l'hashing delle password

Lombok per ridurre il boilerplate

Swagger (SpringDoc) per la documentazione interattiva delle API

Endpoint REST Metodo Rotta Descrizione POST /api/richieste Crea una nuova candidatura (es. prenotazione) GET /api/richieste Recupera tutte le candidature PATCH /api/richieste/{id} Aggiorna lo stato di una candidatura DELETE /api/richieste/{id} Cancella una candidatura POST /api/auth/login Autentica un amministratore Entità JPA Submission id (Long, generato automaticamente)

numeroPersone (int)

spazioSelezionato (String)

città (String)

azienda (String)

email (String)

descrizione (String)

dataRegistrazione (LocalDateTime)

statoApprovazione (String)

AdminUser id (Long, generato automaticamente)

username (String, unico)

password (String, codificata con BCrypt)

Configurazione iniziale Un componente DataInitializer crea automaticamente un utente amministratore predefinito all'avvio dell'applicazione, se non già presente:

Username: admin

Password: admin (hashata con BCrypt)

Avvio del backend Prerequisiti: Java 21 JDK, Maven (o il wrapper ./mvnw), MySQL attivo.

bash cd backend ./mvnw spring-boot:run
