import { Router } from "express";
import blogController from "./blog.controller";
import { rbacGuard } from "../../middleware/guard/rbac.guard";
import { Permissions } from "../../constant/role.constant";
import {
  validateCreateBlog,
  validateUpdateBlog,
  validateGetAllBlogs,
  validateGetBlogById,
  validateToggleBookmark,
  validateLike,
} from "./blog.validation";

const blogRouter = Router();

blogRouter.post(
  "/create",
  rbacGuard([Permissions.BLOG_CREATE]),
  validateCreateBlog,
  blogController.createBlog,
);

blogRouter.get(
  "/me",
  rbacGuard([Permissions.BLOG_READ]),
  blogController.getUserBlogs,
);

blogRouter.get(
  "/",
  validateGetAllBlogs,
  blogController.getAllBlogs,
);

blogRouter.get(
  "/:id",
  rbacGuard([Permissions.BLOG__BY_ID]),
  validateGetBlogById,
  blogController.getBlogById,
);

blogRouter.put(
  "/update/:id",
  rbacGuard([Permissions.BLOG_UPDATE]),
  validateUpdateBlog,
  blogController.updateBlog,
);

blogRouter.delete(
  "/:id",
  rbacGuard([Permissions.BLOG_DELETE]),
  validateGetBlogById,
  blogController.deleteBlog,
);

blogRouter.put(
  "/:id/like",
  rbacGuard([Permissions.BLOG_LIKE]),
  validateLike,
  blogController.likeOrDislike,
);

blogRouter.put(
  "/:id/bookmark",
  rbacGuard([Permissions.BLOG_BOOKMARK]),
  validateToggleBookmark,
  blogController.toggleBookmark,
);

export default blogRouter;