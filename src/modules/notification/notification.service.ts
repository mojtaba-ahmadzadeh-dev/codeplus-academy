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
}

export default new NotificationService();
