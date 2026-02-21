import { Router } from "express";
import lessionController from "./lesson.controller";
import { rbacGuard } from "../../middleware/guard/rbac.guard";
import { Permissions } from "../../constant/role.constant";
import {
  validateCreateLesson,
  validateDeleteLesson,
  validateGetLesson,
  validateUpdateLesson,
} from "./lesson.validation";

const lessionRouter = Router();

lessionRouter.post(
  "/create",
  rbacGuard([Permissions.LESSON_CREATE]),
  validateCreateLesson,
  lessionController.createLesson,
);
lessionRouter.get("/", lessionController.getAllLesson);
lessionRouter.get(
  "/:id",
  rbacGuard([Permissions.LESSON_BY_ID]),
  validateGetLesson,
  lessionController.getByIdLesson,
);
lessionRouter.put(
  "/update/:id",
  rbacGuard([Permissions.LESSON_UPDATE]),
  validateUpdateLesson,
  lessionController.updateLesson,
);
lessionRouter.delete(
  "/delete/:id",
  rbacGuard([Permissions.LESSON_DELETE]),
  validateDeleteLesson,
  lessionController.deleteLesson,
);

export default lessionRouter;
