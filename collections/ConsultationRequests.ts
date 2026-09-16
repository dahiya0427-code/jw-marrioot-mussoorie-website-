import type { CollectionConfig } from "payload";

import { isStaff } from "./access/isStaff";

// Maps each guest-facing enquiry type (PRD §4.5) to the internal team that
// owns follow-up. Kept as a pure lookup so the beforeChange hook below and
// any future reporting/routing logic share one source of truth.
const DEPARTMENT_BY_ENQUIRY_TYPE: Record<string, "sales" | "spa-reservations"> = {
  "weddings-events": "sales",
  "spa-wellness": "spa-reservations",
  "general-corporate": "sales",
};

export const ConsultationRequests: CollectionConfig = {
  slug: "consultation-requests",
  admin: {
    useAsTitle: "name",
    group: "Guest Requests",
    // Staff queue view (PRD §4.4): lead with what a Sales/Spa coordinator
    // triages by — who, what kind of enquiry, when, and where it stands.
    defaultColumns: ["name", "enquiryType", "status", "createdAt", "email"],
  },
  access: {
    // Guests submit requests (general/weddings/MICE/spa enquiries) through a
    // public API route (POST /api/consultations). Only staff can read/update/delete here.
    create: isStaff,
    read: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data && typeof data.enquiryType === "string") {
          data.department = DEPARTMENT_BY_ENQUIRY_TYPE[data.enquiryType] ?? "sales";
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "phone",
      type: "text",
    },
    {
      name: "enquiryType",
      type: "select",
      required: true,
      defaultValue: "general-corporate",
      options: [
        { label: "Weddings & Events RFP", value: "weddings-events" },
        { label: "Spa & Wellness consultation", value: "spa-wellness" },
        { label: "General / Corporate enquiry", value: "general-corporate" },
      ],
      admin: {
        description: "Drives routing (PRD §4.5) — see the derived Department field.",
      },
    },
    {
      name: "department",
      type: "select",
      options: [
        { label: "Sales", value: "sales" },
        { label: "Spa / Reservations", value: "spa-reservations" },
      ],
      admin: {
        readOnly: true,
        description: "Derived automatically from Enquiry type — the team this request is routed to.",
      },
    },
    {
      name: "subject",
      type: "text",
      admin: {
        description: 'Original free-text selection from the form (e.g. "Dining reservation"), kept for staff context beyond the 3-way routing category.',
      },
    },
    {
      name: "eventType",
      type: "text",
      admin: {
        description: "Wedding / Corporate / Social — only relevant for Weddings & Events RFPs.",
        condition: (data) => data?.enquiryType === "weddings-events",
      },
    },
    {
      name: "preferredDate",
      type: "date",
    },
    {
      name: "guestCount",
      type: "number",
      min: 0,
    },
    {
      name: "message",
      type: "textarea",
    },
    {
      name: "source",
      type: "text",
      admin: {
        readOnly: true,
        description: 'Which frontend form this came through, e.g. "contact" or "events".',
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "Contacted", value: "contacted" },
        { label: "Proposal Sent", value: "proposal-sent" },
        { label: "Won", value: "won" },
        { label: "Lost", value: "lost" },
      ],
    },
  ],
};
