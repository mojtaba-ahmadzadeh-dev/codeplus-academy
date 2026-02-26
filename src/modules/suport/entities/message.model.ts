import { DataTypes, Model } from "sequelize";
import { IMessage } from "../types/index.types";
import { sequelize } from "../../../config/sequelize.config";
import { User } from "../../user/user.model";
import { Room } from "./room.model";

export class Message extends Model<IMessage> implements IMessage {
  declare id?: string;
  declare senderId: string;
  declare message: string;
  declare dateTime: number;
  declare roomId: string;
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dateTime: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Room,
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "messages",
    timestamps: true,
  },
);