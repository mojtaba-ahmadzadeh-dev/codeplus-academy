import { Router } from "express";
import userController from "./user.controller";
import { upload } from "../../middleware/upload.middleware";

const userRouter: Router = Router();

userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.put("/update/:id", upload.single("avatar"), userController.updateUserById);
userRouter.delete("/remove/:id", userController.removeUserById);
userRouter.patch("/change-role/:id", userController.changeRole);
userRouter.post("/admin/create",upload.single("avatar"),userController.createUser);
userRouter.patch("/ban/:id", userController.banUser);

export default userRouter;
