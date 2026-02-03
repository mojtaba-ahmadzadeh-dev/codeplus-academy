import createHttpError from "http-errors";
import { Permission } from "./rbac.model";
import { CreatePermissionDTO } from "./types/index.types";
import { RBACMessags } from "../../constant/messages";

class RBACService {
  async createPermission(data: CreatePermissionDTO) {
    const { name, description } = data;

    const exists = await Permission.findOne({
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
}

export default new RBACService();
