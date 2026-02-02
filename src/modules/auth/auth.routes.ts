import { Router } from "express";
import authController from "./auth.controller";

const authRouter: Router = Router();

authRouter.post("/send-otp", authController.sendOTP);
authRouter.post("/verify-otp", authController.verifyOTP);
authRouter.post("/refresh-token", authController.refreshToken);
authRouter.get("/me", authController.getMe);

export default authRouter;
