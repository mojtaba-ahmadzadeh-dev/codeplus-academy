import { Router } from "express";
import blogCommentController from "./blog-comment.controller";
import { rbacGuard } from "../../middleware/guard/rbac.guard";
import { Permissions } from "../../constant/role.constant";

const blogCommentRouter = Router();

blogCommentRouter.post(
  "/",
  rbacGuard([Permissions.BLOG_COMMENT_CREATE]),
  blogCommentController.createComment,
);

blogCommentRouter.get(
  "/:blogId",
  rbacGuard([Permissions.BLOG_COMMENT_CREATE]), // اگر نیاز به دسترسی داره
  blogCommentController.getComments,
);

blogCommentRouter.get(
  "/",
  rbacGuard([Permissions.BLOG_COMMENT_CREATE]),
  blogCommentController.getAllComments,
);

blogCommentRouter.patch(
  "/:id/accept",
  rbacGuard([Permissions.BLOG_COMMENT_CREATE]),
  blogCommentController.acceptComment,
);

blogCommentRouter.patch(
  "/:id/reject",
  rbacGuard([Permissions.BLOG_COMMENT_CREATE]),
  blogCommentController.rejectComment,
);

blogCommentRouter.delete(
  "/:id",
  rbacGuard([Permissions.BLOG_COMMENT_CREATE]),
  blogCommentController.deleteComment,
);

export default blogCommentRouter;
