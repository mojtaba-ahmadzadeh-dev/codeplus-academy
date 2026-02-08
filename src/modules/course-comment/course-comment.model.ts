// src/modules/course-comment/course-comment.model.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/sequelize.config";
import { STATUS } from "../../constant/status.constant";
import {
  CourseCommentAttributes,
  CourseCommentCreationAttributes,
} from "./types/index.types";

class CourseComment
  extends Model<CourseCommentAttributes, CourseCommentCreationAttributes>
  implements CourseCommentAttributes
{
  public id!: number;
  public courseId!: number;
  public userId!: number;
  public content!: string;
  public status!: (typeof STATUS)[keyof typeof STATUS];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CourseComment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "courses", key: "id" },
      onDelete: "CASCADE",
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(STATUS)),
      allowNull: true,
      defaultValue: STATUS.ACTIVE,
    },
  },
  {
    sequelize,
    modelName: "courseComment",
    tableName: "course_comments",
    timestamps: true,
  },
);

export { CourseComment };