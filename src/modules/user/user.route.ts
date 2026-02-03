import { Router } from "express";
import userController from "./user.controller";
import { upload } from "../../middleware/upload.middleware";

const userRouter: Router = Router();

userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getAllUsers);
userRouter.put("/:id", upload.single("avatar"), userController.updateUserById);
userRouter.delete("/:id", userController.removeUserById);

export default userRouter;
