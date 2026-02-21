import { Optional } from "sequelize";
import { STATUS } from "../../../constant/status.constant";

export interface BlogCommentAttributes {
  id: number;
  blogId: number;
  userId: number;
  content: string;
  status: (typeof STATUS)[keyof typeof STATUS];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BlogCommentCreationAttributes
  extends Optional<BlogCommentAttributes, "id" | "status"> {}