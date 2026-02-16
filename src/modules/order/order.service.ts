import { Basket } from "../basket/basket.model";
import { Order } from "./order.model";
import { STATUS } from "../../constant/status.constant";
import { Course } from "../course/entities/course.model";

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

  async getUserOrders(userId: number) {
    const orders = await this.orderModel.findAll({
      where: { userId },
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
      throw new Error("سفارش موردنظر پیدا نشد یا به کاربر تعلق ندارد");
    }

    await order.destroy();

    return { message: "آیتم سفارش با موفقیت حذف شد" };
  }

  async getAllOrdersForAdmin() {
    const orders = await this.orderModel.findAll({
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
}

export default new OrderService();
