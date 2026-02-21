import { Router } from "express";
import courseCommentController from "./course-comment.controller";
import { rbacGuard } from "../../middleware/guard/rbac.guard";
import { Permissions } from "../../constant/role.constant";
import {
  validateCommentId,
  validateCreateComment,
} from "./course-comment.validation";

const courseCommentRouter = Router();

courseCommentRouter.post(
  "/create",
  rbacGuard([Permissions.COURSE_COMMENT_CREATE]),
  validateCreateComment,
  courseCommentController.createComment,
);
courseCommentRouter.get(
  "/",
  courseCommentController.getAllComments,
);
courseCommentRouter.get(
  "/:id",
  rbacGuard([Permissions.COURSE_COMMENT_BY_ID]),
  validateCommentId,
  courseCommentController.getCommentById,
);
courseCommentRouter.patch(
  "/:id/accept",
  rbacGuard([Permissions.COURSE_COMMENT_UPDATE]),
  validateCommentId,
  courseCommentController.acceptComment,
);
courseCommentRouter.patch(
  "/:id/reject",
  rbacGuard([Permissions.COURSE_COMMENT_CREATE]),
  validateCommentId,
  courseCommentController.rejectComment,
);

courseCommentRouter.delete(
  "/delete/:id",
  rbacGuard([Permissions.COURSE_COMMENT_DELETE]),
  validateCommentId,
  courseCommentController.deleteComment,
);

export default courseCommentRouter;
