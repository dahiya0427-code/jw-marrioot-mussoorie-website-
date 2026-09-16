import type { CollectionConfig } from "payload";

export const StaffUsers: CollectionConfig = {
  slug: "staff-users",
  auth: true,
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "role"],
  },
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "front-office",
      options: [
        { label: "Super Admin", value: "super-admin" },
        { label: "Reservations", value: "reservations" },
        { label: "Front Office", value: "front-office" },
        { label: "Marketing", value: "marketing" },
        { label: "Sales", value: "sales" },
      ],
    },
  ],
};
