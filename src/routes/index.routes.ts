import { Router } from "express";
import authRouter from "../modules/auth/auth.routes";
import userRouter from "../modules/user/user.route";
import RBACRouter from "../modules/RBAC/rbac.route";
import categoryRouter from "../modules/category/category.route";

const AllRoutes: Router = Router();

AllRoutes.use(`/auth`, authRouter);
AllRoutes.use(`/users`, userRouter);
AllRoutes.use(`/rbac`, RBACRouter);
AllRoutes.use(`/categories`, categoryRouter);

export { AllRoutes };
