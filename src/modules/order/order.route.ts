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
  "/user",
  rbacGuard([Permissions.ORDER_GETALL]),
  orderController.getUserOrders,
);

orderRouter.delete(
  "/:orderId",
  rbacGuard([Permissions.ORDER_DELETE]), 
  orderController.deleteOrderItem
);

orderRouter.get(
  "/admin",
  rbacGuard([Permissions.ORDER_GETALL_ADMIN]), // فقط ادمین
  orderController.getAllOrdersForAdmin
);

export default orderRouter;
