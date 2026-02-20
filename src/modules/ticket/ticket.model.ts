// src/modules/ticket/ticket.model.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.config";
import { STATUS } from "../../constant/status.constant";
import { PRIORITY } from "../../constant/priority.constant";
import {
  TicketAttributes,
  TicketCreationAttributes,
} from "./types/index.types";

class Ticket
  extends Model<TicketAttributes, TicketCreationAttributes>
  implements TicketAttributes
{
  public id!: number;
  public title!: string;
  public description!: string;
  public status!: (typeof STATUS)[keyof typeof STATUS];
  public priority!: (typeof PRIORITY)[keyof typeof PRIORITY];
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Ticket.init(
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

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM(...Object.values(STATUS)),
      allowNull: false,
      defaultValue: STATUS.PENDING,
    },

    priority: {
      type: DataTypes.ENUM(...Object.values(PRIORITY)),
      allowNull: false,
      defaultValue: PRIORITY.MEDIUM,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "ticket",
    tableName: "tickets",
    timestamps: true,
  },
);

export { Ticket };