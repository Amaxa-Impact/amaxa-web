

export const user_permissions = [
  "none",
  "read:users",
  "add:project",
  "add:tags",
  "add:events",
  "edit:project",
  "edit:tags",
  "edit:events",
] as const;
export type UserPermissions = (typeof user_permissions)[number];
