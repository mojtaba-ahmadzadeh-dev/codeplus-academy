import { NextFunction, Request, Response } from "express";
import userService from "./user.service";
import { StatusCodes } from "http-status-codes";
import { userMessage } from "../../constant/messages";

class UserController {
  private service: typeof userService;

  constructor() {
    this.service = userService;

    this.getAllUsers = this.getAllUsers.bind(this);
    this.getUserById = this.getUserById.bind(this);
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
        message: "User retrieved successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
