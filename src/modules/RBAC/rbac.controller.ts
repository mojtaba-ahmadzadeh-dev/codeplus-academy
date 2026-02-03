import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import rbacService from "./rbac.service";
import { CreatePermissionDTO, CreateRoleDTO } from "./types/index.types";
import { RBACMessags } from "../../constant/messages";

class RBACController {
  private service: typeof rbacService;

  constructor() {
    this.service = rbacService;

    this.createPermission = this.createPermission.bind(this);
    this.createRole = this.createRole.bind(this);
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
    next: NextFunction
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
}

export default new RBACController();
