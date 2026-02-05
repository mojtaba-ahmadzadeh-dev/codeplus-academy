// src/modules/category/category.model.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/sequelize.config";
import { STATUS } from "../../constant/status.constant";
import {
  CategoryAttributes,
  CategoryCreationAttributes,
} from "./types/index.types";

class Category
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes
{
  public id!: number;
  public title!: string;
  public description!: string | null;
  public status!: (typeof STATUS)[keyof typeof STATUS];
  public parentId!: number | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly children?: Category[];
  public readonly parent?: Category;
}

Category.init(
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(STATUS)),
      allowNull: true,
      defaultValue: STATUS.ACTIVE,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "categories", key: "id" },
    },
  },
  {
    sequelize,
    modelName: "category",
    tableName: "categories",
    timestamps: true,
  },
);

export { Category };
