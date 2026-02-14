import { sequelize } from "../config/sequelize.config";
import { Blog } from "../modules/blog/entities/blog.model";
import { Bookmark } from "../modules/blog/entities/blog-bookmarks.model";
import { Capture } from "../modules/capture/capture.model";
import { Category } from "../modules/category/category.model";
import { CourseComment } from "../modules/course-comment/course-comment.model";
import { Course } from "../modules/course/entities/course.model";
import { Lesson } from "../modules/lession/lesson.model";
import { Permission, Role, RolePermission } from "../modules/RBAC/rbac.model";
import { Reaction } from "../modules/blog/entities/blog-likes.model";
import { OTP, User } from "../modules/user/user.model";
import { CourseBookmark } from "../modules/course/entities/course-bookmarks.model";
import { CourseReaction } from "../modules/course/entities/course-likes.model";

const initDatabase = async (): Promise<void> => {
  // User → OTP
  User.hasMany(OTP, { foreignKey: "user_id", as: "otps" });
  OTP.belongsTo(User, { foreignKey: "user_id", as: "otpUser" });

  // Role ↔ Permission (Many-to-Many)
  Role.belongsToMany(Permission, {
    through: RolePermission,
    foreignKey: "role_id",
    as: "permissions",
  });
  Permission.belongsToMany(Role, {
    through: RolePermission,
    foreignKey: "permission_id",
    as: "roles",
  });

  // Category → Category (Self reference)
  Category.hasMany(Category, {
    as: "childrenCategories",
    foreignKey: "parentId",
  });
  Category.belongsTo(Category, {
    as: "parentCategory",
    foreignKey: "parentId",
  });

  // User → Course
  User.hasMany(Course, { foreignKey: "teacher_id", as: "taughtCourses" });
  Course.belongsTo(User, { foreignKey: "teacher_id", as: "teacher" });

  // Category → Course
  Category.hasMany(Course, {
    foreignKey: "category_id",
    as: "categoryCourses",
  });
  Course.belongsTo(Category, { foreignKey: "category_id", as: "category" });

  // Course → Lesson
  Course.hasMany(Lesson, {
    foreignKey: "courseId",
    as: "lessons",
    onDelete: "CASCADE",
    hooks: true,
  });
  Lesson.belongsTo(Course, { foreignKey: "courseId", as: "courseLesson" });

  // Course → Capture
  Course.hasMany(Capture, {
    foreignKey: "courseId",
    as: "captures",
    onDelete: "CASCADE",
    hooks: true,
  });
  Capture.belongsTo(Course, { foreignKey: "courseId", as: "courseCapture" });

  // User → CourseComment
  User.hasMany(CourseComment, { foreignKey: "userId", as: "userComments" });
  CourseComment.belongsTo(User, { foreignKey: "userId", as: "commentUser" });

  // Blog → User & Category
  Blog.belongsTo(User, { as: "blogAuthor", foreignKey: "authorId" });
  Blog.belongsTo(Category, { as: "blogCategory", foreignKey: "categoryId" });

  // Category → Blog
  Category.hasMany(Blog, { as: "categoryBlogs", foreignKey: "categoryId" });

  // User → Blog (Author)
  User.hasMany(Blog, { as: "authorBlogs", foreignKey: "authorId" });

  // User ↔ Blog (Bookmark Many-to-Many)
  User.belongsToMany(Blog, {
    through: Bookmark,
    foreignKey: "userId",
    as: "bookmarkedBlogs",
  });
  Blog.belongsToMany(User, {
    through: Bookmark,
    foreignKey: "blogId",
    as: "usersWhoBookmarked",
  });

  // User → Bookmark
  User.hasMany(Bookmark, { foreignKey: "userId", as: "userBookmarks" });

  // Blog → Reaction
  Blog.hasMany(Reaction, { foreignKey: "blogId", as: "blogReactions" });
  Reaction.belongsTo(Blog, { foreignKey: "blogId", as: "parentBlog" });

  // User → Reaction
  User.hasMany(Reaction, { foreignKey: "userId", as: "userReactions" });
  Reaction.belongsTo(User, { foreignKey: "userId", as: "parentUser" });

  // User ↔ Course (Bookmark Many-to-Many)
  User.belongsToMany(Course, {
    through: CourseBookmark,
    foreignKey: "userId",
    as: "bookmarkedCourses",
  });
  Course.belongsToMany(User, {
    through: CourseBookmark,
    foreignKey: "courseId",
    as: "usersWhoBookmarked",
  });

  // User → CourseBookmark
  User.hasMany(CourseBookmark, {
    foreignKey: "userId",
    as: "userCourseBookmarks",
  });

  // Course Reaction (Like / Dislike)
  Course.hasMany(CourseReaction, {
    foreignKey: "courseId",
    as: "courseReactions",
  });

  CourseReaction.belongsTo(Course, {
    foreignKey: "courseId",
    as: "parentCourse",
  });

  User.hasMany(CourseReaction, {
    foreignKey: "userId",
    as: "userCourseReactions",
  });

  CourseReaction.belongsTo(User, {
    foreignKey: "userId",
    as: "reactionUser",
  });

  // sequelize.sync({ alter: true });
  console.log("✅ Database associations initialized successfully");
};

export { initDatabase };
