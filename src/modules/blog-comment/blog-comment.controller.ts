import { Request, Response, NextFunction } from "express";
import blogCommentService from "./blog-comment.service";
import { blogCommentMessages } from "../../constant/messages";

class BlogCommentController {
  private blogCommentService: typeof blogCommentService;
  constructor() {
    this.blogCommentService = blogCommentService;

    this.createComment = this.createComment.bind(this);
    this.getComments = this.getComments.bind(this);
    this.getAllComments = this.getAllComments.bind(this);
    this.acceptComment = this.acceptComment.bind(this);
    this.rejectComment = this.rejectComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  async createComment(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      const { blogId, content } = req.body;

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const comment = await this.blogCommentService.createComment(
        userId,
        blogId,
        content,
      );

      return res.status(201).json({
        message: blogCommentMessages.BLOG_COMMENT_CREATE_SUCCESSFULLY,
        data: comment,
      });
    } catch (error) {
      next(error);
    }
  }

  async getComments(req: Request, res: Response, next: NextFunction) {
    try {
      const { blogId } = req.params;

      const comments = await this.blogCommentService.getCommentsByBlogId(
        Number(blogId),
      );

      return res.status(200).json({
        message: "Comments fetched successfully",
        data: comments,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllComments(req: Request, res: Response, next: NextFunction) {
    try {
      const comments = await this.blogCommentService.getAllComments();

      return res.status(200).json({
        message: "Comments fetched successfully",
        data: comments,
      });
    } catch (error) {
      next(error);
    }
  }

  async acceptComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const comment = await this.blogCommentService.acceptComment(Number(id));

      return res.status(200).json({
        message: "Comment accepted successfully",
        data: comment,
      });
    } catch (error) {
      next(error);
    }
  }

  async rejectComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const comment = await this.blogCommentService.rejectComment(Number(id));

      return res.status(200).json({
        message: "Comment rejected successfully",
        data: comment,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async deleteComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await this.blogCommentService.deleteComment(Number(id));

      return res.status(200).json({
        message: "Comment deleted successfully",
      });
    } catch (error: any) {
      if (error.message === "COMMENT_NOT_FOUND") {
        return res.status(404).json({ message: "Comment not found" });
      }

      next(error);
    }
  }
}

export default new BlogCommentController();
