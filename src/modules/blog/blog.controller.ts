import { NextFunction, Request, Response } from "express";
import blogService from "./blog.service";
import { StatusCodes } from "http-status-codes";
import { BlogMessages } from "../../constant/messages";

class BlogController {
  private blogService: typeof blogService;

  constructor() {
    this.blogService = blogService;

    this.createBlog = this.createBlog.bind(this);
    this.getAllBlogs = this.getAllBlogs.bind(this);
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
      const blogs = await this.blogService.getAllBlogs();
      return res.status(StatusCodes.OK).json({
        message: BlogMessages.BLOG_FETCHED_SUCCESSFULLY,
        blogs,
      });
    } catch (error: any) {
      next(error);
    }
  }
}

export default new BlogController();
