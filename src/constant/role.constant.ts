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

  // Course Comment
  COURSE_COMMENT_CREATE = "course-comment:create",
  COURSE_COMMENT_GETALL = "course-comment:get-all",
  COURSE_COMMENT_BY_ID = "course-comment:get-by-id",
  COURSE_COMMENT_UPDATE = "course-comment:update",
  COURSE_COMMENT_ACCEPT = "course-comment:accept",
  COURSE_COMMENT_REJECT = "course-comment:reject",
  COURSE_COMMENT_DELETE = "course-comment:delete",

  // Blog
  BLOG_CREATE = "blog:create",
  BLOG_CREATE_ADMIN = "blog-admin:create",
  BLOG_UPDATE = "blog:update",
  BLOG_DELETE = "blog:delete",
  BLOG_LIKE = "blog:like",
  BLOG_BOOKMARK = "blog:bookmark",
  BLOG_READ = "blog:read",
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

  // Course Comment
  Permissions.COURSE_COMMENT_CREATE,
  Permissions.COURSE_COMMENT_GETALL,
  Permissions.COURSE_COMMENT_BY_ID,
  Permissions.COURSE_COMMENT_UPDATE,
  Permissions.COURSE_COMMENT_DELETE,

  // Blog
  Permissions.BLOG_CREATE,
  Permissions.BLOG_CREATE_ADMIN,
  Permissions.BLOG_UPDATE,
  Permissions.BLOG_DELETE,
  Permissions.BLOG_LIKE,
  Permissions.BLOG_BOOKMARK,
  Permissions.BLOG_READ,
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

  // Course Comment
  Permissions.COURSE_COMMENT_CREATE,
  Permissions.COURSE_COMMENT_GETALL,
  Permissions.COURSE_COMMENT_BY_ID,
  Permissions.COURSE_COMMENT_UPDATE,
  Permissions.COURSE_COMMENT_DELETE,

  // Blog
  Permissions.BLOG_CREATE,
  Permissions.BLOG_LIKE,
  Permissions.BLOG_BOOKMARK,
  Permissions.BLOG_READ,
];

export const RolePermissions: Record<Roles, Permissions[]> = {
  [Roles.ADMIN]: adminPermissions,
  [Roles.TEACHER]: teacherPermissions,
  [Roles.USER]: [
    Permissions.BLOG_LIKE,
    Permissions.BLOG_BOOKMARK,
    Permissions.BLOG_READ,
  ],
};
