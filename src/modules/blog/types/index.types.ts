import { STATUS } from "../../../constant/status.constant";
import { Optional } from "sequelize";

export interface BlogAttributes {
  id: number;
  title: string;
  content: string;
  status: (typeof STATUS)[keyof typeof STATUS];
  authorId: number;
  categoryId: number | null;
  likes: number;
  dislikes: number;
  bookmarks: number;
  createdAt: Date;
  updatedAt: Date;
}

export type BlogCreationAttributes = Optional<
  BlogAttributes,
  "id" | "categoryId" | "createdAt" | "updatedAt" | "bookmarks"
>;