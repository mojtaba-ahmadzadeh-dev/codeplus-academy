import { Router } from "express";
import userController from "./user.controller";
import { upload } from "../../middleware/upload.middleware";

const userRouter: Router = Router();

userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.put("/update/:id", upload.single("avatar"), userController.updateUserById);
userRouter.delete("/remove/:id", userController.removeUserById);
userRouter.patch("/change-role/:id", userController.changeRole);

export default userRouter;
