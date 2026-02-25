import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../config/sequelize.config";
import { IRoom } from "../types/index.types";
import { Conversation } from "./conversation.model";

export class Room extends Model<IRoom> implements IRoom {
  declare id: string;
  declare name: string;
  declare description: string;
  declare image: string;
  declare conversationId?: string;
}

Room.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    conversationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Conversation,
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize: sequelize,
    tableName: "rooms",
    timestamps: true,
  },
);
