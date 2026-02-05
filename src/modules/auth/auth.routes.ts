import { Router } from "express";
import authController from "./auth.controller";
import { rbacGuard } from "../../middleware/guard/rbac.guard";

const authRouter: Router = Router();

authRouter.post("/send-otp", authController.sendOTP);
authRouter.post("/verify-otp", authController.verifyOTP);
authRouter.post("/refresh-token", authController.refreshToken);
authRouter.get("/me", authController.getMe);
authRouter.post("/logout", authController.logout);

export default authRouter;
