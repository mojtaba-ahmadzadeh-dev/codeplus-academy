import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.config";
import { User } from "../user/user.model";
import { Course } from "../course/entities/course.model";
import { OrderAttributes, OrderCreationAttributes } from "./types/index.types";
import { STATUS } from "../../constant/status.constant";

class Order
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  public id!: number;
  public userId!: number;
  public courseId!: number;
  public quantity!: number;
  public totalPrice!: number;
  public status!: "pending" | "processing" | "completed" | "cancelled";

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
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
      type: DataTypes.ENUM(
        STATUS.PENDING,
        STATUS.PROCESSING,
        STATUS.COMPLETED,
        STATUS.CANCELLED,
      ),
      allowNull: false,
      defaultValue: STATUS.PENDING,
    },
  },
  {
    sequelize,
    modelName: "order",
    tableName: "orders",
    timestamps: true,
  },
);

export { Order };
