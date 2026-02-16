// src/modules/order/types/index.types.ts
import { Optional } from "sequelize";
import { STATUS } from "../../../constant/status.constant";
import { Course } from "../../course/entities/course.model";

export interface OrderAttributes {
  id: number;
  userId: number;
  courseId: number;
  quantity: number;
  totalPrice: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
  course?: Course; // ارتباط با مدل Course، برای eager loading
}

export type OrderCreationAttributes = Optional<
  OrderAttributes,
  "id" | "totalPrice" | "status" | "createdAt" | "updatedAt"
>;