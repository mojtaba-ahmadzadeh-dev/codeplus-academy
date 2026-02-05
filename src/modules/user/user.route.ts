import { Router } from "express";
import userController from "./user.controller";
import { upload } from "../../middleware/upload.middleware";
import { rbacGuard } from "../../middleware/guard/rbac.guard";
import { Permissions } from "../../constant/role.constant";

const userRouter: Router = Router();

userRouter.get("/",  rbacGuard([Permissions.USER_GETALL]), userController.getAllUsers);
userRouter.get("/:id", rbacGuard([Permissions.USER_BY_ID]), userController.getUserById);
userRouter.put("/update/:id", rbacGuard([Permissions.USER_BY_UPDATE_ID]), upload.single("avatar"), userController.updateUserById);
userRouter.delete("/remove/:id", rbacGuard([Permissions.USER_BY_REMOVE_ID]), userController.removeUserById);
userRouter.patch("/change-role/:id", rbacGuard([Permissions.USER_CHANGE]), userController.changeRole);

export default userRouter;
