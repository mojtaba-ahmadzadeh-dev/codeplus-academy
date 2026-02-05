import { Router } from "express";
import rbacController from "./rbac.controller";
import {
  validateAssignPermissionToRole,
  validateAssignRoleToUser,
  validateCreatePermission,
  validateCreateRole,
} from "./rbac.validation";
import { rbacGuard } from "../../middleware/guard/rbac.guard";
import { Roles } from "../../constant/role_rbac.constant";

const RBACRouter: Router = Router();

RBACRouter.post(
  "/create-permission",
  rbacGuard([Roles.ADMIN]),
  validateCreatePermission,
  rbacController.createPermission,
);

RBACRouter.post(
  "/create-role",
  rbacGuard([Roles.ADMIN]),
  validateCreateRole,
  rbacController.createRole,
);
RBACRouter.post(
  "/assign-permission-to-role",
  rbacGuard([Roles.ADMIN]),
  validateAssignPermissionToRole,
  rbacController.assignPermissionToRole,
);
RBACRouter.post(
  "/assign-role-to-user",
  rbacGuard([Roles.ADMIN]),
  validateAssignRoleToUser,
  rbacController.assignRoleToUser,
);

export default RBACRouter;
