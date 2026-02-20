import { Basket } from "../basket/basket.model";
import { Order } from "./order.model";
import { STATUS } from "../../constant/status.constant";
import { Course } from "../course/entities/course.model";
import createHttpError from "http-errors";
import { orderMessages } from "../../constant/messages";
import { OrderAttributes } from "./types/index.types";

class OrderService {
  private orderModel = Order;
  private basketModel = Basket;

  constructor() {}

  private calculateItemTotal(
    course: Course,
    quantity: number,
    originalTotal: number,
  ): number {
    if (course.discount && course.discount > 0) {
      return quantity * (course.price - (course.price * course.discount) / 100);
    }
    return originalTotal;
  }

  async createOrder(userId: number) {
    const basketItems = await this.basketModel.findAll({
      where: { userId },
      include: [{ model: Course, as: "course" }],
    });

    if (!basketItems.length) {
      throw new Error("سبد خرید خالی است");
    }

    const orders: Order[] = [];

    for (const item of basketItems) {
      const course = item.get("course") as Course;
      const itemTotalPrice = this.calculateItemTotal(
        course,
        item.quantity,
        item.totalPrice,
      );

      let order = await this.orderModel.findOne({
        where: {
          userId: item.userId,
          courseId: item.courseId,
          status: [STATUS.PENDING, STATUS.PROCESSING],
        },
      });

      if (order) {
        order.quantity += item.quantity;
        order.totalPrice += itemTotalPrice;
        await order.save();
      } else {
        order = await this.orderModel.create({
          userId: item.userId,
          courseId: item.courseId,
          quantity: item.quantity,
          totalPrice: itemTotalPrice,
          status: STATUS.PENDING,
        });
      }

      orders.push(order);
      await item.destroy();
    }

    return orders;
  }

  async getUserOrders(userId: number, status?: string) {
    const whereClause: any = { userId };

    if (status) {
      whereClause.status = status;
    }

    const orders = await this.orderModel.findAll({
      where: whereClause,
      include: [{ model: Course, as: "course" }],
      order: [["createdAt", "DESC"]],
    });

    const totalPrice = orders.reduce((sum, order) => sum + order.totalPrice, 0);

    const sanitizedOrders = orders.map((order) => {
      const { totalPrice, ...rest } = order.toJSON();
      return rest;
    });

    return {
      orders: sanitizedOrders,
      totalPrice,
    };
  }

  async deleteOrderItem(userId: number, orderId: number) {
    const order = await this.orderModel.findOne({
      where: { id: orderId, userId },
    });

    if (!order) {
      throw createHttpError.BadRequest(orderMessages.ORDER_NOT_FOUND);
    }

    await order.destroy();
  }

  async getAllOrdersForAdmin(status?: string) {
    const whereClause: any = {};

    if (status) {
      whereClause.status = status;
    }

    const orders = await this.orderModel.findAll({
      where: whereClause,
      include: [{ model: Course, as: "course" }],
      order: [["createdAt", "DESC"]],
    });

    const totalPrice = orders.reduce((sum, order) => sum + order.totalPrice, 0);

    const sanitizedOrders = orders.map((order) => {
      const { totalPrice, ...rest } = order.toJSON();
      return rest;
    });

    return {
      orders: sanitizedOrders,
      totalPrice,
    };
  }

  async getOrderById(userId: number, orderId: number) {
    const order = await this.orderModel.findOne({
      where: { id: orderId, userId },
      include: [{ model: Course, as: "course" }],
    });

    if (!order) {
      throw createHttpError.BadRequest(orderMessages.ORDER_NOT_FOUND);
    }

    const { totalPrice, ...rest } = order.toJSON();
    return rest;
  }

  async changeOrderStatus(
    orderId: number,
    status: OrderAttributes["status"],
  ): Promise<Omit<OrderAttributes, "totalPrice">> {
    const order = await this.orderModel.findByPk(orderId, {
      include: [{ model: Course, as: "course" }],
    });

    if (!order) {
      throw new Error(orderMessages.ORDER_NOT_FOUND);
    }

    if (!["pending", "processing", "completed", "cancelled"].includes(status)) {
      throw createHttpError.BadRequest("وضعیت نامعتبر است");
    }

    if (order.status === status) {
      const { totalPrice, ...orderData } = order.toJSON() as OrderAttributes;
      return orderData;
    }

    order.status = status;
    await order.save();

    const { totalPrice, ...orderData } = order.toJSON() as OrderAttributes;
    return orderData;
  }
}

export default new OrderService();
