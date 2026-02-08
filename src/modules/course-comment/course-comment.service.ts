import { CourseComment } from "./course-comment.model";
import { CourseCommentCreationAttributes } from "./types/index.types";

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
}

export default new CourseCommentService();
