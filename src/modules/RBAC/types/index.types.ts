export interface CreatePermissionDTO {
  name: string;
  description?: string;
}

export interface CreateRoleDTO {
  name: string;
  description?: string;
}

export interface AssignPermissionToRoleDTO {
  roleId: number;
  permissionIds: number[];
}

export interface AssignRoleToUserDTO {
  userId: number;
  roleIds: number[];
}