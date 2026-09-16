import type { CollectionConfig } from "payload";

import { isStaff } from "./access/isStaff";

export const ConsultationRequests: CollectionConfig = {
  slug: "consultation-requests",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "status", "email", "updatedAt"],
  },
  access: {
    // Guests submit requests (weddings/MICE/events enquiries) through a public
    // API route in a later phase. Only staff can read/update/delete here.
    create: isStaff,
    read: isStaff,
    update: isStaff,
    delete: isStaff,
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
      name: "message",
      type: "textarea",
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
