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

RBACRouter.get(
  "/roles",
  rbacGuard([Roles.ADMIN, Roles.TEACHER]),
  validateAssignRoleToUser,
  rbacController.getAllRoles,
);

RBACRouter.get(
  "/permissions",
  rbacGuard([Roles.ADMIN]),
  rbacController.getAllPermissions,
);

RBACRouter.put(
  "/role/:id",
  rbacGuard([Roles.ADMIN]),
  rbacController.updateRole,
);

RBACRouter.put(
  "/permission/:id",
  rbacGuard([Roles.ADMIN]),
  rbacController.updatePermission,
);

RBACRouter.delete(
  "/role/:id",
  rbacGuard([Roles.ADMIN]),
  rbacController.deleteRole,
);

RBACRouter.delete(
  "/permission/:id",
  rbacGuard([Roles.ADMIN]),
  rbacController.deletePermission,
);

export default RBACRouter;
