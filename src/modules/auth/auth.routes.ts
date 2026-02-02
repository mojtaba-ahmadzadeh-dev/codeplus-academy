import { Router } from "express";
import authController from "./auth.controller";

const authRouter: Router = Router();

authRouter.post("/send-otp", authController.sendOTP);
authRouter.post("/check-otp", authController.checkOTP);
authRouter.post("/refresh-token", authController.refreshToken);

export default authRouter;
