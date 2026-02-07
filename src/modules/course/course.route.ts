import { Router } from "express";
import courseController from "./course.controller";
import { rbacGuard } from "../../middleware/guard/rbac.guard";
import { Permissions } from "../../constant/role.constant";

const courseRouter: Router = Router();

courseRouter.post(
  "/create",
  rbacGuard([Permissions.CREATE_COURSE]),
  courseController.createCourse,
);
courseRouter.get(
  "/",
  rbacGuard([Permissions.CATEGORY_GETALL]),
  courseController.getAllCourses,
);
courseRouter.get(
  "/:id",
  rbacGuard([Permissions.CATEGORY_GETALL]),
  courseController.getCourseById,
);

courseRouter.put(
  "/update/:id",
  rbacGuard([Permissions.UPDATE_COURSE]),
  courseController.updateCourse,
);

courseRouter.delete(
  "/delete/:id",
  rbacGuard([Permissions.DELETE_COURSE]),
  courseController.deleteCourse,
);

export default courseRouter;
