ITS Exam Components — Libreria React/Next.js TypeScript (Atomic Design)
Libreria di componenti React 19 / Next.js (App Router) + TypeScript + Tailwind CSS pensata per le prove pratiche ITS.
Tutti i componenti sono "use client" quando necessario, autonomi, altamente tipizzati e organizzati secondo i principi dell'Atomic Design.
Le icone sono gestite tramite Font Awesome 6 (con componente Icon personalizzato).

⚡ Personalizzazione rapida: Per cambiare testi, colori, campi del form e dati dimostrativi, modifica esclusivamente i file utils/content.ts, utils/data.ts e utils/types.ts (per i tipi di dominio).
Non serve toccare i componenti!

🚀 Setup iniziale
bash
# Crea il progetto Next.js con TypeScript e Tailwind
npx create-next-app@latest my-exam-app --typescript --eslint --tailwind --app --src-dir=false

# Entra nella cartella
cd my-exam-app

# Installa le dipendenze aggiuntive
npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/fontawesome-svg-core
npm install axios   # (opzionale, per chiamate REST manuali)
Copia le cartelle components/ e utils/ all'interno del progetto.

📂 Struttura del progetto (Atomic Design)
text
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
│   ├── icons.ts
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
Categoria	Componente	Descrizione
Atoms	Button	Pulsante con 7 varianti + stati (loading, disabled)
Badge	Pillola colorata (22 colori + dot)
Icon	Wrapper Font Awesome tipizzato
Input / Textarea	Campi di input accessibili
Label	Etichetta con asterisco di obbligatorietà
Spinner	Indicatore di caricamento animato
Molecules	FormField	Campo form completo (label + input + errore + hint)
Card	Scheda generica con immagine, badge, meta, tags e CTA personalizzabile
FAQSection	Sezione FAQ/Accordion accessibile
Toast	Sistema di notifiche (Provider + hook)
Carousel	Slideshow con autoplay, frecce, dots e CTA
Organisms	Navbar	Barra di navigazione responsive con hamburger
Hero	Sezione hero con gradiente/immagine, badge e CTA
Footer	Piè di pagina modulare
StatsCounter	Contatori animati al rialzo
StepGuide	"Come funziona" a step (3 layout)
ContactForm	Form contatto con server action (React 19)
DataTable	Tabella con fetch GET e azioni (approva/rifiuta/cancella)
ProfileCard	Scheda profilo (avatar, rating, skills, contatti)
Modal	Dialog modale accessibile
Templates	SectionWrapper	Contenitore sezione con titolo, sottotitolo e badge
🎨 Personalizzazione facile: modifica content.ts, data.ts e types.ts
1. Testi, link e colori
Tutti i testi, i link, i badge, i colori delle sezioni e del footer sono centralizzati in utils/content.ts. Modifica gli oggetti esportati (es. NAVBAR_CONTENT, HERO_CONTENT, FORM_SECTION) per cambiare ogni aspetto della UI senza toccare i componenti.

2. Dati mock e campi del form
I dati dimostrativi e la struttura del form si trovano in utils/data.ts. Qui puoi:

Cambiare i dati delle card (WORKINGSPACE_MOCK)

Modificare i campi del form (FORM_FIELDS), aggiungendo o rimuovendo campi, cambiando etichette, opzioni, validazioni

Aggiornare le colonne della tabella (COLUMNS) e la mappa degli stati (STATUS_MAP)

3. Tipi di dominio (ES: da Spazi a Locali, da Candidatura a Prenotazione)
Le interfacce TypeScript che descrivono i tuoi dati sono in utils/types.ts. Per adattare il progetto a un dominio diverso, modifica queste interfacce:

ts
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

ts
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
Ad esempio, se vuoi che il campo azienda diventi nome, rinominalo e aggiorna di conseguenza il file data.ts (campi del form e colonne della tabella) e il backend.

🎠 Carousel – Slideshow con CTA
Il componente Carousel (components/molecules/Carousel.tsx) mostra una sequenza di slide con immagine, badge, titolo, sottotitolo e un pulsante CTA.

Proprietà principali
Prop	Tipo	Default	Descrizione
slides	CarouselSlide[]	[]	Array di slide
height	string	"h-[600px]"	Altezza (classe Tailwind)
autoPlay	boolean	false	Avanzamento automatico
interval	number	5000	Intervallo in ms
showArrows	boolean	false	Mostra frecce laterali
showDots	boolean	false	Mostra pallini indicatori
overlay	boolean	false	Overlay scuro sull'immagine
rounded	"none" | "sm" | "md" | "lg" | "xl" | "2xl"	"2xl"	Arrotondamento
Esempio
tsx
import Carousel from "@/components/molecules/Carousel";
import type { CarouselSlide } from "@/utils/types";

const slides: CarouselSlide[] = [
  {
    image: "/hero1.jpg",
    badge: "Novità",
    title: "Adotta un amico",
    subtitle: "Dai una casa a un cane in cerca di amore.",
    cta: { label: "Scopri i cani", href: "#cani" },
  },
  // ...
];

<Carousel
  slides={slides}
  height="h-[500px]"
  autoPlay
  interval={4000}
  showArrows
  showDots
  overlay
  rounded="2xl"
/>
🖼️ Pagina Showcase Carousel e Colori
Il progetto include una pagina dimostrativa completa che mostra tutte le varianti del Carousel e l'intera palette di colori disponibile.

Percorso: app/carousel/page.tsx
URL nell'app: http://localhost:3000/carousel

La pagina include:

Carousel hero a schermo pieno con autoplay

Carousel compatto con overlay e dots

Card con diversi colori CTA

Tutti i 22 colori dei Badge

Carousel minimal senza overlay

Griglia di tutti gli sfondi disponibili

Per vederla, avvia il progetto e naviga a /carousel.

🌟 Icone Font Awesome
Il componente Icon accetta un nome icona definito in utils/icons.ts.
Per aggiungere nuove icone, modifica quel file:

ts
import { faNewIcon } from "@fortawesome/free-solid-svg-icons";

export const ICON_MAP = {
  // ...
  newIcon: faNewIcon,
} as const;
Poi usa:

tsx
<Icon name="newIcon" size="lg" />
Nota: Tutte le emoji sono state rimosse dal codice a favore di icone Font Awesome.

🎨 Palette colori
Tutti i componenti che accettano un colore (Badge, Card, Button, StepGuide, ContactForm, SectionWrapper) supportano l'intera palette di 22 colori:
slate, gray, zinc, neutral, stone, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, brown.

🔄 Aggiornare la DataTable dopo un invio form
Usa un contatore come refreshKey:

tsx
const [submitCount, setSubmitCount] = useState(0);

<ContactForm onSuccess={() => setSubmitCount(c => c + 1)} ... />
<DataTable refreshKey={submitCount} endpoint="..." ... />
🐳 Deploy con Docker
L'intero stack (frontend, backend, database) è containerizzabile con Docker Compose.
Per maggiori dettagli consulta la repository del progetto completo.

♿ Accessibilità
Tutti i componenti sono progettati con attenzione all'accessibilità:

aria-expanded e aria-hidden espliciti

aria-label su menu, pulsanti e select

role="alert" per i messaggi di errore

Pulsanti di azione con aria-label descrittivo

🧠 Hook e utilità inclusi
Hook / Utility	Descrizione
useCountUp	Animazione numerica (IntersectionObserver)
useAccordion	Stato apertura/chiusura FAQ
useCarousel	Logica carosello (auto-play, next/prev)
useContactItems	Genera lista icone/contatti footer
useEscapeClose	Chiude modali/menu con ESC
useNavbarTheme	Gestisce tema chiaro/scuro/trasparente
useTableData	Fetch e paginazione dati tabella
useTableActions	Azioni approva/rifiuta/cancella per DataTable
cn()	Utility per classi condizionali
getFooterTheme()	Tema footer (dark/light)
getGridColsClass()	Calcola griglia responsive
📚 Risorse utili
Next.js Documentation

Tailwind CSS

Font Awesome React

Atomic Design Methodology