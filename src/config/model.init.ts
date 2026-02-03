import { sequelize } from "../config/sequelize.config";
import { OTP, User } from "../modules/user/user.model";

const initDatabase = async (): Promise<void> => {
  User.hasMany(OTP, { foreignKey: "user_id", as: "otps" });
  OTP.belongsTo(User, { foreignKey: "user_id", as: "user" });

  // await sequelize.sync({ alter: true });
  console.log("✅ Database synced successfully");
};

export { initDatabase };