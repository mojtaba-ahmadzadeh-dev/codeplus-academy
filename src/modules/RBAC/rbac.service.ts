import createHttpError from "http-errors";
import { Permission, Role } from "./rbac.model";
import {
  AssignPermissionToRoleDTO,
  CreatePermissionDTO,
  CreateRoleDTO,
} from "./types/index.types";
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

async assignPermissionToRole(data: AssignPermissionToRoleDTO) {
  const { roleId, permissionIds } = data;

  const role = await this.roleModel.findByPk(roleId);
  if (!role) {
    throw createHttpError.NotFound(RBACMessags.ROLE_NOT_FOUND);
  }

  const permissions = await Permission.findAll({
    where: { id: permissionIds },
  });

  if (permissions.length !== permissionIds.length) {
    throw createHttpError.NotFound(RBACMessags.PERMISSION_NOT_FOUND);
  }

  await role.addPermissions(permissions);

  return {
    roleId,
    permissionIds,
  };
}

}

export default new RBACService();
