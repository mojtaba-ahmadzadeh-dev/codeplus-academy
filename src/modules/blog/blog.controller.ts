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
    this.getBlogById = this.getBlogById.bind(this);
    this.updateBlog = this.updateBlog.bind(this);
    this.deleteBlog = this.deleteBlog.bind(this);
    this.likeOrDislike = this.likeOrDislike.bind(this);
    this.toggleBookmark = this.toggleBookmark.bind(this);
    this.getUserBlogs = this.getUserBlogs.bind(this);
  }

  async createBlog(req: Request, res: Response, next: NextFunction) {
    try {
      const authorId = req.user?.id;

      const blog = await this.blogService.createBlog({
        ...req.body,
        authorId,
      });

      return res.status(StatusCodes.CREATED).json({
        message: BlogMessages.BLOG_CREATE_SUCCESSFULLY,
        blog,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllBlogs(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.blogService.getAllBlogs({
        search: typeof req.query.search === "string" ? req.query.search : "",
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
        sort: req.query.sort === "oldest" ? "oldest" : "newest",
      });

      const message = data.blogs.length
        ? BlogMessages.BLOG_FETCHED_SUCCESSFULLY
        : BlogMessages.BLOG_NOT_FOUND;

      return res.status(StatusCodes.OK).json({
        message,
        ...data,
      });
    } catch (error) {
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

  async updateBlog(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedBlog = await this.blogService.updateBlog(
        req.params.id,
        req.body,
        req.user?.id,
      );

      return res.status(StatusCodes.OK).json({
        message: BlogMessages.BLOG_UPDATED_SUCCESSFULLY,
        blog: updatedBlog,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteBlog(req: Request, res: Response, next: NextFunction) {
    try {
      await this.blogService.deleteBlog(req.params.id, req.user?.id);

      return res.status(StatusCodes.OK).json({
        message: BlogMessages.BLOG_DELETED_SUCCESSFULLY,
      });
    } catch (error) {
      next(error);
    }
  }

  async likeOrDislike(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.blogService.likeOrDislike(
        Number(req.params.id),
        req.user!.id,
        req.body.isLike,
      );

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async toggleBookmark(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.blogService.toggleBookmark(
        req.user!.id,
        req.params.id, // string به service پاس داده میشه
      );

      return res.status(StatusCodes.OK).json({
        message: "Bookmark updated successfully",
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserBlogs(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await this.blogService.getUserBlogs(
        req.user?.id,
        req.query.page as string,
        req.query.limit as string,
      );

      return res.status(StatusCodes.OK).json({
        message: result.rows.length
          ? "Bookmarked blogs fetched successfully"
          : "No bookmarked blogs found",
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new BlogController();
