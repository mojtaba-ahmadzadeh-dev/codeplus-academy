import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.config";
import { STATUS } from "../../constant/status.constant";
import {
  BlogCommentAttributes,
  BlogCommentCreationAttributes,
} from "./types/index.types";

class BlogComment
  extends Model<BlogCommentAttributes, BlogCommentCreationAttributes>
  implements BlogCommentAttributes
{
  public id!: number;
  public blogId!: number;
  public userId!: number;
  public content!: string;
  public status!: (typeof STATUS)[keyof typeof STATUS];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

BlogComment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "blogs", key: "id" },
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
      defaultValue: STATUS.PENDING,
    },
  },
  {
    sequelize,
    modelName: "BlogComment",
    tableName: "blog_comments",
    timestamps: true,
  }
);

export { BlogComment };