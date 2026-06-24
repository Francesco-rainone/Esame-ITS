"use client";
import type { Step, AccentColor, StepLayout } from "@/utils/types";
import Icon from "@/components/atoms/Icon";

interface StepGuideProps {
  steps: Step[];
  title?: string;
  subtitle?: string;
  layout?: StepLayout;
  accent?: AccentColor;
}

interface AccentClasses {
  bg: string;
  text: string;
  line: string;
}


const ACCENTS: Record<AccentColor, AccentClasses> = {
  slate:   { bg: "bg-slate-100",   text: "text-slate-600",   line: "bg-slate-200" },
  gray:    { bg: "bg-gray-100",    text: "text-gray-600",    line: "bg-gray-200" },
  zinc:    { bg: "bg-zinc-100",    text: "text-zinc-600",    line: "bg-zinc-200" },
  neutral: { bg: "bg-neutral-100", text: "text-neutral-600", line: "bg-neutral-200" },
  stone:   { bg: "bg-stone-100",   text: "text-stone-600",   line: "bg-stone-200" },
  red:     { bg: "bg-red-100",     text: "text-red-600",     line: "bg-red-200" },
  orange:  { bg: "bg-orange-100",  text: "text-orange-600",  line: "bg-orange-200" },
  amber:   { bg: "bg-amber-100",   text: "text-amber-600",   line: "bg-amber-200" },
  yellow:  { bg: "bg-yellow-100",  text: "text-yellow-600",  line: "bg-yellow-200" },
  lime:    { bg: "bg-lime-100",    text: "text-lime-600",    line: "bg-lime-200" },
  green:   { bg: "bg-green-100",   text: "text-green-600",   line: "bg-green-200" },
  emerald: { bg: "bg-emerald-100", text: "text-emerald-600", line: "bg-emerald-200" },
  teal:    { bg: "bg-teal-100",    text: "text-teal-600",    line: "bg-teal-200" },
  cyan:    { bg: "bg-cyan-100",    text: "text-cyan-600",    line: "bg-cyan-200" },
  sky:     { bg: "bg-sky-100",     text: "text-sky-600",     line: "bg-sky-200" },
  blue:    { bg: "bg-blue-100",    text: "text-blue-600",    line: "bg-blue-200" },
  indigo:  { bg: "bg-indigo-100",  text: "text-indigo-600",  line: "bg-indigo-200" },
  violet:  { bg: "bg-violet-100",  text: "text-violet-600",  line: "bg-violet-200" },
  purple:  { bg: "bg-purple-100",  text: "text-purple-600",  line: "bg-purple-200" },
  fuchsia: { bg: "bg-fuchsia-100", text: "text-fuchsia-600", line: "bg-fuchsia-200" },
  pink:    { bg: "bg-pink-100",    text: "text-pink-600",    line: "bg-pink-200" },
  rose:    { bg: "bg-rose-100",    text: "text-rose-600",    line: "bg-rose-200" },
  brown:   { bg: "bg-amber-100",   text: "text-amber-700",   line: "bg-amber-200" },
};

// ── Layout orizzontale ──────────────────────────────────────────────
const HorizontalSteps = ({ steps, accent }: { steps: Step[]; accent: AccentColor }) => {
  const a = ACCENTS[accent];
  return (
    <div className="flex flex-col sm:flex-row gap-0">
      {steps.map((s, i) => (
        <div key={i} className="flex-1 relative flex flex-col items-center text-center px-4">
          {i < steps.length - 1 && (
            <div className={`hidden sm:block absolute top-7 left-1/2 w-full h-0.5 ${a.line} z-0`} />
          )}
          <div className={`relative z-10 w-14 h-14 rounded-2xl ${a.bg} ${a.text} flex items-center justify-center text-2xl font-black mb-4 shadow-sm`}>
            {s.icon ? <Icon name={s.icon} size="lg" /> : (i + 1)}
          </div>
          <h3 className="text-sm font-bold text-gray-900 mb-1">{s.title}</h3>
          <p className="text-xs text-gray-500 leading-relaxed">{s.description}</p>
        </div>
      ))}
    </div>
  );
};

// ── Layout verticale ─────────────────────────────────────────────────
const VerticalSteps = ({ steps, accent }: { steps: Step[]; accent: AccentColor }) => {
  const a = ACCENTS[accent];
  return (
    <div className="flex flex-col gap-0">
      {steps.map((s, i) => (
        <div key={i} className="flex gap-5 relative">
          {i < steps.length - 1 && (
            <div className={`absolute left-5 top-14 bottom-0 w-0.5 ${a.line} translate-x-[1px]`} />
          )}
          <div className={`w-11 h-11 rounded-xl ${a.bg} ${a.text} flex items-center justify-center text-xl font-black shrink-0 shadow-sm z-10`}>
            {s.icon ? <Icon name={s.icon} size="lg" /> : (i + 1)}
          </div>
          <div className="pb-8">
            <h3 className="text-sm font-bold text-gray-900 mb-1">{s.title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed max-w-sm">{s.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// ── Layout numerato (grande) ─────────────────────────────────────────
const NumberedSteps = ({ steps, accent }: { steps: Step[]; accent: AccentColor }) => {
  const a = ACCENTS[accent];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {steps.map((s, i) => (
        <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className={`text-3xl font-black mb-3 ${a.text}`}>{String(i + 1).padStart(2, "0")}</div>
          {s.icon && (
            <div className="text-3xl mb-3">
              <Icon name={s.icon} size="2x" />
            </div>
          )}
          <h3 className="text-base font-bold text-gray-900 mb-2">{s.title}</h3>
          <p className="text-sm text-gray-500 leading-relaxed">{s.description}</p>
        </div>
      ))}
    </div>
  );
};

const StepGuide = ({
  steps = [],
  title = "",
  subtitle = "",
  layout = "horizontal",
  accent = "blue",
}: StepGuideProps) => {
  return (
    <section className="w-full py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{title}</h2>}
            {subtitle && <p className="text-gray-500 text-base max-w-xl mx-auto">{subtitle}</p>}
          </div>
        )}

        {layout === "horizontal" && <HorizontalSteps steps={steps} accent={accent} />}
        {layout === "vertical"   && <VerticalSteps   steps={steps} accent={accent} />}
        {layout === "numbered"   && <NumberedSteps   steps={steps} accent={accent} />}
      </div>
    </section>
  );
};

export default StepGuide;