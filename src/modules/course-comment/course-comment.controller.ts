import { NextFunction, Response, Request } from "express";
import courseCommentService from "./course-comment.service";
import { CourseCommentCreationAttributes } from "./types/index.types";
import { StatusCodes } from "http-status-codes";
import { CourseCommentMessages } from "../../constant/messages";

class CourseCommentController {
  private courseCommentService: typeof courseCommentService;
  constructor() {
    this.courseCommentService = courseCommentService;

    this.createComment = this.createComment.bind(this)
    this.getAllComments = this.getAllComments.bind(this)
  }

  async createComment(req: Request, res: Response, next: NextFunction) {
    try {
      const data: CourseCommentCreationAttributes = {
        content: req.body.content,
        courseId: Number(req.body.courseId),
        userId: Number(req.body.userId),
        status: req.body.status || "active",
      };

      const comment = await this.courseCommentService.createComment(data);
      res.status(StatusCodes.CREATED).json({
        message: CourseCommentMessages.COURSE_COMMENT_CREATE_SUCCESSFYLLY,
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
}

export default new CourseCommentController();
