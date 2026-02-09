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
blogRouter.get("/", blogController.getAllBlogs);
blogRouter.get("/:id", blogController.getBlogById);
blogRouter.post(
  "/admin/create",
  rbacGuard([Permissions.BLOG_CREATE_ADMIN]),
  blogController.createBlogByAdmin,
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

export default blogRouter;
