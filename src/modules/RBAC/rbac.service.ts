import createHttpError from "http-errors";
import { Permission, Role } from "./rbac.model";
import { CreatePermissionDTO, CreateRoleDTO } from "./types/index.types";
import { RBACMessags } from "../../constant/messages";

class RBACService {
  private permissionModel: typeof Permission;
  private roleModel: typeof Role;

  constructor() {
    this.permissionModel = Permission;
    this.roleModel = Role;
  }

  async createPermission(data: CreatePermissionDTO) {
    const { name, description } = data;

    const exists = await this.permissionModel.findOne({
      where: { name },
    });

    if (exists) {
      throw createHttpError(409, RBACMessags.PERMISSION_ALREADY_EXISTS);
    }

    const permission = await Permission.create({
      name,
      description,
    });

    return permission;
  }

  async createRole(data: CreateRoleDTO) {
    const { name, description } = data;

    const exists = await this.roleModel.findOne({ where: { name } });
    if (exists) {
      throw createHttpError.Conflict(RBACMessags.ROLE_ALREADY_EXISTS);
    }

    const role = await this.roleModel.create({ name, description });
    return role;
  }
}

export default new RBACService();
