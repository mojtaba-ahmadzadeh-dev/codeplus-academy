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
  "/me",
  rbacGuard([Permissions.ORDER_GETALL]),
  orderController.getUserOrders,
);

orderRouter.delete(
  "/:id",
  rbacGuard([Permissions.ORDER_DELETE]),
  orderController.deleteOrderItem,
);

orderRouter.get(
  "/admin",
  rbacGuard([Permissions.ORDER_GETALL_ADMIN]),
  orderController.getAllOrdersForAdmin,
);

orderRouter.get(
  "/:id",
  rbacGuard([Permissions.ORDER_GET_BY_ID]),
  orderController.getOrderById,
);

orderRouter.patch(
  "/:id/status",
  rbacGuard([Permissions.ORDER_UPDATE_STATUS]),
  orderController.changeOrderStatus,
);

export default orderRouter;
