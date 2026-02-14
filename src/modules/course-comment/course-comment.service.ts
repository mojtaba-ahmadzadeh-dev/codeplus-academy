import createHttpError from "http-errors";
import { CourseComment } from "./course-comment.model";
import { CourseCommentCreationAttributes } from "./types/index.types";
import { CourseCommentMessages } from "../../constant/messages";
import { STATUS } from "../../constant/status.constant";

class CourseCommentService {
  private courseComment: typeof CourseComment;

  constructor() {
    this.courseComment = CourseComment;
  }

  async createComment(
    data: CourseCommentCreationAttributes,
  ): Promise<CourseComment> {
    const comment = await this.courseComment.create(data);
    return comment;
  }

  async getAllComments(): Promise<CourseComment[]> {
    return this.courseComment.findAll({
      order: [["createdAt", "DESC"]],
    });
  }

  async getCommentById(id: number): Promise<CourseComment> {
    const comment = await this.courseComment.findOne({
      where: { id },
    });

    if (!comment) {
      throw new createHttpError.NotFound(
        CourseCommentMessages.COURSE_COMMENT_NOT_FOUND,
      );
    }

    return comment;
  }

  async acceptComment(id: number): Promise<CourseComment> {
    const comment = await this.courseComment.findByPk(id);

    if (!comment) {
      throw new createHttpError.NotFound(
        CourseCommentMessages.COURSE_COMMENT_NOT_FOUND,
      );
    }

    comment.status = STATUS.ACCEPTED;
    await comment.save();

    return comment;
  }

  async rejectComment(id: number): Promise<CourseComment> {
    const comment = await this.courseComment.findByPk(id);

    if (!comment) {
      throw new createHttpError.NotFound(
        CourseCommentMessages.COURSE_COMMENT_NOT_FOUND,
      );
    }

    comment.status = STATUS.INACTIVE; 
    await comment.save();

    return comment;
  }

  async deleteComment(id: number): Promise<void> {
    const comment = await this.courseComment.findByPk(id);

    if (!comment) {
      throw new createHttpError.NotFound(
        CourseCommentMessages.COURSE_COMMENT_NOT_FOUND,
      );
    }

    await comment.destroy(); // حذف از دیتابیس
  }
}

export default new CourseCommentService();
