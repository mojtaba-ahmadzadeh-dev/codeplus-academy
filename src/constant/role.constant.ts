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
  COURSE_BOOKMARK = "course:bookmark",
  COURSE_LIKE = "course:like",

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
  BLOG_GETALL = "blog:get-all",
  BLOG__BY_ID = "blog:get-by-id",
  BLOG_UPDATE = "blog:update",
  BLOG_DELETE = "blog:delete",
  BLOG_LIKE = "blog:like",
  BLOG_BOOKMARK = "blog:bookmark",
  BLOG_READ = "blog:read",
  BLOG__BOOKMARKS_ME = "blog:bookmarks-me",

  // Basket
  BASKET_CREATE = "basket:create",
  BASKET_GETALL = "basket:get-all",
  BASKET_UPDATE = "basket:update",
  BASKET_DELETE = "basket:delete",

  // Order
  ORDER_CREATE = "order:create",
  ORDER_GETALL = "order:get-all",
  ORDER_DELETE = "order:delete",
  ORDER_GETALL_ADMIN = "order:get-all-admin",
  ORDER_GET_BY_ID = "order:get-by-id",
  ORDER_UPDATE_STATUS = "order:change-status",
  ORDER_UPDATE_FILTER_BY_STATUS = "order:filter-by-status",

  // Ticket
  TICKET_CREATE = "ticket:create",
  TICKET_READ = "ticket:read",
  TICKET_READ_ALL = "ticket:read-all",
  TICKET_DELETE_ID = "ticket:delete-all",

  // Department
  DEPARTMENT_CREATE = "department:create",
  DEPARTMENT_GETALL = "department:get-all",
  DEPARTMENT_DELETE_ID = "department:delete",
  DEPARTMENT_UPDATE = "department:update",


  NOTIFICATION_CREATE = "notification:create",
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
  Permissions.BLOG__BOOKMARKS_ME,
  Permissions.BLOG_GETALL,
  Permissions.BLOG__BY_ID,
  Permissions.COURSE_BOOKMARK,
  Permissions.COURSE_LIKE,

  // Baket
  Permissions.BASKET_CREATE,
  Permissions.BASKET_GETALL,
  Permissions.BASKET_UPDATE,
  Permissions.BASKET_DELETE,

  // Order
  Permissions.ORDER_CREATE,
  Permissions.ORDER_GETALL,
  Permissions.ORDER_DELETE,
  Permissions.ORDER_GETALL_ADMIN,
  Permissions.ORDER_GET_BY_ID,
  Permissions.ORDER_UPDATE_STATUS,
  Permissions.ORDER_UPDATE_FILTER_BY_STATUS,

  // Ticket
  Permissions.TICKET_CREATE,
  Permissions.TICKET_READ,
  Permissions.TICKET_READ_ALL,
  Permissions.TICKET_DELETE_ID,
  Permissions.TICKET_DELETE_ID,

  // Department

  Permissions.DEPARTMENT_CREATE,
  Permissions.DEPARTMENT_GETALL,
  Permissions.DEPARTMENT_UPDATE,
  Permissions.DEPARTMENT_DELETE_ID,


  Permissions.NOTIFICATION_CREATE,
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
  Permissions.BLOG__BOOKMARKS_ME,
  Permissions.BLOG_GETALL,
  Permissions.BLOG__BY_ID,
  Permissions.COURSE_BOOKMARK,
  Permissions.COURSE_LIKE,

  // Basket
  Permissions.BASKET_CREATE,
  Permissions.BASKET_GETALL,
  Permissions.BASKET_UPDATE,
  Permissions.BASKET_DELETE,

  // Order
  Permissions.ORDER_CREATE,
  Permissions.ORDER_GETALL,
  Permissions.ORDER_DELETE,
  Permissions.ORDER_GET_BY_ID,
  Permissions.ORDER_UPDATE_STATUS,
  Permissions.ORDER_UPDATE_FILTER_BY_STATUS,

  // Ticket
  Permissions.TICKET_CREATE,
  Permissions.TICKET_READ,
  Permissions.TICKET_READ_ALL,
  Permissions.TICKET_DELETE_ID,

  // Notification

  Permissions.NOTIFICATION_CREATE

];

export const RolePermissions: Record<Roles, Permissions[]> = {
  [Roles.ADMIN]: adminPermissions,
  [Roles.TEACHER]: teacherPermissions,
  [Roles.USER]: [
    Permissions.BLOG_LIKE,
    Permissions.BLOG_BOOKMARK,
    Permissions.BLOG_READ,
    Permissions.BLOG__BOOKMARKS_ME,
    Permissions.BASKET_CREATE,
    Permissions.BASKET_GETALL,
    Permissions.BASKET_UPDATE,
    Permissions.BASKET_DELETE,
    Permissions.ORDER_CREATE,
    Permissions.ORDER_GETALL,
    Permissions.ORDER_DELETE,
    Permissions.ORDER_GET_BY_ID,
    Permissions.TICKET_CREATE,
    Permissions.TICKET_READ,
    Permissions.TICKET_READ_ALL,
    Permissions.TICKET_DELETE_ID,
  ],
};
