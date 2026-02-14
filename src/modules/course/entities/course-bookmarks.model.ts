import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config/sequelize.config";

interface CourseBookmarkAttributes {
  id: number;
  userId: number;
  courseId: number;
}

interface CourseBookmarkCreationAttributes extends Optional<CourseBookmarkAttributes, "id"> {}

export class CourseBookmark
  extends Model<CourseBookmarkAttributes, CourseBookmarkCreationAttributes>
  implements CourseBookmarkAttributes
{
  declare id: number;
  declare userId: number;
  declare courseId: number;
}

CourseBookmark.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "courses",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "course_bookmarks",
    modelName: "course_Bookmark",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["userId", "courseId"],
      },
    ],
  },
);