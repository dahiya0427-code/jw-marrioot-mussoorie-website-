"use client";

import { useState } from "react";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQAccordionProps {
  items: FAQItem[];
}

/**
 * Simple accessible accordion for FAQ blocks. Only one panel open at a
 * time; each trigger is a real <button> with aria-expanded/aria-controls
 * so it works with keyboard and screen readers.
 */
export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-hairline border-y border-hairline">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-trigger-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left font-sans text-base text-charcoal-ink"
              >
                <span className="font-medium">{item.question}</span>
                <span
                  aria-hidden="true"
                  className={`shrink-0 text-xl text-champagne-gold transition-transform duration-200 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-5 font-sans text-sm text-charcoal-ink/80"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
