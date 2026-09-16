import type { CollectionConfig } from "payload";

import { slugField } from "./fields/shared";

export const LegalPages: CollectionConfig = {
  slug: "legal-pages",
  admin: {
    useAsTitle: "title",
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
    {
      name: "content",
      type: "richText",
    },
  ],
};
