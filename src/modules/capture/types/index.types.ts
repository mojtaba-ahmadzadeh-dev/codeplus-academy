import { STATUS, StatusType } from "../../../constant/status.constant";

export interface CaptureAttributes {
  id: number;
  title: string;
  url: string | null;
  description?: string | null;
  status: StatusType;
  courseId?: number | null;
  lessonId?: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CaptureCreationAttributes
  extends Omit<CaptureAttributes, "id" | "createdAt" | "updatedAt"> {}