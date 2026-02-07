import { Router } from "express";
import categoryController from "./category.controller";
import {
  validateCreateCategory,
  validateDeleteCategory,
  validateGetCategory,
  validateUpdateCategory,
} from "./category.validation";
import { rbacGuard } from "../../middleware/guard/rbac.guard";
import { Permissions } from "../../constant/role.constant";

const categoryRouter: Router = Router();

categoryRouter.post(
  "/create",
  rbacGuard([Permissions.CATEGORY_CREATE]),
  validateCreateCategory,
  categoryController.createCategory,
);
categoryRouter.get(
  "/",
  rbacGuard([Permissions.CATEGORY_GETALL]),
  categoryController.getAllCategories,
);
categoryRouter.put(
  "/update/:id",
  rbacGuard([Permissions.CATEGORY_UPDATE_BY_ID]),
  validateUpdateCategory,
  categoryController.updateCategory,
);
categoryRouter.delete(
  "/delete/:id",
  rbacGuard([Permissions.CATEGORY_DELETE_BY_ID]),
  validateDeleteCategory,
  categoryController.deleteCategory,
);
categoryRouter.get(
  "/:id",
  rbacGuard([Permissions.CATEGORY_GET_BY_ID]),
  validateGetCategory,
  categoryController.getCategoryById,
);
export default categoryRouter;
