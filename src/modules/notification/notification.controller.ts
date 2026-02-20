import { Request, Response, NextFunction } from "express";
import notificationService from "./notification.service";
import createHttpError from "http-errors";

class NotificationController {
  private notificationService: typeof notificationService;
  constructor() {
    this.notificationService = notificationService;

    this.createNotification = this.createNotification.bind(this);
  }

  async createNotification(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, message, type } = req.body;

      const userId = req.user?.id;

      if (!userId) throw createHttpError.Unauthorized("کاربر وارد نشده است");

      const notification = await this.notificationService.createNotification({
        title,
        message,
        type,
        userId,
        read: false,
      });

      return res.status(201).json({
        success: true,
        message: "Notification created successfully",
        data: notification,
      });
    } catch (error) {
      next(error);
    }
  }

  
}

export default new NotificationController();
