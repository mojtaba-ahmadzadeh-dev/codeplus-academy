import { NextFunction, Response, Request } from "express";
import orderService from "./order.service";
import { StatusType } from "../../constant/status.constant";
import { orderMessages } from "../../constant/messages";

class OrderController {
  private orderService: typeof orderService;

  constructor() {
    this.orderService = orderService;

    this.createOrder = this.createOrder.bind(this);
    this.getUserOrders = this.getUserOrders.bind(this);
    this.deleteOrderItem = this.deleteOrderItem.bind(this);
    this.getAllOrdersForAdmin = this.getAllOrdersForAdmin.bind(this);
    this.getOrderById = this.getOrderById.bind(this);
    this.changeOrderStatus = this.changeOrderStatus.bind(this);
  }

  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "کاربر لاگین نکرده است" });
      }

      const orders = await this.orderService.createOrder(userId);

      return res.status(201).json({
        message: orderMessages.ORDER_CREATED_SUCCESSFULLY,
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
        return res.status(401).json({ message: "User is not logged in" });
      }

      const status = req.query.status as string | undefined;

      const { totalPrice, orders } = await this.orderService.getUserOrders(
        userId,
        status,
      );

      return res.status(200).json({
        message: orderMessages.ORDER_USER_FETCHED_SUCCESSFULLY,
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

  async getAllOrdersForAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const status = req.query.status as string | undefined;

      const result = await this.orderService.getAllOrdersForAdmin(status);

      return res.status(200).json({
        message: orderMessages.ORDER_ADMIN_FETCHED_SUCCESSFULLY,
        data: result.orders,
        totalPrice: result.totalPrice,
      });
    } catch (error) {
      next(error);
    }
  }

  async getOrderById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      const orderId = parseInt(req.params.orderId);

      if (!userId) {
        return res.status(401).json({ message: "کاربر لاگین نکرده است" });
      }

      const order = await this.orderService.getOrderById(userId, orderId);

      return res.status(200).json({
        message: orderMessages.ORDER_ID_FETCHED_SUCCESSFULLY,
        data: order,
      });
    } catch (error) {
      next(error);
    }
  }

  async changeOrderStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const orderId = parseInt(req.params.orderId);
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ message: "وضعیت جدید مشخص نشده است" });
      }

      const updatedOrder = await this.orderService.changeOrderStatus(
        orderId,
        status,
      );

      return res.status(200).json({
        message: orderMessages.ORDER_CHANGE_STATUS_UPDATE_SUCCESSFULLY,
        data: updatedOrder,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new OrderController();
