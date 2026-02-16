import { Optional } from "sequelize";
import { STATUS } from "../../../constant/status.constant";
import { Course } from "../../course/entities/course.model";

export interface BasketAttributes {
  id: number;
  userId: number;
  courseId: number;      // اضافه شد
  quantity: number;      // اضافه شد
  totalPrice: number;
  status: (typeof STATUS)[keyof typeof STATUS];
  createdAt?: Date;
  updatedAt?: Date;
  course?: Course; 
}

export type BasketCreationAttributes = Optional<
  BasketAttributes,
  "id" | "totalPrice" | "status" | "createdAt" | "updatedAt"
>;