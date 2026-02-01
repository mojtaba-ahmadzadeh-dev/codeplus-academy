import { Router } from "express";
import authRouter from "../module/auth/auth.routes";

const AllRoutes: Router = Router();

AllRoutes.use(`/auth`, authRouter);

export { AllRoutes };
