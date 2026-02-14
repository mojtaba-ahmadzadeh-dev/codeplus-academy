import { DataTypes, Model, CreationOptional } from "sequelize";
import { sequelize } from "../../../config/sequelize.config";
import { ICourse } from "../types/index.types";

export class Course extends Model<ICourse> implements ICourse {
  declare id: CreationOptional<number>;
  declare title: string;
  declare slug: string;
  declare description: string;
  declare price: number;
  declare discount: number | null;
  declare thumbnail: string | null;
  declare level: "beginner" | "intermediate" | "advanced";
  declare status: "draft" | "published";
  declare duration: number;
  declare teacher_id: number;
  declare category_id: number;
  declare created_at: CreationOptional<Date>;
}

Course.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    slug: {
      type: DataTypes.STRING(160),
      allowNull: false,
      unique: true,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    discount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },

    thumbnail: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },

    level: {
      type: DataTypes.ENUM("beginner", "intermediate", "advanced"),
      allowNull: false,
      defaultValue: "beginner",
    },

    status: {
      type: DataTypes.ENUM("draft", "published"),
      allowNull: false,
      defaultValue: "draft",
    },

    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Course duration in minutes",
    },

    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
    modelName: "course",
    tableName: "courses",
  }
);