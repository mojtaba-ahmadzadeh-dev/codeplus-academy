import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config/sequelize.config";

interface CourseReactionAttributes {
  id: number;
  userId: number;
  courseId: number;
  isLike: boolean;
}

interface CourseReactionCreationAttributes
  extends Optional<CourseReactionAttributes, "id"> {}

export class CourseReaction
  extends Model<CourseReactionAttributes, CourseReactionCreationAttributes>
  implements CourseReactionAttributes
{
  declare id: number;
  declare userId: number;
  declare courseId: number;
  declare isLike: boolean;
}

CourseReaction.init(
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

    isLike: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "course_likes", 
    modelName: "course_likes",
    timestamps: true,

    indexes: [
      {
        unique: true,
        fields: ["userId", "courseId"],
      },
    ],
  }
);