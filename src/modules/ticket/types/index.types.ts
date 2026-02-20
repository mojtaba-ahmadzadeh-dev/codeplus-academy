import { Optional } from "sequelize";
import { STATUS } from "../../../constant/status.constant";
import { PRIORITY } from "../../../constant/priority.constant";

export interface TicketAttributes {
  id: number;
  title: string;
  description: string;
  status: (typeof STATUS)[keyof typeof STATUS];
  priority: (typeof PRIORITY)[keyof typeof PRIORITY];
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}


export type TicketCreationAttributes = Optional<
  TicketAttributes,
  | "id"
  | "status"
  | "priority"
  | "createdAt"
  | "updatedAt"
>;