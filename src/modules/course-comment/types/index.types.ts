import { STATUS, StatusType } from "../../../constant/status.constant";

export interface CourseCommentAttributes {
  id: number;
  courseId: number;
  userId: number;
  content: string;
  status: StatusType;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CourseCommentCreationAttributes
  extends Omit<CourseCommentAttributes, "id" | "createdAt" | "updatedAt"> {}