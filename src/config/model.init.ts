import { sequelize } from "../config/sequelize.config";
import {
  Permission,
  Role,
  RolePermission,
  UserRole,
} from "../modules/RBAC/rbac.model";
import { OTP, User } from "../modules/user/user.model";

const initDatabase = async (): Promise<void> => {
  User.hasMany(OTP, { foreignKey: "user_id", as: "otps" });
  OTP.belongsTo(User, { foreignKey: "user_id", as: "user" });

  User.belongsToMany(Role, { through: UserRole, foreignKey: "user_id" });
  Role.belongsToMany(User, { through: UserRole, foreignKey: "role_id" });

  Role.belongsToMany(Permission, {
    through: RolePermission,
    foreignKey: "role_id",
  });
  Permission.belongsToMany(Role, {
    through: RolePermission,
    foreignKey: "permission_id",
  });

  // await sequelize.sync({ alter: true });
  console.log("✅ Database synced successfully");
};

export { initDatabase };