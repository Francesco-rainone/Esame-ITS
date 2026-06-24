import type { FieldConfig, ColumnDef, StatusMap, WORKINGSPACE, Candidatura } from "@/utils/types";
import spazioaperto from "@/public/spazioaperto.jpg";
import isolatespace from "@/public/isolatedworkingspace.jpg";
import openspace from "@/public/openspace.jpg";

export const WORKINGSPACE_MOCK: WORKINGSPACE[] = [
  {
    id: 1,
    title: "Giardino zen",
    subtitle: "spazioaperto",
    description:
      "visita un posto in cui poter stare all'aperto in mezzo alla natura mentre studi o lavori.",
    meta: [
      { icon: "location", text: "Cremona" },   
    ],
    tags: [],
    image: spazioaperto,
    badge: "Prenotabile",
    badgeColor: "cyan",
    ctaColor: "cyan",
    ctaLabel: "Scopri di più",
  },
  {
    id: 2,
    title: "Ufficio classico",
    subtitle: "spazio isolato",
    description:
      "scegli un posto isolato in cui puoi stare concentrato al meglio e ascoltare musica.",
    meta: [
      { icon: "location", text: "Mantova" },  
    ],
    image: isolatespace,
    badge: "Prenotabile",
    badgeColor: "cyan",
    ctaColor: "cyan",
    ctaLabel: "Scopri di più",
    tags: [],
  },
  {
    id: 3,
    title: "Openspace condiviso",
    subtitle: "spazio condiviso",
    description:
      "Scegli uno spazio in cui puoi studiare studiare in compagnia o lavorare con i tuoi colleghi",
    meta: [
      { icon: "location", text: "Brescia" },  
    ],
    tags: [],
    badge: "Nuovo! (Prenotabile)",
    badgeColor: "cyan",
    image: openspace,
    ctaColor: "cyan",
    ctaLabel: "Scopri di più",
  },
];

export const FORM_FIELDS: FieldConfig[] = [
  {
    name: "numeroPersone",
    label: "Numero persone all'interno della tua attività",
    type: "number",
    required: true,
    half: true,
  },
  {
    name: "spazioSelezionato",
    label: "Seleziona lo spazio che vuoi utilizzare",
    type: "select",
    required: true,
    half: true,
    options: ["Openspace", "Spazio all'aperto", "Spazio condiviso", "Spazio isolato"],
  },
  {
    name: "città",
    label: "Città",
    type: "text",
    required: true,
    half: true,
  },
  {
    name: "azienda",
    label: "Inserire il tuo nome o il nome dell'azienda",
    type: "text",
    required: true,
    half: true,
  },
  {
    name: "email",
    label: "Email di contatto",
    type: "email",
    required: true,
  },
  {
    name: "descrizione",
    label: "Descrizione della tua attività (se sei studente scrivi studente)",
    type: "textarea",
    required: true,
    rows: 5,
    maxLength: 2500,
    hint: "Descrivi metodi, prodotti e storia aziendale (max 2500 car.)",
  },
  {
    name: "privacy",
    label: "Acconsento al trattamento dei dati personali",
    type: "checkbox",
    required: true,
  },
];

export const COLUMNS: ColumnDef<Candidatura>[] = [
  { key: "numeroPersone",       label: "Numero Persone" },
  { key: "spazioSelezionato",   label: "Spazio Selezionato" },
  { key: "città",               label: "Città" },
  { key: "azienda",             label: "Azienda" },
  { key: "email",               label: "Email" },
  { key: "statoApprovazione",   label: "Stato", badge: true },
];

export const STATUS_MAP: StatusMap = {
  "In Attesa": { color: "yellow" },
  "Approvato": { color: "green" },
  "Rifiutato": { color: "red" },
};