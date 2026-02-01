import { Router } from "express";
import authController from "./auth.controller";

const authRouter: Router = Router();

authRouter.post("/send-otp", authController.sendOTP);

export default authRouter;
