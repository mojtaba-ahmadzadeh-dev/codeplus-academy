export enum Roles {
  ADMIN = "admin",
  TEACHER = "teacher",
  USER = "user",
}

export enum Permissions {
  // User
  USER_GETALL = "user:get-all",
  USER_BY_ID = "user:by-id",
  USER_CHANGE = "user:change-role",
  USER_BY_UPDATE_ID = "user:by-update-id",
  USER_BY_REMOVE_ID = "user:by-remove-id",
  USER_BAN = "user:ban/unban",
  USER_CREATE = "user:create",

  // Category
  CATEGORY_CREATE = "category:create",
  CATEGORY_UPDATE_BY_ID = "category:update",
  CATEGORY_GETALL = "category:get-all",
  CATEGORY_DELETE_BY_ID = "category:delete-by-id",
  CATEGORY_GET_BY_ID = "category:get-by-id",

  // Course
  COURSE_CREATE = "course:create",
  COURSE_GETALL = "course:get-all",
  COURSE_GET_BY_ID = "course:get-by-id",
  COURSE_UPDATE_BY_ID = "course:update-by-id",
  COURSE_DELETE_BY_ID = "course:delete-by-id",

  // Lesson
  LESSON_CREATE = "lesson:create",
  LESSON_GETALL = "lesson:get-all",
  LESSON_BY_ID = "lesson:get-by-id",
  LESSON_UPDATE = "lesson:update-by-id",
  LESSON_DELETE = "lesson:delete-by-id",

  // Capture
  CAPTURE_CREATE = "capture:create",
  CAPTURE_GETALL = "capture:get-all",
  CAPTURE_BY_ID = "capture:get-by-id",
  CAPTURE_UPDATE = "capture:update",
  CAPTURE_DELETE = "capture:delete",
}

const adminPermissions: Permissions[] = [
  // User
  Permissions.USER_GETALL,
  Permissions.USER_BY_ID,
  Permissions.USER_CHANGE,
  Permissions.USER_BY_UPDATE_ID,
  Permissions.USER_BY_REMOVE_ID,
  Permissions.USER_BAN,
  Permissions.USER_CREATE,

  // Category
  Permissions.CATEGORY_CREATE,
  Permissions.CATEGORY_UPDATE_BY_ID,
  Permissions.CATEGORY_GETALL,
  Permissions.CATEGORY_DELETE_BY_ID,
  Permissions.CATEGORY_GET_BY_ID,

  // Course
  Permissions.COURSE_CREATE,
  Permissions.COURSE_GETALL,
  Permissions.COURSE_GET_BY_ID,
  Permissions.COURSE_UPDATE_BY_ID,
  Permissions.COURSE_DELETE_BY_ID,

  // Lesson
  Permissions.LESSON_CREATE,
  Permissions.LESSON_GETALL,
  Permissions.LESSON_BY_ID,
  Permissions.LESSON_UPDATE,
  Permissions.LESSON_DELETE,

  // Capture
  Permissions.CAPTURE_CREATE,
  Permissions.CAPTURE_GETALL,
  Permissions.CAPTURE_BY_ID,
  Permissions.CAPTURE_UPDATE,
  Permissions.CAPTURE_DELETE,
];

const teacherPermissions: Permissions[] = [
  // Category
  Permissions.CATEGORY_CREATE,
  Permissions.CATEGORY_UPDATE_BY_ID,
  Permissions.CATEGORY_GETALL,
  Permissions.CATEGORY_GET_BY_ID,

  // Course
  Permissions.COURSE_CREATE,
  Permissions.COURSE_GETALL,
  Permissions.COURSE_GET_BY_ID,
  Permissions.COURSE_UPDATE_BY_ID,
  Permissions.COURSE_DELETE_BY_ID,

  // Lesson
  Permissions.LESSON_CREATE,
  Permissions.LESSON_GETALL,
  Permissions.LESSON_BY_ID,
  Permissions.LESSON_UPDATE,
  Permissions.LESSON_DELETE,

  // Capture
  Permissions.CAPTURE_CREATE,
  Permissions.CAPTURE_GETALL,
  Permissions.CAPTURE_BY_ID,
  Permissions.CAPTURE_UPDATE,
  Permissions.CAPTURE_DELETE,
];

export const RolePermissions: Record<Roles, Permissions[]> = {
  [Roles.ADMIN]: adminPermissions,
  [Roles.TEACHER]: teacherPermissions,
  [Roles.USER]: [],
};
