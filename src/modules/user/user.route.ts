import { Router } from "express";
import userController from "./user.controller";
import { upload } from "../../middleware/upload/upload.middleware";
import { rbacGuard } from "../../middleware/guard/rbac.guard";
import { Permissions } from "../../constant/role.constant";
import {
  validateBanUser,
  validateChangeUserRole,
  validateCreateUser,
  validateUpdateUser,
} from "./user.validation";

const userRouter: Router = Router();

userRouter.get(
  "/",
  rbacGuard([Permissions.USER_GETALL]),
  userController.getAllUsers,
);

userRouter.get(
  "/bookmarks/all",
  rbacGuard([Permissions.USER_GETALL_BOOKMARK]),
  userController.getAllUsersBookmarks,
);

userRouter.get(
  "/likes/all",
  rbacGuard([Permissions.USER_GETALL_LIKE]),
  userController.getAllUsersLikes,
);

userRouter.get(
  "/:id",
  rbacGuard([Permissions.USER_BY_ID]),
  userController.getUserById,
);

userRouter.put(
  "/update/:id",
  rbacGuard([Permissions.USER_BY_UPDATE_ID]),
  upload.single("avatar"),
  validateUpdateUser,
  userController.updateUserById,
);

userRouter.delete(
  "/remove/:id",
  rbacGuard([Permissions.USER_BY_REMOVE_ID]),
  userController.removeUserById,
);

userRouter.patch(
  "/change-role/:id",
  rbacGuard([Permissions.USER_CHANGE]),
  validateChangeUserRole,
  userController.changeRole,
);

userRouter.post(
  "/admin/create",
  upload.single("avatar"),
  rbacGuard([Permissions.USER_CREATE]),
  validateCreateUser,
  userController.createUser,
);

userRouter.patch(
  "/ban/:id",
  rbacGuard([Permissions.USER_BAN]),
  validateBanUser,
  userController.banUser,
);

export default userRouter;
