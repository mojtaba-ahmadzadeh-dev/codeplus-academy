import { NextFunction, Request, Response } from "express";
import userService from "./user.service";
import { StatusCodes } from "http-status-codes";
import { userMessage } from "../../constant/messages";

class UserController {
  private service: typeof userService;

  constructor() {
    this.service = userService;

    this.getAllUsers = this.getAllUsers.bind(this);
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
}

export default new UserController();
