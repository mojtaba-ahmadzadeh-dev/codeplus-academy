import { Router } from "express";
import rbacController from "./rbac.controller";
import { validateCreatePermission, validateCreateRole } from "./rbac.validation";

const RBACRouter: Router = Router();

RBACRouter.post('/create-permission', validateCreatePermission, rbacController.createPermission)
RBACRouter.post('/create-role', validateCreateRole, rbacController.createRole)

export default RBACRouter