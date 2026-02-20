import { NOTIFICATION_TYPE } from "../../../constant/notification.constant";

// تمام فیلدهای مدل Notification
export interface NotificationAttributes {
  id: number;
  title: string;
  message: string;
  type: (typeof NOTIFICATION_TYPE)[keyof typeof NOTIFICATION_TYPE];
  read: boolean;
  userId: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface NotificationCreationAttributes
  extends Omit<NotificationAttributes, "id" | "createdAt" | "updatedAt"> {}