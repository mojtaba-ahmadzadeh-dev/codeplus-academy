import { NextFunction, Request, Response } from "express";
import userService from "./user.service";
import { StatusCodes } from "http-status-codes";
import { userMessage } from "../../constant/messages";
import createHttpError from "http-errors";

class UserController {
  private service: typeof userService;

  constructor() {
    this.service = userService;

    this.getAllUsers = this.getAllUsers.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.updateUserById = this.updateUserById.bind(this);
    this.removeUserById = this.removeUserById.bind(this);
    this.changeRole = this.changeRole.bind(this);
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

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: userMessage.UPDATE_USER_SUCCESSFULLY,
        data: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
