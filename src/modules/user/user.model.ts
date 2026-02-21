import { DataTypes, Model, CreationOptional } from "sequelize";
import { sequelize } from "../../config/sequelize.config";
import { IUser, IOTP } from "./types/index.types";
import { Blog } from "../blog/entities/blog.model";

export class User extends Model<IUser> implements IUser {
  declare id: CreationOptional<number>;
  declare mobile: string;
  declare full_name: string | null;
  declare avatar: string | null;
  declare is_banned: boolean;
  declare role: CreationOptional<string>;
  declare created_at: CreationOptional<Date>;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    mobile: { type: DataTypes.STRING(15), allowNull: false },
    full_name: { type: DataTypes.STRING(100), allowNull: true },
    avatar: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    is_banned: { type: DataTypes.BOOLEAN, defaultValue: false },
    role: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "user",
    },
  },
  {
    sequelize,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
    modelName: "user",
    tableName: "users",
  },
);

export class OTP extends Model<IOTP> implements IOTP {
  declare id: CreationOptional<number>;
  declare user_id: number;
  declare code: string;
  declare expires_in: Date;
  declare created_at: CreationOptional<Date>;
  declare user?: User;
}

OTP.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    code: { type: DataTypes.STRING(6), allowNull: false },
    expires_in: { type: DataTypes.DATE, allowNull: false },
  },
  {
    sequelize,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
    modelName: "otp",
    tableName: "otps",
  },
);
