import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config/sequelize.config";

interface BookmarkAttributes {
  id: number;
  userId: number;
  blogId: number;
}

interface BookmarkCreationAttributes
  extends Optional<BookmarkAttributes, "id"> {}

export class Bookmark
  extends Model<BookmarkAttributes, BookmarkCreationAttributes>
  implements BookmarkAttributes
{
  declare id: number;
  declare userId: number;
  declare blogId: number;
}

Bookmark.init(
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
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "blogs",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "blog_bookmarks",
    modelName: "blog_Bookmarks",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["userId", "blogId"],
      },
    ],
  }
);