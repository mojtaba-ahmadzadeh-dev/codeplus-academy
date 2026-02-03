import { Router } from "express";
import rbacController from "./rbac.controller";
import { validateCreatePermission } from "./rbac.validation";

const RBACRouter: Router = Router();

RBACRouter.post('/create-permission', validateCreatePermission, rbacController.createPermission)

export default RBACRouter