import { Router } from "express";
import categoryController from "./category.controller";
import { validateCreateCategory, validateUpdateCategory } from "./category.validation";
import { rbacGuard } from "../../middleware/guard/rbac.guard";
import { Permissions } from "../../constant/role.constant";

const categoryRouter: Router = Router();

categoryRouter.post('/create', rbacGuard([Permissions.CREATE_CATEGORY]), validateCreateCategory, categoryController.createCategory)
categoryRouter.get("/", rbacGuard([Permissions.CATEGORY_GETALL]), categoryController.getAllCategories);
categoryRouter.put("/update/:id", rbacGuard([Permissions.CREATE_UPDATE_BY_ID]), validateUpdateCategory , categoryController.updateCategory);

export default categoryRouter