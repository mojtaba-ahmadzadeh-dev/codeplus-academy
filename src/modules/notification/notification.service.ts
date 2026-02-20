import createHttpError from "http-errors";
import { Notification } from "./notification.model";
import { NotificationCreationAttributes } from "./types/index.types";

class NotificationService {
  private notificationModel: typeof Notification;
  constructor() {
    this.notificationModel = Notification;
  }

  async createNotification(data: NotificationCreationAttributes) {
    const notification = await this.notificationModel.create(data);
    return notification;
  }

  async getNotifications(
    userId: number,
    options?: { limit?: number; offset?: number },
  ) {
    const notifications = await this.notificationModel.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
      limit: options?.limit || 20,
      offset: options?.offset || 0,
    });

    return notifications;
  }

  async getNotificationById(userId: number, id: number) {
    const notification = await this.notificationModel.findOne({
      where: { id, userId },
    });

    if (!notification) throw createHttpError.NotFound("نوتیفیکیشن پیدا نشد");

    return notification;
  }

  async markAsRead(userId: number, id: number) {
    const notification = await this.notificationModel.findOne({
      where: { id, userId },
    });

    if (!notification) throw createHttpError.NotFound("نوتیفیکیشن پیدا نشد");

    notification.read = true;
    await notification.save();

    return notification;
  }

  async markAllAsRead(userId: number) {
    const [updatedCount] = await this.notificationModel.update(
      { read: true },
      { where: { userId, read: false } },
    );

    return { message: `${updatedCount} notifications marked as read` };
  }

  async getSeenNotifications(
    userId: number,
    options?: { limit?: number; offset?: number },
  ) {
    const notifications = await this.notificationModel.findAll({
      where: {
        userId,
        read: true,
      },
      order: [["createdAt", "DESC"]],
      limit: options?.limit || 20,
      offset: options?.offset || 0,
    });

    return notifications;
  }

  async getUnseenNotifications(
    userId: number,
    options?: { limit?: number; offset?: number },
  ) {
    const notifications = await this.notificationModel.findAll({
      where: {
        userId,
        read: false,
      },
      order: [["createdAt", "DESC"]],
      limit: options?.limit ?? 20,
      offset: options?.offset ?? 0,
    });

    return notifications;
  }

  async deleteNotification(userId: number, id: number) {
    const notification = await this.notificationModel.findOne({
      where: { id, userId },
    });

    if (!notification) throw createHttpError.NotFound("نوتیفیکیشن پیدا نشد");

    await notification.destroy();

    return { message: "Notification deleted successfully" };
  }

  async deleteAllNotifications(userId: number) {
  const deletedCount = await this.notificationModel.destroy({
    where: { userId },
  });

  return { message: `${deletedCount} notifications deleted successfully` };
}
}

export default new NotificationService();
