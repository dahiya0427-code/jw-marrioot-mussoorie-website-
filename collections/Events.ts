import type { CollectionConfig } from "payload";

import { heroImageField, slugField } from "./fields/shared";

export const Events: CollectionConfig = {
  slug: "events",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "startDate", "updatedAt"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    slugField,
    heroImageField,
    {
      name: "startDate",
      type: "date",
    },
    {
      name: "content",
      type: "richText",
    },
  ],
};
