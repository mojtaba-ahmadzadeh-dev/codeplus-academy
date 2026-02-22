import { Router } from "express";
import rbacController from "./rbac.controller";
import {
  validateAssignPermissionToRole,
  validateCreatePermission,
  validateCreateRole,
} from "./rbac.validation";

const RBACRouter: Router = Router();

RBACRouter.post(
  "/create-permission",
  validateCreatePermission,
  rbacController.createPermission,
);

RBACRouter.post(
  "/create-role",
  validateCreateRole,
  rbacController.createRole,
);

RBACRouter.post(
  "/assign-permission-to-role",
  validateAssignPermissionToRole,
  rbacController.assignPermissionToRole,
);

RBACRouter.get(
  "/roles",
  rbacController.getAllRoles,
);

RBACRouter.get(
  "/permissions",
  rbacController.getAllPermissions,
);

RBACRouter.put(
  "/role/:id",
  rbacController.updateRole,
);

RBACRouter.put(
  "/permission/:id",
  rbacController.updatePermission,
);

RBACRouter.delete(
  "/role/:id",
  rbacController.deleteRole,
);

RBACRouter.delete(
  "/permission/:id",
  rbacController.deletePermission,
);

export default RBACRouter;