export enum Roles {
  ADMIN = "admin",
  TEACHER = "teacher",
  USER = "user",
}

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
