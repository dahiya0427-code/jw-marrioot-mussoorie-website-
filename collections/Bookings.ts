import type { CollectionConfig } from "payload";

import { isStaff } from "./access/isStaff";

export const Bookings: CollectionConfig = {
  slug: "bookings",
  admin: {
    useAsTitle: "reference",
    group: "Guest Requests",
    // Staff queue view (PRD §4.4): reference first (it's the guest-facing
    // token and doubles as search anchor), then who/what/when/how much/status
    // — the columns a reservations desk actually triages by.
    defaultColumns: [
      "reference",
      "guestName",
      "roomTypeSlug",
      "checkIn",
      "checkOut",
      "amountInInr",
      "status",
    ],
  },
  access: {
    // Guests submit bookings through a public API route (added in a later
    // phase) using the local API / a server action with elevated privileges,
    // not by authenticating as a Payload user. Only staff can read/update/delete.
    create: isStaff,
    read: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  fields: [
    {
      name: "reference",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        readOnly: true,
        description: "Guest-facing booking reference (e.g. JWM-XXXXXXX) — doubles as the token for /booking/[reference].",
      },
    },
    {
      name: "guestName",
      type: "text",
      required: true,
    },
    {
      name: "guestEmail",
      type: "email",
      required: true,
    },
    {
      name: "guestPhone",
      type: "text",
    },
    {
      name: "roomType",
      type: "relationship",
      relationTo: "room-types",
      admin: {
        description: "Optional link to a CMS-managed RoomTypes document, once the catalog is migrated there.",
      },
    },
    {
      name: "roomTypeSlug",
      type: "text",
      required: true,
      admin: {
        description:
          'Accommodation category slug from lib/accommodation.ts (e.g. "luxury-suite") — the source of truth for the booking engine until room types are fully CMS-managed.',
      },
    },
    {
      name: "checkIn",
      type: "date",
      required: true,
    },
    {
      name: "checkOut",
      type: "date",
      required: true,
    },
    {
      name: "adults",
      type: "number",
      defaultValue: 2,
      min: 1,
    },
    {
      name: "children",
      type: "number",
      defaultValue: 0,
      min: 0,
    },
    {
      name: "addOns",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "priceInInr", type: "number", required: true },
      ],
    },
    {
      name: "amountInInr",
      type: "number",
      required: true,
      admin: {
        description:
          "Total charge amount in INR, computed server-side from the indicative nightly rate (lib/booking.ts) plus add-ons. NOT a live PMS rate — see lib/booking.ts.",
      },
    },
    {
      name: "currency",
      type: "text",
      defaultValue: "INR",
    },
    {
      name: "paymentGateway",
      type: "select",
      defaultValue: "razorpay",
      options: [
        { label: "Razorpay", value: "razorpay" },
        { label: "Stripe", value: "stripe" },
      ],
    },
    {
      name: "razorpayOrderId",
      type: "text",
      admin: { readOnly: true },
    },
    {
      name: "razorpayPaymentId",
      type: "text",
      admin: { readOnly: true },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "pending",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Confirmed", value: "confirmed" },
        { label: "Paid", value: "paid" },
        { label: "Cancelled", value: "cancelled" },
      ],
    },
    {
      name: "notes",
      type: "textarea",
    },
  ],
};
