import { Router } from "express";
import courseController from "./course.controller";
import { rbacGuard } from "../../middleware/guard/rbac.guard";
import { Permissions } from "../../constant/role.constant";
import { validateCourseIdParam, validateCreateCourse, validateUpdateCourse } from "./course.validation";

const courseRouter: Router = Router();

courseRouter.post(
  "/create",
  rbacGuard([Permissions.COURSE_CREATE]),
  validateCreateCourse,
  courseController.createCourse,
);
courseRouter.get(
  "/",
  rbacGuard([Permissions.COURSE_GETALL]),
  courseController.getAllCourses,
);
courseRouter.get(
  "/:id",
  rbacGuard([Permissions.COURSE_GET_BY_ID]),
  courseController.getCourseById,
);

courseRouter.put(
  "/update/:id",
  rbacGuard([Permissions.COURSE_UPDATE_BY_ID]),
  validateUpdateCourse,
  courseController.updateCourse,
);

courseRouter.delete(
  "/delete/:id",
  rbacGuard([Permissions.COURSE_DELETE_BY_ID]),
  validateCourseIdParam,
  courseController.deleteCourse,
);

export default courseRouter;
