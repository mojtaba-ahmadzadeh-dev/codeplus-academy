export enum Roles {
  ADMIN = "admin",
  TEACHER = "teacher",
  USER = "user",
}

export enum Permissions {
  USER_GETALL = "user:get-all",
  USER_BY_ID = "user:by-id",
  USER_CHANGE = "user:change-role",
  USER_BY_UPDATE_ID = "user:by-update-id",
  USER_BY_REMOVE_ID = "user:by-remove-id",
  USER_BAN = "user:ban/unban",
  USER_CREATE = "user:create",
  CREATE_CATEGORY = "category:create",
  CREATE_UPDATE_BY_ID = "category:update",
  CATEGORY_GETALL = "category:get-all",
}

export const RolePermissions: Record<Roles, Permissions[]> = {
  [Roles.ADMIN]: [
    Permissions.USER_GETALL,
    Permissions.USER_CHANGE,
    Permissions.USER_BY_ID,
    Permissions.USER_BY_UPDATE_ID,
    Permissions.USER_BY_REMOVE_ID,
    Permissions.USER_BAN,
    Permissions.USER_CREATE,
    Permissions.CREATE_CATEGORY,
    Permissions.CREATE_UPDATE_BY_ID,
    Permissions.CATEGORY_GETALL,
  ],
  [Roles.TEACHER]: [
    Permissions.USER_GETALL,
    Permissions.USER_BY_ID,
    Permissions.USER_BY_UPDATE_ID,
    Permissions.USER_BY_REMOVE_ID,
    Permissions.USER_BAN,
    Permissions.USER_CREATE,
    Permissions.CREATE_UPDATE_BY_ID,
    Permissions.CREATE_UPDATE_BY_ID,
    Permissions.CATEGORY_GETALL,
  ],
  [Roles.USER]: [],
};
