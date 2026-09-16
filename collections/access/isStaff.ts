import type { Access } from "payload";

/**
 * Basic access stub: only logged-in StaffUsers may perform the action.
 * Guests never write to these collections directly — they'll submit through
 * a public API route in a later phase. Role-per-field logic can be layered
 * on top of this later; this is intentionally coarse for the scaffolding phase.
 */
export const isStaff: Access = ({ req }) => Boolean(req.user);
