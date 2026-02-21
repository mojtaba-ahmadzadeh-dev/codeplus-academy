// modules/reaction/reaction.model.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config/sequelize.config";

interface ReactionAttributes {
  id: number;
  userId: number;
  blogId: number;
  isLike: boolean;
}

interface ReactionCreationAttributes extends Optional<ReactionAttributes, "id"> {}

export class Reaction
  extends Model<ReactionAttributes, ReactionCreationAttributes>
  implements ReactionAttributes
{
  declare id: number;
  declare userId: number;
  declare blogId: number;
  declare isLike: boolean;
}

Reaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "blogs", key: "id" },
      onDelete: "CASCADE",
    },
    isLike: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "blog_likes",
    modelName: "blog_likes",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["userId", "blogId"], 
      },
    ],
  }
);