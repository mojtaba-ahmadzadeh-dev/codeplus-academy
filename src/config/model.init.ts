import { sequelize } from "../config/sequelize.config";
import { Blog } from "../modules/blog/entities/blog.model";
import { Bookmark } from "../modules/blog/entities/blog-bookmarks.model";
import { Capture } from "../modules/capture/capture.model";
import { Category } from "../modules/category/category.model";
import { CourseComment } from "../modules/course-comment/course-comment.model";
import { Course } from "../modules/course/course.model";
import { Lesson } from "../modules/lession/lesson.model";
import { Permission, Role, RolePermission } from "../modules/RBAC/rbac.model";
import { Reaction } from "../modules/blog/entities/blog-likes.model";
import { OTP, User } from "../modules/user/user.model";

const initDatabase = async (): Promise<void> => {
  User.hasMany(OTP, { foreignKey: "user_id", as: "otps" });
  OTP.belongsTo(User, { foreignKey: "user_id", as: "user" });

  Role.belongsToMany(Permission, {
    through: RolePermission,
    foreignKey: "role_id",
  });

  Permission.belongsToMany(Role, {
    through: RolePermission,
    foreignKey: "permission_id",
  });

  Category.hasMany(Category, { as: "children", foreignKey: "parentId" });
  Category.belongsTo(Category, { as: "parent", foreignKey: "parentId" });

  User.hasMany(Course, { foreignKey: "teacher_id", as: "courses" });
  Course.belongsTo(User, { foreignKey: "teacher_id", as: "teacher" });

  Category.hasMany(Course, { foreignKey: "category_id", as: "courses" });
  Course.belongsTo(Category, { foreignKey: "category_id", as: "category" });

  Course.hasMany(Lesson, { foreignKey: "courseId", as: "lessons" });
  Lesson.belongsTo(Course, { foreignKey: "courseId", as: "course" });

  User.hasMany(CourseComment, { foreignKey: "userId", as: "comments" });
  CourseComment.belongsTo(User, { foreignKey: "userId", as: "user" });

  Blog.belongsTo(User, { as: "author", foreignKey: "authorId" });
  Blog.belongsTo(Category, { as: "category", foreignKey: "categoryId" });

  Category.hasMany(Blog, { as: "blogs", foreignKey: "categoryId" });
  User.hasMany(Blog, { as: "blogs", foreignKey: "authorId" });

  User.belongsToMany(Blog, {
    through: Bookmark,
    foreignKey: "userId",
    as: "bookmarkedBlogs",
  });
  User.hasMany(Bookmark, { foreignKey: "userId", as: "bookmarks" });

  Blog.belongsToMany(User, {
    through: Bookmark,
    as: "bookmarkedBy",
    foreignKey: "blogId",
  });

  Blog.hasMany(Reaction, { foreignKey: "blogId", as: "reactions" });
  Reaction.belongsTo(Blog, { foreignKey: "blogId" });

  User.hasMany(Reaction, { foreignKey: "userId", as: "reactions" });
  Reaction.belongsTo(User, { foreignKey: "userId" });

  // await sequelize.sync({ alter: true });
  console.log("✅ Database synced successfully");
};

export { initDatabase };