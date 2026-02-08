// src/modules/capture/capture.model.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.config";
import { STATUS } from "../../constant/status.constant";
import {
  CaptureAttributes,
  CaptureCreationAttributes,
} from "./types/index.types";

class Capture
  extends Model<CaptureAttributes, CaptureCreationAttributes>
  implements CaptureAttributes
{
  public id!: number;
  public title!: string;
  public url!: string;
  public description!: string | null;
  public status!: (typeof STATUS)[keyof typeof STATUS];
  public courseId!: number | null;
  public lessonId!: number | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Capture.init(
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
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(STATUS)),
      allowNull: true,
      defaultValue: STATUS.ACTIVE,
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "courses", key: "id" },
    },
    lessonId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "lessons", key: "id" },
    },
  },
  {
    sequelize,
    modelName: "capture",
    tableName: "captures",
    timestamps: true,
  },
);

export { Capture };