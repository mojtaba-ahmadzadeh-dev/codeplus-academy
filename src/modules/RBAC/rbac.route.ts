import { Router } from "express";
import rbacController from "./rbac.controller";
import {
  validateAssignPermissionToRole,
  validateAssignRoleToUser,
  validateCreatePermission,
  validateCreateRole,
} from "./rbac.validation";
import { authGuard } from "../../middleware/guard/auth.guard";
import { roleGuard } from "../../middleware/guard/rbac.guard";

const RBACRouter: Router = Router();

RBACRouter.post(
  "/create-permission",
  authGuard,
  roleGuard("admin"),
  validateCreatePermission,
  rbacController.createPermission,
);
RBACRouter.post(
  "/create-role",
  authGuard,
  roleGuard("admin"),
  validateCreateRole,
  rbacController.createRole,
);
RBACRouter.post(
  "/assign-permission-to-role",
  authGuard,
  roleGuard("admin"),
  validateAssignPermissionToRole,
  rbacController.assignPermissionToRole,
);
RBACRouter.post(
  "/assign-role-to-user",
  authGuard,
  roleGuard("admin"),
  validateAssignRoleToUser,
  rbacController.assignRoleToUser,
);

export default RBACRouter;
