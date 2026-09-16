import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: {
    useAsTitle: "guestName",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "guestName",
      type: "text",
      required: true,
    },
    {
      name: "quote",
      type: "textarea",
      required: true,
    },
    {
      name: "rating",
      type: "number",
      min: 1,
      max: 5,
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
    },
  ],
};
