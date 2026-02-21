import { Model, DataTypes } from "sequelize";
import {sequelize} from "../../config/sequelize.config";
import { CaptureAttributes, CaptureCreationAttributes } from "./types/index.types";
import { StatusType } from "../../constant/status.constant";

class Capture extends Model<CaptureAttributes, CaptureCreationAttributes> implements CaptureAttributes {
  public id!: number;
  public title!: string;
  public url!: string | null;
  public description?: string | null;
  public status!: StatusType;
  public courseId?: number | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Capture.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "pending"),
      allowNull: false,
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "captures",
  }
);

export { Capture };
export default Capture;