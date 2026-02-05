import createHttpError from "http-errors";
import { Permission, Role, UserRole } from "./rbac.model";
import {
  AssignPermissionToRoleDTO,
  AssignRoleToUserDTO,
  CreatePermissionDTO,
  CreateRoleDTO,
} from "./types/index.types";
import { RBACMessags } from "../../constant/messages";
import { User } from "../user/user.model";

class RBACService {
  private permissionModel: typeof Permission;
  private roleModel: typeof Role;
  private userModel: typeof User;

  constructor() {
    this.permissionModel = Permission;
    this.roleModel = Role;
    this.userModel = User;
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

  async assignRoleToUser(data: AssignRoleToUserDTO) {
    const { userId, roleIds } = data;

    const user = await User.findByPk(userId);
    if (!user) {
      throw createHttpError.NotFound(RBACMessags.USER_NOT_FOUND);
    }

    const roles = await this.roleModel.findAll({
      where: { id: roleIds },
    });

    if (roles.length !== roleIds.length) {
      throw createHttpError.NotFound(RBACMessags.ROLE_NOT_FOUND);
    }

    await UserRole.destroy({
      where: { user_id: userId },
    });

    const records = roleIds.map((roleId) => ({
      user_id: userId,
      role_id: roleId,
    }));

    await UserRole.bulkCreate(records);

    return { userId, roleIds };
  }

  async getAllRoles(): Promise<string[]> {
    const roles = await this.roleModel.findAll({ attributes: ["name"] });
    return roles.map((role) => role.name);
  }

  async getAllPermissions(): Promise<string[]> {
    const permissions = await this.permissionModel.findAll({
      attributes: ["name"],
    });
    return permissions.map((perm) => perm.name);
  }

  async updateRole(roleId: number, data: Partial<CreateRoleDTO>) {
    const role = await this.roleModel.findByPk(roleId);
    if (!role) {
      throw createHttpError.NotFound(RBACMessags.ROLE_NOT_FOUND);
    }

    await role.update(data);

    return role;
  }

  async updatePermission(
    permissionId: number,
    data: Partial<CreatePermissionDTO>,
  ) {
    const permission = await this.permissionModel.findByPk(permissionId);
    if (!permission) {
      throw createHttpError.NotFound(RBACMessags.PERMISSION_NOT_FOUND);
    }

    if (data.name && data.name !== permission.name) {
      const exists = await this.permissionModel.findOne({
        where: { name: data.name },
      });
      if (exists) {
        throw createHttpError.Conflict(RBACMessags.PERMISSION_ALREADY_EXISTS);
      }
    }

    await permission.update(data);

    return permission;
  }

  async deleteRole(roleId: number) {
    const role = await this.roleModel.findByPk(roleId);
    if (!role) {
      throw createHttpError.NotFound(RBACMessags.ROLE_NOT_FOUND);
    }

    await UserRole.destroy({ where: { role_id: roleId } });

    await role.destroy();

    return true;
  }

  async deletePermission(permissionId: number) {
  const permission = await this.permissionModel.findByPk(permissionId);
  if (!permission) {
    throw createHttpError.NotFound(RBACMessags.PERMISSION_NOT_FOUND);
  }

  await permission.destroy();

  return { id: permissionId, message: RBACMessags.PERMISSION_DELETE_SUCCESS };
}
}

export default new RBACService();
