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

    async getNotifications(userId: number, options?: { limit?: number; offset?: number }) {
    const notifications = await this.notificationModel.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
      limit: options?.limit || 20,
      offset: options?.offset || 0,
    });

    return notifications;
  }
}

export default new NotificationService();
