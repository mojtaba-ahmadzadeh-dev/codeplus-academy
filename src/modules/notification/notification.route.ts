import { Router } from "express";
import notificationController from "./notification.controller";
import { rbacGuard } from "../../middleware/guard/rbac.guard";
import { Permissions } from "../../constant/role.constant";

const notificationRouter = Router();

notificationRouter.post(
  "/",
  rbacGuard([Permissions.NOTIFICATION_CREATE]),
  notificationController.createNotification,
);

notificationRouter.get(
  "/",
  rbacGuard([Permissions.NOTIFICATION_CREATE]),
  notificationController.getNotifications,
);

notificationRouter.get(
  "/seen",
  rbacGuard([Permissions.NOTIFICATION_CREATE]),
  notificationController.getSeenNotifications,
);

notificationRouter.get(
  "/unseen",
  rbacGuard([Permissions.NOTIFICATION_CREATE]),
  notificationController.getUnseenNotifications,
);

notificationRouter.get(
  "/:id",
  rbacGuard([Permissions.NOTIFICATION_CREATE]),
  notificationController.getNotificationById,
);

notificationRouter.put(
  "/:id/seen",
  rbacGuard([Permissions.NOTIFICATION_CREATE]),
  notificationController.markNotificationAsRead,
);

// mark all notifications as read
notificationRouter.put(
  "/seen-all",
  rbacGuard([Permissions.NOTIFICATION_CREATE]),
  notificationController.markAllNotificationsAsRead
);
export default notificationRouter;
