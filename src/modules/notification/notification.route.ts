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
  rbacGuard([Permissions.NOTIFICATION_GETALL]),
  notificationController.getNotifications,
);

notificationRouter.get(
  "/seen",
  rbacGuard([Permissions.NOTIFICATION_SEEN]),
  notificationController.getSeenNotifications,
);

notificationRouter.get(
  "/unseen",
  rbacGuard([Permissions.NOTIFICATION_UNSEEN]),
  notificationController.getUnseenNotifications,
);

notificationRouter.get(
  "/count",
  rbacGuard([Permissions.NOTIFICATION_COUNT]),
  notificationController.countUnseenNotifications,
);

notificationRouter.get(
  "/:id",
  rbacGuard([Permissions.NOTIFICATION_BT_ID]),
  notificationController.getNotificationById,
);

notificationRouter.put(
  "/:id/seen",
  rbacGuard([Permissions.NOTIFICATION__UPDATE_BY_ID_SEEN]),
  notificationController.markNotificationAsRead,
);

// mark all notifications as read
notificationRouter.put(
  "/seen-all",
  rbacGuard([Permissions.NOTIFICATION_UPDATE_SEEND_ALL]),
  notificationController.markAllNotificationsAsRead
);

notificationRouter.delete(
  "/:id",
  rbacGuard([Permissions.NOTIFICATION_DELETE_ID]),
  notificationController.deleteNotification,
);

notificationRouter.delete(
  "/",
  rbacGuard([Permissions.NOTIFICATION_DELETE]),
  notificationController.deleteAllNotifications,
);

export default notificationRouter;
