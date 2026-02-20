import { Request, Response, NextFunction } from "express";
import notificationService from "./notification.service";
import createHttpError from "http-errors";

class NotificationController {
  private notificationService: typeof notificationService;
  constructor() {
    this.notificationService = notificationService;

    this.createNotification = this.createNotification.bind(this);
    this.getNotifications = this.getNotifications.bind(this);
    this.getNotificationById = this.getNotificationById.bind(this);
    this.markNotificationAsRead = this.markNotificationAsRead.bind(this);
    this.markAllNotificationsAsRead =
      this.markAllNotificationsAsRead.bind(this);
    this.getSeenNotifications = this.getSeenNotifications.bind(this);
    this.getUnseenNotifications = this.getUnseenNotifications.bind(this);
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

  async getNotifications(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) throw createHttpError.Unauthorized("کاربر وارد نشده است");

      const limit = Number(req.query.limit) || 20;
      const offset = Number(req.query.offset) || 0;

      const notifications = await this.notificationService.getNotifications(
        userId,
        { limit, offset },
      );

      return res.status(200).json({
        success: true,
        message: "Notifications fetched successfully",
        data: notifications,
      });
    } catch (error) {
      next(error);
    }
  }

  async getNotificationById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) throw createHttpError.Unauthorized("کاربر وارد نشده است");
      const id = Number(req.params.id);

      const notification = await this.notificationService.getNotificationById(
        userId,
        id,
      );

      return res.status(200).json({
        success: true,
        message: "Notification fetched successfully",
        data: notification,
      });
    } catch (error) {
      next(error);
    }
  }

  async markNotificationAsRead(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = req.user?.id;
      if (!userId) throw createHttpError.Unauthorized("کاربر وارد نشده است");

      const id = Number(req.params.id);
      if (!id) throw createHttpError.BadRequest("آیدی نوتیفیکیشن معتبر نیست");

      const notification = await this.notificationService.markAsRead(
        userId,
        id,
      );

      return res.status(200).json({
        success: true,
        message: "Notification marked as read",
        data: notification,
      });
    } catch (error) {
      next(error);
    }
  }

  async markAllNotificationsAsRead(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = req.user?.id;
      if (!userId) throw createHttpError.Unauthorized("کاربر وارد نشده است");

      const result = await this.notificationService.markAllAsRead(userId);

      return res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }

  async getSeenNotifications(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) throw createHttpError.Unauthorized("کاربر وارد نشده است");

      const limit = Number(req.query.limit) || 20;
      const offset = Number(req.query.offset) || 0;

      const notifications = await this.notificationService.getSeenNotifications(
        userId,
        {
          limit,
          offset,
        },
      );

      return res.status(200).json({
        success: true,
        message: "Seen notifications fetched successfully",
        data: notifications,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUnseenNotifications(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = req.user?.id;
      if (!userId) throw createHttpError.Unauthorized("کاربر وارد نشده است");

      const limit = Number(req.query.limit) || 20;
      const offset = Number(req.query.offset) || 0;

      const notifications =
        await this.notificationService.getUnseenNotifications(userId, {
          limit,
          offset,
        });

      return res.status(200).json({
        success: true,
        message: "Unseen notifications fetched successfully",
        data: notifications,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new NotificationController();
