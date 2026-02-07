import { Router } from "express";
import courseController from "./course.controller";
import { rbacGuard } from "../../middleware/guard/rbac.guard";
import { Permissions } from "../../constant/role.constant";

const courseRouter: Router = Router();

courseRouter.post('/create', rbacGuard([Permissions.CREATE_COURSE]), courseController.createCourse)
courseRouter.get(
  "/",
  rbacGuard([Permissions.CATEGORY_GETALL]), 
  courseController.getAllCourses
);
courseRouter.get(
  "/:id", 
  rbacGuard([Permissions.CATEGORY_GETALL]), 
  courseController.getCourseById
);

courseRouter.put(
  "/:id",
  rbacGuard([Permissions.UPDATE_COURSE]), // مجوز مناسب
  courseController.updateCourse
);

export default courseRouter