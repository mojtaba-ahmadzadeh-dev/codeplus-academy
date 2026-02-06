import { Router } from "express";
import categoryController from "./category.controller";
import {
  validateCreateCategory,
  validateDeleteCategory,
  validateUpdateCategory,
} from "./category.validation";
import { rbacGuard } from "../../middleware/guard/rbac.guard";
import { Permissions } from "../../constant/role.constant";

const categoryRouter: Router = Router();

categoryRouter.post(
  "/create",
  rbacGuard([Permissions.CREATE_CATEGORY]),
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
  rbacGuard([Permissions.CREATE_UPDATE_BY_ID]),
  validateUpdateCategory,
  categoryController.updateCategory,
);
categoryRouter.delete(
  "/delete/:id",
  rbacGuard([Permissions.CATEGORY_DELETE_BY_ID]),
  validateDeleteCategory,
  categoryController.deleteCategory,
);
categoryRouter.get("/:id", categoryController.getCategoryById);
export default categoryRouter;
