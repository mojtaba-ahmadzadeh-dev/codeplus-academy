// src/constants/roles.ts
export enum Roles {
  ADMIN = "admin",
  TEACHER = "teacher",
  USER = "user", // به جای student
}

// دسترسی‌ها برای هر نقش
export const rolePermissions: Record<Roles, string[]> = {
  [Roles.ADMIN]: [
    "create-user",
    "update-user",
    "delete-user",
    "assign-role",
    "create-role",
    "assign-permission",
  ],
  [Roles.TEACHER]: ["create-course", "update-course", "view-users"],
  [Roles.USER]: ["view-course", "submit-assignment"],
};
