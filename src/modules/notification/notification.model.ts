import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.config";
import { NOTIFICATION_TYPE } from "../../constant/notification.constant";
import {
  NotificationAttributes,
  NotificationCreationAttributes,
} from "./types/index.types";

class Notification
  extends Model<NotificationAttributes, NotificationCreationAttributes>
  implements NotificationAttributes
{
  public id!: number;
  public title!: string;
  public message!: string;
  public type!: (typeof NOTIFICATION_TYPE)[keyof typeof NOTIFICATION_TYPE];
  public read!: boolean;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Notification.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    type: {
      type: DataTypes.ENUM(...Object.values(NOTIFICATION_TYPE)),
      allowNull: false,
      defaultValue: NOTIFICATION_TYPE.INFO,
    },

    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "notification",
    tableName: "notifications",
    timestamps: true,
  },
);

export { Notification };
