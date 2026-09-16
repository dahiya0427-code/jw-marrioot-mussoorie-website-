const STEP_LABELS = ["Room & dates", "Add-ons", "Guest details", "Payment"] as const;

export interface StepIndicatorProps {
  /** 1-based current step. Steps below this render as complete (gold, checked). */
  currentStep: number;
}

/**
 * Horizontal step indicator: gold for the active/completed steps, grey for
 * upcoming ones, per the /book flow spec.
 */
export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <ol className="flex items-start justify-between gap-2">
      {STEP_LABELS.map((label, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isComplete = stepNumber < currentStep;
        const isFilled = isActive || isComplete;

        return (
          <li key={label} className="flex flex-1 flex-col items-center gap-2 text-center">
            <div className="flex w-full items-center">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-sans text-sm font-semibold transition-colors ${
                  isFilled ? "bg-champagne-gold text-walnut-brown" : "bg-hairline text-soft-grey"
                }`}
                aria-hidden="true"
              >
                {isComplete ? "✓" : stepNumber}
              </span>
              {index < STEP_LABELS.length - 1 ? (
                <span
                  className={`mx-1 h-px flex-1 ${isComplete ? "bg-champagne-gold" : "bg-hairline"}`}
                  aria-hidden="true"
                />
              ) : null}
            </div>
            <span
              className={`font-sans text-[0.65rem] tracking-[0.08em] uppercase sm:text-xs ${
                isActive ? "text-walnut-brown" : "text-soft-grey"
              }`}
            >
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
