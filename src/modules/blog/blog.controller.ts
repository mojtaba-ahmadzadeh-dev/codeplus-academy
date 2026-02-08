import { NextFunction, Request, Response } from "express";
import blogService from "./blog.service";
import { StatusCodes } from "http-status-codes";
import { BlogMessages } from "../../constant/messages";
import { getPagination } from "../../utils/pagination";

class BlogController {
  private blogService: typeof blogService;

  constructor() {
    this.blogService = blogService;

    this.createBlog = this.createBlog.bind(this);
    this.getAllBlogs = this.getAllBlogs.bind(this);
    this.getBlogById = this.getBlogById.bind(this);
    this.createBlogByAdmin = this.createBlogByAdmin.bind(this);
  }

  async createBlog(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, content, status, categoryId } = req.body;
      const authorId = req.user?.id;

      if (!title || !content || !authorId) {
        return res
          .status(400)
          .json({ message: "Title, content and authorId are required." });
      }

      const newBlog = await this.blogService.createBlog({
        title,
        content,
        status,
        authorId,
        categoryId: categoryId || null,
      });

      return res.status(StatusCodes.CREATED).json({
        message: BlogMessages.BLOG_CREATE_SUCCESSFULLY,
        newBlog,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async getAllBlogs(req: Request, res: Response, next: NextFunction) {
    try {
      const search =
        typeof req.query.search === "string" ? req.query.search : "";
      const pageParam =
        typeof req.query.page === "string" ? req.query.page : undefined;
      const limitParam =
        typeof req.query.limit === "string" ? req.query.limit : undefined;
      const sort = req.query.sort === "oldest" ? "oldest" : "newest";
      const { count } = await this.blogService.getAllBlogs(
        search,
        0,
        1000000,
        sort,
      );

      const { page, limit, totalPages, offset } = getPagination({
        page: pageParam,
        limit: limitParam,
        totalItems: count,
      });

      const { rows } = await this.blogService.getAllBlogs(
        search,
        offset,
        limit,
        sort,
      );

      let message: string = BlogMessages.BLOG_FETCHED_SUCCESSFULLY;
      if (rows.length === 0) {
        message = search
          ? BlogMessages.BLOG_NOT_FOUND_SEARCH.replace("{search}", search)
          : BlogMessages.BLOG_NOT_FOUND;
      }

      return res.status(StatusCodes.OK).json({
        message,
        total: count,
        totalPages,
        page,
        limit,
        sort,
        blogs: rows,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async getBlogById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Blog id must be a number" });
      }

      const blog = await this.blogService.getBlogById(id);

      if (!blog) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: BlogMessages.BLOG_NOT_FOUND });
      }

      return res.status(StatusCodes.OK).json({
        message: BlogMessages.BLOG_SINGLE_FETCHED_SUCCESSFULLY,
        blog,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async createBlogByAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, content, status, categoryId } = req.body;
      const authorId = req.user?.id;

      if (!title || !content || !authorId) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Title, content and authorId are required.",
        });
      }

      const blog = await this.blogService.createBlogByAdmin({
        title,
        content,
        status,
        authorId,
        categoryId: categoryId || null,
      });

      return res.status(StatusCodes.CREATED).json({
        message: BlogMessages.BLOG_CREATE_SUCCESSFULLY,
        blog,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new BlogController();
