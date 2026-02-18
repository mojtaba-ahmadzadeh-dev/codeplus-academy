import { Optional } from "sequelize";
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
  course?: Course; 
}

export type OrderCreationAttributes = Optional<
  OrderAttributes,
  "id" | "totalPrice" | "status" | "createdAt" | "updatedAt"
>;