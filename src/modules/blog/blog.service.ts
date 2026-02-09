import createHttpError from "http-errors";
import { BlogMessages } from "../../constant/messages";
import { Blog } from "./blog.model";
import { BlogCreationAttributes } from "./types/index.types";
import { Op, fn, col, where } from "sequelize";
import { STATUS } from "../../constant/status.constant";

class BlogService {
  private blogModel: typeof Blog;

  constructor() {
    this.blogModel = Blog;
  }

  async createBlog(data: BlogCreationAttributes): Promise<Blog> {
    try {
      const blog = await this.blogModel.create(data);
      return blog;
    } catch (error) {
      console.error("Error creating blog:", error);
      throw error;
    }
  }

  async getAllBlogs(
    search?: string,
    offset: number = 0,
    limit: number = 10,
    sort: "newest" | "oldest" = "newest",
  ): Promise<{ rows: Blog[]; count: number }> {
    try {
      const whereClause = search
        ? {
            [Op.or]: ["title", "content"].map((field) =>
              where(fn("LOWER", col(field)), {
                [Op.like]: `%${search.toLowerCase()}%`,
              }),
            ),
          }
        : {};

      return this.blogModel.findAndCountAll({
        where: whereClause,
        order: [["createdAt", sort === "newest" ? "DESC" : "ASC"]],
        limit,
        offset,
      });
    } catch (error) {
      console.error("Error fetching blogs:", error);
      throw error;
    }
  }

  async getBlogById(id: number): Promise<Blog | null> {
    try {
      return await this.blogModel.findOne({
        where: { id },
      });
    } catch (error) {
      console.error("Error fetching blog by id:", error);
      throw error;
    }
  }

  async createBlogByAdmin(data: BlogCreationAttributes): Promise<Blog> {
    const { title, content, authorId } = data;

    if (!title || !content || !authorId) {
      throw new Error("Title, content and authorId are required.");
    }

    return this.blogModel.create({
      ...data,
      status: data.status ?? "published",
    });
  }

  async updateBlog(
    id: number,
    data: {
      title?: string;
      content?: string;
      status?: (typeof STATUS)[keyof typeof STATUS];
      categoryId?: number | null;
      userId: number;
    },
  ): Promise<Blog> {
    const blog = await this.blogModel.findByPk(id);

    if (!blog) {
      throw createHttpError(BlogMessages.BLOG_NOT_FOUND);
    }

    if (blog.authorId !== data.userId) {
      throw createHttpError.Forbidden(BlogMessages.BLOG_UPDATE_FORBIDDEN);
    }

    await blog.update({
      title: data.title ?? blog.title,
      content: data.content ?? blog.content,
      status: data.status ?? blog.status,
      categoryId:
        data.categoryId !== undefined ? data.categoryId : blog.categoryId,
    });

    return blog;
  }
}

export default new BlogService();
