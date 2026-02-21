import { STATUS } from "../../constant/status.constant";
import { BlogComment } from "./blog-comment.model";

class BlogCommentService {
  private blogCommentModel: typeof BlogComment;
  constructor() {
    this.blogCommentModel = BlogComment;
  }

  async createComment(userId: number, blogId: number, content: string) {
    const comment = await this.blogCommentModel.create({
      userId,
      blogId,
      content,
      status: STATUS.ACTIVE,
    });
    return comment;
  }
}

export default new BlogCommentService();
