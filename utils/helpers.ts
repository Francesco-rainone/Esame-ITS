/** Restituisce le iniziali di un nome (max 2 lettere). */
export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
};

const STATUS_COLOR_MAP: Record<string, string> = {
  "in attesa": "yellow",
  approvato: "green",
  verificato: "green",
  attivo: "green",
  rifiutato: "red",
  disattivato: "red",
  "in revisione": "blue",
  bozza: "gray",
  false: "gray",
  true: "green",
};

export const guessStatusColor = (value: unknown): string => {
  return STATUS_COLOR_MAP[String(value).toLowerCase()] ?? "blue";
};

/** Genera un ID univoco per i toast. */
export const uniqueId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
};

/** Classnames semplificato */
export const cn = (...classes: (string | false | null | undefined)[]): string => {
  return classes.filter(Boolean).join(" ");
};

/** Genera le classi tema per il Footer */
export const getFooterTheme = (dark: boolean) => {
  return {
    bg: dark ? "bg-gray-900" : "bg-gray-50 border-t border-gray-200",
    textMain: dark ? "text-white" : "text-gray-900",
    textMuted: dark ? "text-gray-400" : "text-gray-500",
    textHover: dark ? "hover:text-white" : "hover:text-blue-700",
    divider: dark ? "border-gray-800" : "border-gray-200",
    headingCls: dark ? "text-gray-200" : "text-gray-700",
    socialButton: dark
      ? "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
      : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900",
  };
};

/** Calcola la classe Tailwind per le colonne della griglia del Footer */
export const getGridColsClass = (columnCount: number): string => {
  const cols = Math.min(4, columnCount);
  const classMap = ['lg:grid-cols-1', 'lg:grid-cols-2', 'lg:grid-cols-3', 'lg:grid-cols-4'];
  return classMap[cols - 1] || 'lg:grid-cols-4';
};