// src/modules/lesson/types/index.types.ts

import { STATUS } from "../../../constant/status.constant";

export interface LessonAttributes {
  id: number;
  title: string;
  description?: string | null;
  courseId: number;
  status: (typeof STATUS)[keyof typeof STATUS];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LessonCreationAttributes
  extends Omit<LessonAttributes, "id" | "createdAt" | "updatedAt"> {}