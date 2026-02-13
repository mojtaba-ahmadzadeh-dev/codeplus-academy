import { STATUS } from "../../../constant/status.constant";
import { Optional } from "sequelize";

export interface BlogAttributes {
  id: number;
  title: string;
  content: string;
  status: (typeof STATUS)[keyof typeof STATUS];
  authorId: number;
  categoryId: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginatedBlogs {
  blogs: BlogAttributes[];
  total: number;
  totalPages: number;
  page: number;
  limit: number;
  sort?: "newest" | "oldest";
}

export interface PaginatedBookmarkedBlogs {
  rows: BlogAttributes[];
  count: number;
  totalPages: number;
  page: number;
  limit: number;
}

export interface BlogUpdateAttributes {
  title?: string;
  content?: string;
  status?: (typeof STATUS)[keyof typeof STATUS];
  categoryId?: number | null;
}

export interface GetAllBlogsParams {
  search?: string;
  page?: number;
  limit?: number;
  sort?: "newest" | "oldest";
}

export interface ReactionResult {
  likes: number;
  dislikes: number;
  message: string;
}

export interface ToggleBookmarkResult {
  isBookmarked: boolean;
}

export type BlogCreationAttributes = Optional<
  BlogAttributes,
  "id" | "categoryId" | "createdAt" | "updatedAt"
>;