import type { BadgeColor, AccentColor } from "./types";
import type { IconName } from "./icons";
import HeroImage from "@/public/heroimage.jpg";

// Navbar Content
export const NAVBAR_CONTENT = {
  brand: "WorkSpaceNow",
  brandIcon: "city" as IconName,
  links: [
    { label: "I nostri spazi", href: "#spazi" },
    { label: "Vantaggi", href: "#steps" },
    { label: "Prenotati", href: "#form" },
    { label: "Prenotazioni", href: "#prenotazioni" },
    { label: "FAQ", href: "#faq" },
  ],
  cta: { label: "Prenota subito il tuo spazio!", href: "#form" },
  sticky: true,
  
  // Aggiungere le classi personalizzate qui in base al tema del sito:
  brandTextClass: "text-cyan-700 dark:text-cyan-400",
  brandIconClass: "text-cyan-600 dark:text-cyan-400",
  ctaClass: "bg-cyan-600 text-white hover:bg-cyan-700 shadow-cyan-600/10",
};

// Hero Section Content
export const HERO_CONTENT = {
  title: "Prenota lo spazio di lavoro più adatto a te",
  subtitle:
    "WorkspaceNow offre da anni spazi di collaborazione adatti a studenti e lavoratori distribuendo spazi su tutto il territorio italiano.",
  badge: "in collaborazione con ”SpazioSolidale” ",
  badgeIcon: "collaboration" as IconName,
  bgImage: HeroImage,
  ctaPrimary: { label: "Registrati anche tu", href: "#form" },
  ctaSecondary: { label: "Scopri di più", href: "#spazi" },
};


// Stats Counter Content
export const STATS_CONTENT = {
  bg: "bg-blue-700",
  stats: [
    { value: 80,label: "Aziende Coinvolte", suffix: "+", icon: "building" as IconName },
    { value: 95, label: "Soddisfazione clienti", suffix: "%", icon: "star" as IconName },
    { value: 10, label: "Anni di esperienza", suffix: "+", icon: "calendar" as IconName },
  ],
};

// working Section Content
export const WORKINGSPACE_SECTION = {
  id: "spazi",
  title: "I Nostri Spazi",
  subtitle: "Scopri I nostri spazi che puoi utilizzare",
  badge: "Spazi",
  badgeIcon: "building" as IconName,
  badgeColor: "cyan" as BadgeColor,
  bg: "bg-cyan-90",
};

// Steps Section Content
export const STEPS_SECTION = {
  id: "steps",
  title: "Vantaggi",
  subtitle: "Unisciti a noi in 3 semplici passi",
  accent: "cyan" as AccentColor,
  bg: "bg-white",
  steps: [
    {
      number: 1,
      title: "Prenotati",
      description:
        "Compila il form di prenotazione con i dati personali e la professione che ricopri.",
      icon: "memo" as IconName,
    },
    {
      number: 2,
      title: "Verifica",
      description:
        "Il nostro team valuterà la tua candidatura e verificherà i requisiti necessari per poter prenotare un nostro spazio e la sua disponibilità.",
      icon: "check" as IconName,
    },
    {
      number: 3,
      title: "Entra nella Rete",
      description:
        "Una volta approvato, ti invieremo via mail i dettagli per iniziare a far parte della nostra rete e utilizzare lo spazio più adatto a te e alle tue esigenze.",
      icon: "party" as IconName,
    },
  ],
};

// Form Section Content
export const FORM_SECTION = {
  id: "form",
  title: "Prenota Ora",
  subtitle: "Compila il form per registrati nella nostra rete",
  badge: "Prenotazione",
  badgeIcon: "memo" as IconName,
  badgeColor: "cyan" as BadgeColor,
  bg: "bg-gray-50",
  maxW: "max-w-3xl",
  submitLabel: "Invia Prenotazione",
  accentColor: "cyan" as AccentColor,
};

// Prenotazioni Section Content
export const PRENOTAZIONI_SECTION = {
  id: "prenotazioni",
  title: "Le Tue Prenotazioni",
  bg: "bg-white",
  maxW: "max-w-6xl",
  enableActions: false,
  filter: { key: "statoApprovazione", value: "Approvato" },
  tableTitle: "Elenco Prenotazioni",
  emptyMsg: "Nessuna candidatura trovata",
  pageSize: 10,
};

// FAQ Section Content
export const FAQ_SECTION = {
  id: "faq",
  title: "Domande Frequenti",
  subtitle: "Trova le risposte alle domande più comuni Rivolte alla nostra rete di spazi condivisi e al processo di registrazione",
  bg: "bg-gray-50",
  items: [
    {
      question: "Cosa faccio se non mi arriva l'email di conferma?",
      answer:
        "Puoi scrivere al nostro supporto clienti all'indirizzo email: info@WorkSpaceNow.it e noi risolveremo al più presto il problema. Controlla anche la cartella spam, a volte le email possono finire lì.",
    },
    {
      question: "Come posso fare di più per aiutare ad espandere questi spazi?",
      answer:
        "iscriviti a SpazioSolidale in modo tale da poter partecipare attivamente alle iniziative e agli eventi organizzati dalla nostra azienda. Inoltre, puoi condividere le nostre campagne sui social media e incoraggiare amici e familiari a prenotare un nostro spazio.",
    },
    {
      question: "Quanto tempo richiede il processo di valutazione?",
      answer:
        "Il processo di valutazione richiede generalmente 2-3 settimane. Durante questo periodo, il nostro team verificherà la documentazione fornita e, se necessario, Chiederà informazioni aggiuntive per che l'attività sia in regola.",
    },
  ],
};

// Footer Content
export const FOOTER_CONTENT = {
  brand: "WorkSpaceNow",
  brandIcon: "city" as IconName,
  tagline: "Affidati a noi per lavorare al meglio!",
  contact: {
    address: "Via dell'Economia Solidale 123, 00100 Roma",
    email: "info@WorkSpaceNow.it",
    phone: "+39 06 1234567",
  },
  columns: [
    {
      title: "Spazi",
      links: [
        { label: "Spazi", href: "#spazi" },
        { label: "Vantaggi", href: "#steps" },
        { label: "Prenotati", href: "#form" },
      ],
    },
    {
      title: "Risorse",
      links: [
        { label: "FAQ", href: "#faq" },
        { label: "Blog", href: "/blog" },
        { label: "NewsLetter", href: "#news" },
        { label: "Eventi", href: "/even" },
        { label: "Documentazione", href: "/docs" },
      ],
    },
    {
      title: "Azienda",
      links: [
        { label: "Chi siamo", href: "/about" },
        { label: "Contatti", href: "/contact" },
        { label: "Partner", href: "/partners" },
      ],
    },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Termini e Condizioni", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
  copyright: "© 2024 WorkSpaceNow. Tutti i diritti riservati.",
  dark: false,
};

