import { Router } from "express";
import departmentController from "./department.controller";
import { rbacGuard } from "../../middleware/guard/rbac.guard";
import { Permissions } from "../../constant/role.constant";

const departmentRouter = Router();

departmentRouter.post(
  "/",
  rbacGuard([Permissions.DEPARTMENT_CREATE]),
  departmentController.createDepartment,
);

departmentRouter.get(
  "/",
  rbacGuard([Permissions.DEPARTMENT_GETALL]),
  departmentController.getAllDepartments,
);

departmentRouter.put(
  "/:id",
  rbacGuard([Permissions.DEPARTMENT_UPDATE]),
  departmentController.updateDepartment,
);

departmentRouter.delete(
  "/:id",
  rbacGuard([Permissions.DEPARTMENT_DELETE_ID]),
  departmentController.deleteDepartment,
);

export default departmentRouter;
