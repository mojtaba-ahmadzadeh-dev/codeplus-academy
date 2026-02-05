import { Router } from "express";
import authController from "./auth.controller";
import { rbacGuard } from "../../middleware/guard/rbac.guard";
import { Roles } from "../../constant/role_rbac.constant";

const authRouter: Router = Router();

authRouter.post("/send-otp", authController.sendOTP);
authRouter.post("/verify-otp", authController.verifyOTP);
authRouter.post("/refresh-token", authController.refreshToken);
authRouter.get("/me",  rbacGuard([Roles.ADMIN, Roles.TEACHER, Roles.USER]), authController.getMe);
authRouter.post("/logout", rbacGuard([Roles.ADMIN, Roles.TEACHER, Roles.USER]), authController.logout);

export default authRouter;
