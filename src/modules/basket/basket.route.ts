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

// 🟢 CREATE BASKET
basketRouter.post(
  "/",
  rbacGuard([Permissions.BASKET_CREATE]),
  validateCreateBasket,
  basketController.createBasket,
);

// 🟢 GET USER BASKET
basketRouter.get(
  "/",
  rbacGuard([Permissions.BASKET_GETALL]),
  validateGetUserBasket, // ✅ اصلاح شد
  basketController.getUserBasket,
);

// 🟢 UPDATE QUANTITY
basketRouter.patch(
  "/:itemId",
  rbacGuard([Permissions.BASKET_UPDATE]),
  validateUpdateQuantity,
  basketController.updateQuantity,
);

// 🟢 REMOVE ITEM
basketRouter.delete(
  "/:itemId",
  rbacGuard([Permissions.BASKET_UPDATE]),
  validateRemoveItem, // ✅ اصلاح شد
  basketController.removeItem,
);

export default basketRouter;