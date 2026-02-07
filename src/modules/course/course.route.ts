import { Router } from "express";
import courseController from "./course.controller";
import { rbacGuard } from "../../middleware/guard/rbac.guard";
import { Permissions } from "../../constant/role.constant";

const courseRouter: Router = Router();

courseRouter.post('/create', rbacGuard([Permissions.CREATE_COURSE]), courseController.createCourse)

export default courseRouter