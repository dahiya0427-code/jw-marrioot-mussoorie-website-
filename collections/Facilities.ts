import type { CollectionConfig } from "payload";

import { heroImageField, slugField } from "./fields/shared";

export const Facilities: CollectionConfig = {
  slug: "facilities",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
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
      name: "content",
      type: "richText",
    },
  ],
};
