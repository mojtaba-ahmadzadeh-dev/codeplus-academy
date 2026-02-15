import { CreationOptional } from "sequelize";
import { User } from "../user.model";
import { Blog } from "../../blog/entities/blog.model";
import { Course } from "../../course/entities/course.model";

export interface IUser {
  id?: number;
  mobile: string;
  full_name?: string | null;
  avatar?: string | null;
  is_banned?: boolean;
  isAdmin?: boolean;
  role?: CreationOptional<string>;

  bookmarkedBlogs?: Blog[];
  bookmarkedCourses?: Course[];

  created_at?: Date;
}
export interface IOTP {
  id?: number;
  user_id: number;
  code: string;
  expires_in: Date;
  created_at?: Date;
  user?: User;
}

export interface CreateUserDTO {
  mobile: string;
  full_name?: string;
  avatar?: string | null;
  password?: string;
  role?: string;
  is_banned?: boolean;
}
