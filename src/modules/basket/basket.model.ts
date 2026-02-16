import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.config";
import { STATUS } from "../../constant/status.constant";
import { User } from "../user/user.model";
import { Course } from "../course/entities/course.model"; // تغییر دادیم
import {
  BasketAttributes,
  BasketCreationAttributes,
} from "./types/index.types";

class Basket
  extends Model<BasketAttributes, BasketCreationAttributes>
  implements BasketAttributes
{
  public id!: number;
  public userId!: number;
  public courseId!: number; // تغییر دادیم
  public quantity!: number; // تعداد دوره (معمولاً 1)
  public totalPrice!: number;
  public status!: (typeof STATUS)[keyof typeof STATUS];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Basket.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
      onDelete: "CASCADE",
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Course, key: "id" },
      onDelete: "CASCADE",
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(STATUS)),
      allowNull: false,
      defaultValue: STATUS.ACTIVE,
    },
  },
  {
    sequelize,
    modelName: "basket",
    tableName: "baskets",
    timestamps: true,
  },
);

export { Basket };
