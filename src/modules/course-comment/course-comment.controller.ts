import { NextFunction, Response, Request } from "express";
import courseCommentService from "./course-comment.service";
import { CourseCommentCreationAttributes } from "./types/index.types";
import { StatusCodes } from "http-status-codes";
import { CourseCommentMessages } from "../../constant/messages";
import createHttpError from "http-errors";

class CourseCommentController {
  private courseCommentService: typeof courseCommentService;
  constructor() {
    this.courseCommentService = courseCommentService;

    this.createComment = this.createComment.bind(this);
    this.getAllComments = this.getAllComments.bind(this);
    this.getCommentById = this.getCommentById.bind(this);
    this.acceptComment = this.acceptComment.bind(this);
    this.rejectComment = this.rejectComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  async createComment(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) throw createHttpError.Unauthorized("کاربر وارد نشده است");

      const data: CourseCommentCreationAttributes = {
        ...req.body,
        courseId: Number(req.body.courseId),
        userId, 
        status: req.body.status || "active", 
      };

      const comment = await this.courseCommentService.createComment(data);

      res.status(StatusCodes.CREATED).json({
        message: CourseCommentMessages.COURSE_COMMENT_CREATE_SUCCESSFULLY,
        comment,
      });
    } catch (err) {
      next(err);
    }
  }

  async getAllComments(req: Request, res: Response, next: NextFunction) {
    try {
      const comments = await this.courseCommentService.getAllComments();

      res.status(StatusCodes.OK).json({
        message: CourseCommentMessages.COURSE_COMMENT_FETCHED_SUCCESSFULLY,
        comments,
      });
    } catch (err) {
      next(err);
    }
  }

  async getCommentById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      const comment = await this.courseCommentService.getCommentById(id);

      res.status(StatusCodes.OK).json({
        message:
          CourseCommentMessages.COURSE_COMMENT_FETCHED_SINGLE_SUCCESSFULLY,
        comment,
      });
    } catch (err) {
      next(err);
    }
  }

  async acceptComment(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      const comment = await this.courseCommentService.acceptComment(id);

      res.status(StatusCodes.OK).json({
        message: CourseCommentMessages.COURSE_COMMENT_ACCEPTED_SUCCESSFULLY,
        comment,
      });
    } catch (err) {
      next(err);
    }
  }

  async rejectComment(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      const comment = await this.courseCommentService.rejectComment(id);

      res.status(StatusCodes.OK).json({
        message: CourseCommentMessages.COURSE_COMMENT_REJECTED_SUCCESSFULLY,
        comment,
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteComment(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      await this.courseCommentService.deleteComment(id);

      res.status(StatusCodes.OK).json({
        message: CourseCommentMessages.COURSE_COMMENT_DELETED_SUCCESSFULLY,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new CourseCommentController();
