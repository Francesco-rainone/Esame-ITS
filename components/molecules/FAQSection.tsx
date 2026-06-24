"use client";
import type { AccordionItem, AccordionVariant } from "@/utils/types";
import { useAccordion } from "@/utils/hooks/useAccordion";

interface AccordionProps {
  items: AccordionItem[];
  title?: string;
  subtitle?: string;
  allowMultiple?: boolean;
  defaultOpen?: number;
  variant?: AccordionVariant;
}

const WRAPPER_CLS: Record<AccordionVariant, string> = {
  bordered:  "space-y-2",
  flat:      "divide-y divide-gray-100",
  separated: "space-y-3",
};

const itemOpenCls = (variant: AccordionVariant, isOpen: boolean): string => {
  const map: Record<AccordionVariant, Record<"open" | "closed", string>> = {
    bordered: {
      open:   "border border-blue-200 bg-blue-50/40 rounded-xl",
      closed: "border border-gray-100 bg-white rounded-xl",
    },
    flat: {
      open:   "",
      closed: "",
    },
    separated: {
      open:   "border border-blue-200 bg-blue-50/40 rounded-2xl shadow-sm",
      closed: "border border-gray-100 bg-white rounded-2xl",
    },
  };
  return map[variant][isOpen ? "open" : "closed"];
};

export default function FAQSection({
  items = [],
  title = "",
  subtitle = "",
  allowMultiple = false,
  defaultOpen = -1,
  variant = "bordered",
}: AccordionProps) {
  const [openSet, toggle] = useAccordion(defaultOpen, allowMultiple);

  return (
    <section className="w-full py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-10">
            {title && (
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {title}
              </h2>
            )}
            {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
          </div>
        )}

        <div className={WRAPPER_CLS[variant]} role="list">
          {items.map((item, i) => {
            const isOpen = openSet.has(i);
            const cls = itemOpenCls(variant, isOpen);

            return (
              <div
                key={i}
                role="listitem"
                className={`overflow-hidden transition-colors duration-200 ${cls}`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left gap-4 group"
                  aria-expanded={String(isOpen) as "true" | "false"}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-question-${i}`}
                >
                  <span
                    className={`text-sm font-semibold leading-snug transition-colors ${
                      isOpen
                        ? "text-blue-700"
                        : "text-gray-800 group-hover:text-blue-700"
                    }`}
                  >
                    {item.question}
                  </span>

                  <span
                    className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 ${
                      isOpen
                        ? "bg-blue-700 text-white rotate-180"
                        : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                    }`}
                    aria-hidden="true"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>

                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}