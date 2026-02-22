import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import rbacService from "./rbac.service";
import {
  AssignPermissionToRoleDTO,
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
    this.getAllRoles = this.getAllRoles.bind(this);
    this.getAllPermissions = this.getAllPermissions.bind(this);
    this.updateRole = this.updateRole.bind(this);
    this.updatePermission = this.updatePermission.bind(this);
    this.deleteRole = this.deleteRole.bind(this);
    this.deletePermission = this.deletePermission.bind(this);
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
        statusCode: StatusCodes.CREATED,
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
        statusCodes: StatusCodes.CREATED,
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
        statusCodes: StatusCodes.OK,
        message: RBACMessags.PERMISSION_ASSIGN_SUCCESS,
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
        data: roles, // حالا name و description هر نقش اینجا هست
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllPermissions(req: Request, res: Response, next: NextFunction) {
    try {
      const permissions = await this.service.getAllPermissions();
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: RBACMessags.PERMISSIONS_FETCH_SUCCESS,
        data: permissions,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateRole(
    req: Request<{ id: string }, {}, Partial<CreateRoleDTO>>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      const updatedRole = await this.service.updateRole(Number(id), {
        name,
        description,
      });

      res.status(StatusCodes.OK).json({
        statusCodes: StatusCodes.OK,
        message: RBACMessags.ROLE_UPDATE_SUCCESS,
        data: updatedRole,
      });
    } catch (error) {
      next(error);
    }
  }

  async updatePermission(
    req: Request<{ id: string }, {}, Partial<CreatePermissionDTO>>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      const updatedPermission = await this.service.updatePermission(
        Number(id),
        {
          name,
          description,
        },
      );

      res.status(StatusCodes.OK).json({
        statusCodes: StatusCodes.OK,
        message: RBACMessags.PERMISSION_UPDATE_SUCCESS,
        data: updatedPermission,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteRole(
    req: Request<{ id: string }, {}, {}>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;

      await this.service.deleteRole(Number(id));

      res.status(StatusCodes.OK).json({
        statusCodes: StatusCodes.OK,
        message: RBACMessags.ROLE_DELETE_SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  }

  async deletePermission(
    req: Request<{ id: string }, {}, {}>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const result = await this.service.deletePermission(Number(id));

      res.status(StatusCodes.OK).json({
        statusCodes: StatusCodes.OK,
        message: RBACMessags.PERMISSION_DELETE_SUCCESS,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new RBACController();
