export interface GuestDetails {
  name: string;
  email: string;
  phone: string;
  specialRequests: string;
}

export interface RazorpayOrderSummary {
  id: string;
  amount: number;
  currency: string;
}

export interface BookingWizardState {
  /** 1: Room & dates, 2: Add-ons, 3: Guest details, 4: Payment. */
  step: 1 | 2 | 3 | 4;
  roomSlug: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  addOnIds: string[];
  guest: GuestDetails;
  bookingId: string | null;
  reference: string | null;
  razorpayOrder: RazorpayOrderSummary | null;
  razorpayKeyId: string | null;
}
