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
}

export default new NotificationService();
