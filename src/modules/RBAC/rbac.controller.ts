import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import rbacService from "./rbac.service";
import {
  AssignPermissionToRoleDTO,
  AssignRoleToUserDTO,
  CreatePermissionDTO,
  CreateRoleDTO,
} from "./types/index.types";
import { RBACMessags } from "../../constant/messages";

class RBACController {
  private service: typeof rbacService;

  constructor() {
    this.service = rbacService;

    this.createPermission = this.createPermission.bind(this);
    this.createRole = this.createRole.bind(this);
    this.assignPermissionToRole = this.assignPermissionToRole.bind(this);
    this.assignRoleToUser = this.assignRoleToUser.bind(this);
    this.getAllRoles = this.getAllRoles.bind(this);
  }

  async createPermission(
    req: Request<{}, {}, CreatePermissionDTO>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { name, description } = req.body;

      const permission = await this.service.createPermission({
        name,
        description,
      });

      res.status(StatusCodes.CREATED).json({
        success: true,
        message: RBACMessags.PERMISSION_ASSIGN_SUCCESS,
        data: permission,
      });
    } catch (error) {
      next(error);
    }
  }

  async createRole(
    req: Request<{}, {}, CreateRoleDTO>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { name, description } = req.body;

      const role = await this.service.createRole({ name, description });

      res.status(StatusCodes.CREATED).json({
        success: true,
        message: RBACMessags.ROLE_ASSIGN_SUCCESS,
        data: role,
      });
    } catch (error) {
      next(error);
    }
  }

  async assignPermissionToRole(
    req: Request<{}, {}, AssignPermissionToRoleDTO>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await rbacService.assignPermissionToRole(req.body);

      res.status(StatusCodes.OK).json({
        success: true,
        message: RBACMessags.PERMISSION_ASSIGN_SUCCESS,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async assignRoleToUser(
    req: Request<{}, {}, AssignRoleToUserDTO>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await this.service.assignRoleToUser(req.body);

      res.status(StatusCodes.OK).json({
        success: true,
        message: RBACMessags.ROLE_ASSIGN_SUCCESS,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllRoles(req: Request, res: Response, next: NextFunction) {
    try {
      const roles = await this.service.getAllRoles();
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Roles fetched successfully",
        data: roles,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new RBACController();
