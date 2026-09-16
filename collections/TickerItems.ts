import type { CollectionConfig } from "payload";

export const TickerItems: CollectionConfig = {
  slug: "ticker-items",
  admin: {
    useAsTitle: "text",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "text",
      type: "text",
      required: true,
      admin: {
        description: "Short message shown in the site-wide announcement ticker.",
      },
    },
    {
      name: "link",
      type: "text",
    },
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
    },
  ],
};
