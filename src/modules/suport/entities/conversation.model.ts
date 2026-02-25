import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../config/sequelize.config";
import { ISupport } from "../types/index.types";
import { Room } from "./room.model";

export class Conversation extends Model<ISupport> implements ISupport {
  declare id: string;
  declare title: string;
  declare endpoint: string;
  declare rooms?: Room[];
}

Conversation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endpoint: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    tableName: "converstations",
    timestamps: true,
  },
);
