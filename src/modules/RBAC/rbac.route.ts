import { Router } from "express";
import rbacController from "./rbac.controller";
import { validateAssignPermissionToRole, validateAssignRoleToUser, validateCreatePermission, validateCreateRole } from "./rbac.validation";

const RBACRouter: Router = Router();

RBACRouter.post('/create-permission', validateCreatePermission, rbacController.createPermission)
RBACRouter.post('/create-role', validateCreateRole, rbacController.createRole)
RBACRouter.post('/assign-permission-to-role', validateAssignPermissionToRole, rbacController.assignPermissionToRole)
RBACRouter.post('/assign-role-to-user', validateAssignRoleToUser , rbacController.assignRoleToUser)

export default RBACRouter