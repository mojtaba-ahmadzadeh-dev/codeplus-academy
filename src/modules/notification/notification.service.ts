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

  async getNotifications(userId: number, query?: any) {
    const limit = query?.limit ? Number(query.limit) : 20;
    const offset = query?.offset ? Number(query.offset) : 0;

    const notifications = await this.notificationModel.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
      limit,
      offset,
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

  async getSeenNotifications(userId: number, query?: any) {
    const limit = query?.limit ? Number(query.limit) : 20;
    const offset = query?.offset ? Number(query.offset) : 0;

    const notifications = await this.notificationModel.findAll({
      where: {
        userId,
        read: true,
      },
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });

    return notifications;
  }

  async getUnseenNotifications(userId: number, query?: any) {
    const limit = query?.limit ? Number(query.limit) : 20;
    const offset = query?.offset ? Number(query.offset) : 0;

    const notifications = await this.notificationModel.findAll({
      where: {
        userId,
        read: false,
      },
      order: [["createdAt", "DESC"]],
      limit,
      offset,
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

  async countUnseenNotifications(userId: number) {
    const count = await this.notificationModel.count({
      where: { userId, read: false },
    });

    return { count };
  }
}

export default new NotificationService();
