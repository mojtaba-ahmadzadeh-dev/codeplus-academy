import { NextFunction, Request, Response } from "express";
import userService from "./user.service";
import { StatusCodes } from "http-status-codes";
import { userMessage } from "../../constant/messages";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";

class UserController {
  private service: typeof userService;

  constructor() {
    this.service = userService;

    this.getAllUsers = this.getAllUsers.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.updateUserById = this.updateUserById.bind(this);
    this.removeUserById = this.removeUserById.bind(this);
    this.changeRole = this.changeRole.bind(this);
    this.createUser = this.createUser.bind(this);
    this.banUser = this.banUser.bind(this);
    this.getAllUsersBookmarks = this.getAllUsersBookmarks.bind(this);
    this.getAllUsersLikes = this.getAllUsersLikes.bind(this);
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.service.getAllUsers();

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: userMessage.GET_ALL_USERS_SUCCESSFULLY,
        users,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const user = await this.service.getUserById(id);

      res.status(StatusCodes.OK).json({
        statusCode: 200,
        message: userMessage.GET_USER_SUCCESSFULLY,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const payload = req.body;

      if (req.file) {
        payload.avatar = `/uploads/avatars/${req.file.filename}`;
      }

      const updatedUser = await this.service.updateUserById(
        Number(id),
        payload,
      );

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: userMessage.UPDATE_USER_SUCCESSFULLY,
        data: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  }

  async removeUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deletedUser = await this.service.removeUserById(Number(id));

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: userMessage.DELETE_USER_SUCCESSFULLY,
        data: deletedUser,
      });
    } catch (error) {
      next(error);
    }
  }

  async changeRole(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { role } = req.body;

      if (!role) {
        throw createHttpError.BadRequest(userMessage.ROLE_IS_REQUIRED);
      }

      const updatedUser = await this.service.changeRole(Number(id), role);

      if (!env.JWT.ACCESS_SECRET || !env.JWT.REFRESH_SECRET) {
        throw createHttpError.InternalServerError(
          userMessage.ACCESS_TOKEN_SECRET_NOT_DEFINED,
        );
      }

      const payload = {
        userId: updatedUser.id,
        mobile: updatedUser.mobile,
        roles: [updatedUser.role],
      };

      const accessToken = jwt.sign(payload, env.JWT.ACCESS_SECRET, {
        expiresIn: env.JWT.ACCESS_EXPIRES_IN || "7d",
      });

      const refreshToken = jwt.sign(payload, env.JWT.REFRESH_SECRET, {
        expiresIn: env.JWT.REFRESH_EXPIRES_IN || "30d",
      });

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: userMessage.UPDATE_USER_SUCCESSFULLY,
        data: {
          id: updatedUser.id,
          mobile: updatedUser.mobile,
          role: updatedUser.role,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body;

      if (req.file) {
        payload.avatar = `/uploads/avatars/${req.file.filename}`;
      }

      const user = await this.service.createUser(payload);

      res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        message: userMessage.USER_CREATED_SUCCESSFULLY,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async banUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { is_banned } = req.body;

      if (typeof is_banned !== "boolean") {
        throw createHttpError.BadRequest(userMessage.BAN_STATUS_REQUIRED);
      }

      const user = await this.service.banUser(Number(id), is_banned);

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: is_banned
          ? userMessage.USER_BANNED
          : userMessage.USER_UNBANNED,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllUsersBookmarks(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.getAllUsersBookmarks();

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "All users bookmarks retrieved successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllUsersLikes(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.getAllUsersLikes();

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "All users likes retrieved successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
