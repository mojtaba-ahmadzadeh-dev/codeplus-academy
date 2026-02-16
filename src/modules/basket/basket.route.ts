import { Router } from "express";
import basketController from "./basket.controller";
import { rbacGuard } from "../../middleware/guard/rbac.guard";
import { Permissions } from "../../constant/role.constant";

const basketRouter = Router();

basketRouter.post(
  "/",
  rbacGuard([Permissions.BASKET_CREATE]),
  basketController.createBasket,
);
basketRouter.get("/", rbacGuard([]), basketController.getUserBasket);
basketRouter.patch(
  "/:itemId",
  rbacGuard([Permissions.BASKET_CREATE]),
  basketController.updateQuantity,
);
basketRouter.delete(
  "/:itemId",
  rbacGuard([Permissions.BASKET_CREATE]),
  basketController.removeItem,
);

export default basketRouter;
