import { STATUS } from "../../../constant/status.constant";
import { Optional } from "sequelize";

export interface BlogAttributes {
  id: number;
  title: string;
  content: string;
  status: (typeof STATUS)[keyof typeof STATUS];
  authorId: number;
  categoryId?: number | null;

  createdAt: Date;
  updatedAt: Date;
}

export interface BlogCreationAttributes
  extends Optional<BlogAttributes, "id" | "categoryId" | "createdAt" | "updatedAt"> {}