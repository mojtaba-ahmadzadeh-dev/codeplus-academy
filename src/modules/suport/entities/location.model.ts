import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../config/sequelize.config";
import { ILocation } from "../types/index.types";
import { User } from "../../user/user.model";
import { Room } from "./room.model";

export class Location extends Model<ILocation> implements ILocation {
  declare id?: number;
  declare senderId: number;
  declare location: object | null;
  declare dateTime: number;
  declare roomId?: number;
}

Location.init(
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
    location: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: null,
    },
    dateTime: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Room,
        key: "id",
      },
      onDelete: "SET NULL",
    },
  },
  {
    sequelize,
    tableName: "locations",
    timestamps: true,
  },
);
