import { Router } from "express";
import basketController from "./basket.controller";
import { rbacGuard } from "../../middleware/guard/rbac.guard";
import { Permissions } from "../../constant/role.constant";
import {
  validateCreateBasket,
  validateGetUserBasket,
  validateRemoveItem,
  validateUpdateQuantity,
} from "./basket.validation";

const basketRouter = Router();

basketRouter.post(
  "/",
  rbacGuard([Permissions.BASKET_CREATE]),
  validateCreateBasket,
  basketController.createBasket,
);
basketRouter.get(
  "/",
  rbacGuard([Permissions.BASKET_GETALL]),
  validateRemoveItem,
  basketController.getUserBasket,
);
basketRouter.patch(
  "/:itemId",
  rbacGuard([Permissions.BASKET_UPDATE]),
  validateUpdateQuantity,
  basketController.updateQuantity,
);
basketRouter.delete(
  "/:itemId",
  rbacGuard([Permissions.BASKET_UPDATE]),
  validateGetUserBasket,
  basketController.removeItem,
);

export default basketRouter;
