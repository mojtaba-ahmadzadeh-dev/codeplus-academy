import { Router } from "express";
import blogController from "./blog.controller";
import { rbacGuard } from "../../middleware/guard/rbac.guard";
import { Permissions } from "../../constant/role.constant";

const blogRouter = Router();

blogRouter.post(
  "/create",
  rbacGuard([Permissions.BLOG_CREATE]),
  blogController.createBlog,
);

blogRouter.get(
  "/bookmarks",
  rbacGuard([Permissions.BLOG_GETALL]),
  blogController.getUserBookmarkedBlogs,
);

blogRouter.get(
  "/me",
  rbacGuard([Permissions.BLOG_READ]),
  blogController.getUserBookmarkedBlogs,
);

blogRouter.get(
  "/",
  rbacGuard([Permissions.BLOG_GETALL]),
  blogController.getAllBlogs,
);

blogRouter.get(
  "/:id",
  rbacGuard([Permissions.BLOG__BY_ID]),
  blogController.getBlogById,
);

blogRouter.put(
  "/update/:id",
  rbacGuard([Permissions.BLOG_UPDATE]),
  blogController.updateBlog,
);

blogRouter.delete(
  "/:id",
  rbacGuard([Permissions.BLOG_DELETE]),
  blogController.deleteBlog,
);

blogRouter.put(
  "/:id/like",
  rbacGuard([Permissions.BLOG_LIKE]),
  blogController.likeOrDislike,
);

blogRouter.put(
  "/:id/bookmark",
  rbacGuard([Permissions.BLOG_BOOKMARK]),
  blogController.toggleBookmark,
);
export default blogRouter;
