import { Router } from "express";
import authController from "./auth.controller";
import { authGuard } from "../../middleware/guard/auth.guard";

const authRouter: Router = Router();

authRouter.post("/send-otp", authController.sendOTP);
authRouter.post("/verify-otp", authController.verifyOTP);
authRouter.post("/refresh-token", authController.refreshToken);
authRouter.get("/me", authGuard, authController.getMe);
authRouter.post("/logout", authController.logout);

export default authRouter;
