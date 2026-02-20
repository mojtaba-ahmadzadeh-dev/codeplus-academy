import { Router } from "express";
import notificationController from "./notification.controller";
import { rbacGuard } from "../../middleware/guard/rbac.guard";
import { Permissions } from "../../constant/role.constant";

const notificationRouter = Router();

notificationRouter.post("/", rbacGuard([Permissions.NOTIFICATION_CREATE]) , notificationController.createNotification);

export default notificationRouter;
