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

export default blogCommentRouter;
