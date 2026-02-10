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
    this.updateBlog = this.updateBlog.bind(this);
    this.deleteBlog = this.deleteBlog.bind(this);
    this.likeOrDislike = this.likeOrDislike.bind(this);
    this.toggleBookmark = this.toggleBookmark.bind(this);
    this.getMyBlogs = this.getMyBlogs.bind(this);
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
        likes: 0,
        dislikes: 0,
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
        likes: 0,
        dislikes: 0,
      });

      return res.status(StatusCodes.CREATED).json({
        message: BlogMessages.BLOG_CREATE_SUCCESSFULLY,
        blog,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateBlog(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const { title, content, status, categoryId } = req.body;
      const userId = req.user?.id;

      if (isNaN(id)) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Blog id must be a number" });
      }

      if (!userId) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "Unauthorized" });
      }

      const updatedBlog = await this.blogService.updateBlog(id, {
        title,
        content,
        status,
        categoryId,
        userId,
      });

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
      const id = Number(req.params.id);
      const userId = req.user?.id;

      if (isNaN(id)) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Blog id must be a number" });
      }

      if (!userId) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "Unauthorized" });
      }

      await this.blogService.deleteBlog(id, userId);

      return res.status(StatusCodes.OK).json({
        message: BlogMessages.BLOG_DELETED_SUCCESSFULLY,
      });
    } catch (error) {
      next(error);
    }
  }

  async likeOrDislike(req: Request, res: Response, next: NextFunction) {
    try {
      const blogId = Number(req.params.id);
      const userId = req.user?.id;
      const { isLike } = req.body;

      if (!userId) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "Unauthorized" });
      }

      const result = await this.blogService.likeOrDislike(
        blogId,
        userId,
        isLike,
      );

      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async toggleBookmark(req: Request, res: Response, next: NextFunction) {
    try {
      const blogId = Number(req.params.id);

      if (isNaN(blogId)) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Blog id must be a number" });
      }

      const result = await this.blogService.toggleBookmark(blogId);

      return res.status(StatusCodes.OK).json({
        message: "Bookmark updated successfully",
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getMyBlogs(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "Unauthorized" });
      }

      const pageParam =
        typeof req.query.page === "string" ? req.query.page : undefined;
      const limitParam =
        typeof req.query.limit === "string" ? req.query.limit : undefined;

      const { count } = await this.blogService.getBlogsByAuthor(
        userId,
        0,
        1000000,
      );

      const { page, limit, totalPages, offset } = getPagination({
        page: pageParam,
        limit: limitParam,
        totalItems: count,
      });

      const { rows } = await this.blogService.getBlogsByAuthor(
        userId,
        offset,
        limit,
      );

      return res.status(StatusCodes.OK).json({
        message: BlogMessages.BLOG_FETCHED_SUCCESSFULLY,
        total: count,
        totalPages,
        page,
        limit,
        blogs: rows,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new BlogController();
