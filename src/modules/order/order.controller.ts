import { NextFunction, Response, Request } from "express";
import orderService from "./order.service";

class OrderController {
  private orderService: typeof orderService;

  constructor() {
    this.orderService = orderService;

    this.createOrder = this.createOrder.bind(this);
    this.getUserOrders = this.getUserOrders.bind(this);
    this.deleteOrderItem = this.deleteOrderItem.bind(this);
  }

  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "کاربر لاگین نکرده است" });
      }

      const orders = await this.orderService.createOrder(userId);

      return res.status(201).json({
        message: "سفارش با موفقیت ایجاد شد",
        data: orders,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "کاربر لاگین نکرده است" });
      }

      const { totalPrice, orders } =
        await this.orderService.getUserOrders(userId);

      return res.status(200).json({
        message: "سفارشات کاربر با موفقیت بازیابی شد",
        data: orders,
        totalPrice,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteOrderItem(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      const orderId = parseInt(req.params.orderId);

      if (!userId) {
        return res.status(401).json({ message: "کاربر لاگین نکرده است" });
      }

      const result = await this.orderService.deleteOrderItem(userId, orderId);

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new OrderController();
