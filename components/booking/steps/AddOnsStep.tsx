"use client";

import { BOOKING_ADD_ONS, formatInr } from "@/lib/booking";
import { Button } from "@/components/ui/Button";

export interface AddOnsStepProps {
  addOnIds: string[];
  onToggle: (id: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export function AddOnsStep({ addOnIds, onToggle, onBack, onNext }: AddOnsStepProps) {
  return (
    <div>
      <h2 className="font-display text-2xl text-walnut-brown">Enhance your stay</h2>
      <p className="mt-1 font-sans text-sm text-charcoal-ink/70">
        Optional add-ons — skip this step if you&rsquo;d rather decide later.
      </p>

      <div className="mt-6 space-y-3">
        {BOOKING_ADD_ONS.map((addOn) => {
          const checked = addOnIds.includes(addOn.id);
          return (
            <label
              key={addOn.id}
              className={`flex cursor-pointer items-start justify-between gap-4 rounded-xl border p-4 transition-colors ${
                checked ? "border-champagne-gold bg-warm-sand" : "border-hairline hover:border-champagne-gold/50"
              }`}
            >
              <span className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(addOn.id)}
                  className="mt-1 h-4 w-4 accent-champagne-gold"
                />
                <span>
                  <span className="block font-sans text-sm font-semibold text-walnut-brown">{addOn.label}</span>
                  <span className="block font-sans text-xs text-charcoal-ink/60">{addOn.description}</span>
                </span>
              </span>
              <span className="whitespace-nowrap font-sans text-sm font-semibold text-charcoal-ink">
                {formatInr(addOn.priceInInr)}
              </span>
            </label>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap justify-between gap-3">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="button" onClick={onNext} className="w-full sm:w-auto">
          Continue to guest details
        </Button>
      </div>
    </div>
  );
}
