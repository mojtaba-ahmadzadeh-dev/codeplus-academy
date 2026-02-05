import { Router } from "express";
import userController from "./user.controller";
import { upload } from "../../middleware/upload.middleware";
import { rbacGuard } from "../../middleware/guard/rbac.guard";
import { Roles } from "../../constant/role_rbac.constant";

const userRouter: Router = Router();

userRouter.get("/",  rbacGuard([Roles.ADMIN, Roles.TEACHER]), userController.getAllUsers);
userRouter.get("/:id", rbacGuard([Roles.ADMIN, Roles.TEACHER, Roles.USER]) , userController.getUserById);
userRouter.put("/update/:id",  rbacGuard([Roles.ADMIN, Roles.TEACHER]), upload.single("avatar"), userController.updateUserById);
userRouter.delete("/remove/:id", rbacGuard([Roles.ADMIN]), userController.removeUserById);
userRouter.patch("/change-role/:id", rbacGuard([Roles.ADMIN]), userController.changeRole);

export default userRouter;
