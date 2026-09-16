import type { CollectionConfig } from "payload";

export const GalleryItems: CollectionConfig = {
  slug: "gallery-items",
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
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
    },
    {
      name: "caption",
      type: "text",
    },
  ],
};
