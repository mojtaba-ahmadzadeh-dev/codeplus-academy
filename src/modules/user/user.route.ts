import { Router } from "express";
import userController from "./user.controller";


const userRouter: Router = Router();

userRouter.get('/', userController.getAllUsers)
userRouter.get('/:id', userController.getAllUsers)

export default userRouter;
