"use client";

import { useReducer } from "react";
import { StepIndicator } from "./StepIndicator";
import { SummaryPanel } from "./SummaryPanel";
import { RoomDatesStep } from "./steps/RoomDatesStep";
import { AddOnsStep } from "./steps/AddOnsStep";
import { GuestDetailsStep } from "./steps/GuestDetailsStep";
import { PaymentStep, type BookingCreatedPayload } from "./steps/PaymentStep";
import { ConfirmationStep } from "./steps/ConfirmationStep";
import type { BookingWizardState, GuestDetails } from "./types";
import { ACCOMMODATION_CATEGORIES } from "@/lib/accommodation";

export interface BookingWizardProps {
  /** Pre-selected room slug from ?room=<slug> on /book, already validated server-side. */
  initialRoomSlug?: string;
}

type Action =
  | { type: "SET_ROOM"; slug: string }
  | { type: "SET_DATES"; checkIn: string; checkOut: string }
  | { type: "SET_OCCUPANCY"; adults: number; children: number }
  | { type: "TOGGLE_ADDON"; id: string }
  | { type: "SET_GUEST"; patch: Partial<GuestDetails> }
  | { type: "GO_TO_STEP"; step: BookingWizardState["step"] }
  | { type: "BOOKING_CREATED"; payload: BookingCreatedPayload }
  | { type: "CONFIRMED"; reference: string }
  | { type: "UNCONFIGURED"; reference: string };

interface WizardReducerState extends BookingWizardState {
  phase: "wizard" | "confirmation";
  confirmationStatus: "confirmed" | "pending";
}

function defaultDateOffset(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function buildInitialState(initialRoomSlug?: string): WizardReducerState {
  const roomSlug =
    initialRoomSlug && ACCOMMODATION_CATEGORIES.some((c) => c.slug === initialRoomSlug)
      ? initialRoomSlug
      : ACCOMMODATION_CATEGORIES[0].slug;

  return {
    step: 1,
    roomSlug,
    checkIn: defaultDateOffset(7),
    checkOut: defaultDateOffset(8),
    adults: 2,
    children: 0,
    addOnIds: [],
    guest: { name: "", email: "", phone: "", specialRequests: "" },
    bookingId: null,
    reference: null,
    razorpayOrder: null,
    razorpayKeyId: null,
    phase: "wizard",
    confirmationStatus: "confirmed",
  };
}

function reducer(state: WizardReducerState, action: Action): WizardReducerState {
  switch (action.type) {
    case "SET_ROOM":
      return { ...state, roomSlug: action.slug };
    case "SET_DATES":
      return { ...state, checkIn: action.checkIn, checkOut: action.checkOut };
    case "SET_OCCUPANCY":
      return { ...state, adults: action.adults, children: action.children };
    case "TOGGLE_ADDON": {
      const has = state.addOnIds.includes(action.id);
      return {
        ...state,
        addOnIds: has ? state.addOnIds.filter((id) => id !== action.id) : [...state.addOnIds, action.id],
      };
    }
    case "SET_GUEST":
      return { ...state, guest: { ...state.guest, ...action.patch } };
    case "GO_TO_STEP":
      return { ...state, step: action.step };
    case "BOOKING_CREATED":
      return {
        ...state,
        bookingId: action.payload.bookingId,
        reference: action.payload.reference,
        razorpayOrder: action.payload.razorpayOrder,
        razorpayKeyId: action.payload.razorpayKeyId,
      };
    case "CONFIRMED":
      return { ...state, phase: "confirmation", confirmationStatus: "confirmed", reference: action.reference };
    case "UNCONFIGURED":
      return { ...state, phase: "confirmation", confirmationStatus: "pending", reference: action.reference };
    default:
      return state;
  }
}

export function BookingWizard({ initialRoomSlug }: BookingWizardProps) {
  const [state, dispatch] = useReducer(reducer, initialRoomSlug, buildInitialState);

  if (state.phase === "confirmation") {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[640px] rounded-2xl border border-hairline bg-white p-6 shadow-sm sm:p-10">
          <ConfirmationStep
            reference={state.reference ?? ""}
            guestEmail={state.guest.email}
            status={state.confirmationStatus}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <StepIndicator currentStep={state.step} />

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="mx-auto w-full max-w-[640px]">
          <div className="rounded-2xl border border-hairline bg-white p-6 shadow-sm sm:p-8">
            {state.step === 1 ? (
              <RoomDatesStep
                roomSlug={state.roomSlug}
                checkIn={state.checkIn}
                checkOut={state.checkOut}
                adults={state.adults}
                children={state.children}
                onChangeRoom={(slug) => dispatch({ type: "SET_ROOM", slug })}
                onChangeDates={(checkIn, checkOut) => dispatch({ type: "SET_DATES", checkIn, checkOut })}
                onChangeOccupancy={(adults, children) => dispatch({ type: "SET_OCCUPANCY", adults, children })}
                onNext={() => dispatch({ type: "GO_TO_STEP", step: 2 })}
              />
            ) : null}

            {state.step === 2 ? (
              <AddOnsStep
                addOnIds={state.addOnIds}
                onToggle={(id) => dispatch({ type: "TOGGLE_ADDON", id })}
                onBack={() => dispatch({ type: "GO_TO_STEP", step: 1 })}
                onNext={() => dispatch({ type: "GO_TO_STEP", step: 3 })}
              />
            ) : null}

            {state.step === 3 ? (
              <GuestDetailsStep
                guest={state.guest}
                onChange={(patch) => dispatch({ type: "SET_GUEST", patch })}
                onBack={() => dispatch({ type: "GO_TO_STEP", step: 2 })}
                onNext={() => dispatch({ type: "GO_TO_STEP", step: 4 })}
              />
            ) : null}

            {state.step === 4 ? (
              <PaymentStep
                state={state}
                onBookingCreated={(payload) => dispatch({ type: "BOOKING_CREATED", payload })}
                onConfirmed={(reference) => dispatch({ type: "CONFIRMED", reference })}
                onUnconfigured={(reference) => dispatch({ type: "UNCONFIGURED", reference })}
                onBack={() => dispatch({ type: "GO_TO_STEP", step: 3 })}
              />
            ) : null}
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <SummaryPanel
            roomSlug={state.roomSlug}
            checkIn={state.checkIn}
            checkOut={state.checkOut}
            adults={state.adults}
            children={state.children}
            addOnIds={state.addOnIds}
          />
        </div>
      </div>
    </div>
  );
}
