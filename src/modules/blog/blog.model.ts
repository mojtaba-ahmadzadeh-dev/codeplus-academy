import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/sequelize.config";
import { STATUS } from "../../constant/status.constant";
import { User } from "../user/user.model";
import { Category } from "../category/category.model";
import { BlogAttributes, BlogCreationAttributes } from "./types/index.types";

class Blog
  extends Model<BlogAttributes, BlogCreationAttributes>
  implements BlogAttributes
{
  public id!: number;
  public title!: string;
  public content!: string;
  public status!: (typeof STATUS)[keyof typeof STATUS];
  public authorId!: number;
  public categoryId!: number | null;
  public likes!: number;
  public dislikes!: number;
  public bookmarks!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly author?: User;
  public readonly category?: Category;
}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    dislikes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(STATUS)),
      allowNull: false,
      defaultValue: STATUS.ACTIVE,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "categories", key: "id" },
    },
    bookmarks: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "blog",
    tableName: "blogs",
    timestamps: true,
  },
);

export { Blog };
