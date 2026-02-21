import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.config";
import { STATUS } from "../../constant/status.constant";
import { LessonAttributes, LessonCreationAttributes } from "./types/index.types";

class Lesson
  extends Model<LessonAttributes, LessonCreationAttributes>
  implements LessonAttributes
{
  public id!: number;
  public title!: string;
  public description!: string | null;
  public courseId!: number;
  public status!: (typeof STATUS)[keyof typeof STATUS];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Lesson.init(
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "courses", key: "id" },
    },
    status: {
      type: DataTypes.ENUM(...Object.values(STATUS)),
      allowNull: false,
      defaultValue: STATUS.ACTIVE,
    },
  },
  {
    sequelize,
    modelName: "lesson",
    tableName: "lessons",
    timestamps: true,
  },
);

export { Lesson };