import type { Field } from "payload";

/**
 * Reusable `slug` field for any content collection.
 * Deeper validation/hooks (auto-generate from title, etc.) land in a later phase.
 */
export const slugField: Field = {
  name: "slug",
  type: "text",
  required: true,
  unique: true,
  index: true,
  admin: {
    position: "sidebar",
    description: "Unique URL-friendly identifier, e.g. 'walnut-grove-spa'.",
  },
};

/**
 * Reusable `heroImage` relationship to the Media collection.
 */
export const heroImageField: Field = {
  name: "heroImage",
  type: "upload",
  relationTo: "media",
  admin: {
    description: "Primary image shown at the top of this item.",
  },
};
