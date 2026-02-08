import { sequelize } from "../config/sequelize.config";
import { Capture } from "../modules/capture/capture.model";
import { Category } from "../modules/category/category.model";
import { Course } from "../modules/course/course.model";
import { Lesson } from "../modules/lession/lesson.model";
import { Permission, Role, RolePermission } from "../modules/RBAC/rbac.model";
import { OTP, User } from "../modules/user/user.model";

const initDatabase = async (): Promise<void> => {
  User.hasMany(OTP, { foreignKey: "user_id", as: "otps" });
  OTP.belongsTo(User, { foreignKey: "user_id", as: "user" });

  User.belongsToMany(Role, {
    through: "user_roles",
    foreignKey: "user_id",
    otherKey: "role_id",
  });

  Role.belongsToMany(User, {
    through: "user_roles",
    foreignKey: "role_id",
    otherKey: "user_id",
  });

  // Role <-> Permission
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

  Lesson.hasMany(Capture, { foreignKey: "lessonId", as: "captures" });
  Capture.belongsTo(Lesson, { foreignKey: "lessonId", as: "lesson" });

  // await sequelize.sync({ alter: true });
  console.log("✅ Database synced successfully");
};

export { initDatabase };