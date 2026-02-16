import { Router } from "express";
import orderController from "./order.controller";
import { rbacGuard } from "../../middleware/guard/rbac.guard";
import { Permissions } from "../../constant/role.constant";

const orderRouter = Router();

orderRouter.post(
  "/",
  rbacGuard([Permissions.ORDER_CREATE]),
  orderController.createOrder,
);
orderRouter.get(
  "/",
  rbacGuard([Permissions.ORDER_GETALL]),
  orderController.getUserOrders,
);

orderRouter.delete(
  "/:orderId",
  rbacGuard([Permissions.ORDER_DELETE]), // اجازه حذف سفارش
  orderController.deleteOrderItem
);

export default orderRouter;
