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
      status: STATUS.PENDING,
    });
    return comment;
  }

  async getCommentsByBlogId(blogId: number) {
    return await this.blogCommentModel.findAll({
      where: { blogId, status: STATUS.ACTIVE },
      order: [["createdAt", "DESC"]],
    });
  }

  async getAllComments() {
    return await this.blogCommentModel.findAll({
      where: { status: STATUS.ACTIVE },
      order: [["createdAt", "DESC"]],
    });
  }

  async acceptComment(commentId: number) {
    const comment = await this.blogCommentModel.findByPk(commentId);

    if (!comment) {
      throw new Error("Comment not found");
    }

    comment.status = STATUS.ACCEPTED; // یا ACCEPTED (بسته به مدل)
    await comment.save();

    return comment;
  }

  async rejectComment(commentId: number) {
    const comment = await this.blogCommentModel.findByPk(commentId);

    if (!comment) {
      throw new Error("COMMENT_NOT_FOUND");
    }

    comment.status = STATUS.REJECTED;
    await comment.save();

    return comment;
  }

  async deleteComment(commentId: number) {
    const comment = await this.blogCommentModel.findByPk(commentId);

    if (!comment) {
      throw new Error("COMMENT_NOT_FOUND");
    }

    await comment.destroy();
    return true;
  }
}

export default new BlogCommentService();
