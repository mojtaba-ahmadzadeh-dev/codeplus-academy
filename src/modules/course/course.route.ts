import { Router } from "express";
import courseController from "./course.controller";
import { rbacGuard } from "../../middleware/guard/rbac.guard";
import { Permissions } from "../../constant/role.constant";
import { validateCourseIdParam, validateCreateCourse, validateUpdateCourse } from "./course.validation";

const courseRouter: Router = Router();

courseRouter.post(
  "/create",
  rbacGuard([Permissions.CREATE_COURSE]),
  validateCreateCourse,
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
  validateUpdateCourse,
  courseController.updateCourse,
);

courseRouter.delete(
  "/delete/:id",
  rbacGuard([Permissions.DELETE_COURSE]),
  validateCourseIdParam,
  courseController.deleteCourse,
);

export default courseRouter;
