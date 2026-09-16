import type { CollectionConfig } from "payload";

import { isStaff } from "./access/isStaff";

export const Bookings: CollectionConfig = {
  slug: "bookings",
  admin: {
    useAsTitle: "guestName",
    defaultColumns: ["guestName", "status", "checkIn", "checkOut", "updatedAt"],
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
    },
    {
      name: "checkIn",
      type: "date",
    },
    {
      name: "checkOut",
      type: "date",
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
