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

  async getCommentsByBlogId(blogId: number) {
    return await this.blogCommentModel.findAll({
      where: { blogId, status: STATUS.ACTIVE },
      order: [["createdAt", "DESC"]],
    });
  }
}

export default new BlogCommentService();
