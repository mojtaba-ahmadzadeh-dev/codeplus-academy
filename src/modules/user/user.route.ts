import { Router } from "express";
import userController from "./user.controller";


const userRouter: Router = Router();

userRouter.get('/', userController.getAllUsers)

export default userRouter;
