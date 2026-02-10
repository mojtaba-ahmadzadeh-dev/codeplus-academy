import createHttpError from "http-errors";
import { BlogMessages } from "../../constant/messages";
import { Blog } from "./blog.model";
import { BlogCreationAttributes } from "./types/index.types";
import { Op, fn, col, where } from "sequelize";
import { STATUS } from "../../constant/status.constant";
import { User } from "../user/user.model";
import { Category } from "../category/category.model";

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
        attributes: {
          exclude: ["authorId", "categoryId"],
        },
        include: [
          {
            model: User,
            as: "author",
            attributes: [
              "id",
              "full_name",
              "mobile",
              "avatar",
              "is_banned",
              "role",
            ],
          },
        ],
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
        attributes: {
          exclude: ["authorId", "categoryId"],
        },
        include: [
          {
            model: User,
            as: "author",
            attributes: [
              "id",
              "full_name",
              "mobile",
              "avatar",
              "is_banned",
              "role",
            ],
          },
        ],
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

  async deleteBlog(id: number, userId: number): Promise<void> {
    const blog = await this.blogModel.findByPk(id);

    if (!blog) {
      throw createHttpError(BlogMessages.BLOG_NOT_FOUND);
    }

    // فقط نویسنده بلاگ اجازه حذف دارد
    if (blog.authorId !== userId) {
      throw createHttpError.Forbidden(BlogMessages.BLOG_DELETE_FORBIDDEN);
    }

    await blog.destroy();
  }

  async likeOrDislike(
    blogId: number,
    userId: number,
    isLike: boolean,
  ): Promise<{ likes: number; dislikes: number; message: string }> {
    const blog = await this.blogModel.findByPk(blogId);

    if (!blog) throw createHttpError.NotFound(BlogMessages.BLOG_NOT_FOUND);

    const reactions = (blog as any).userReactions || {};
    const previous = reactions[userId];

    if (previous === isLike) {
      if (isLike) blog.likes--;
      else blog.dislikes--;
      delete reactions[userId];
    } else {
      if (previous === true) blog.likes--;
      if (previous === false) blog.dislikes--;

      if (isLike) blog.likes++;
      else blog.dislikes++;

      reactions[userId] = isLike;
    }

    (blog as any).userReactions = reactions;
    await blog.save();

    return {
      likes: blog.likes,
      dislikes: blog.dislikes,
      message: "Reaction updated",
    };
  }

  async toggleBookmark(blogId: number): Promise<{
    isBookmarked: boolean;
    bookmarkCount: number;
  }> {
    const blog = await this.blogModel.findByPk(blogId);

    if (!blog) {
      throw createHttpError.NotFound(BlogMessages.BLOG_NOT_FOUND);
    }

    if (blog.bookmarks) {
      throw createHttpError.BadRequest(BlogMessages.BLOG_ALREADY_BOOKMARKED);
    }

    blog.bookmarks = true;
    await blog.save();

    return {
      isBookmarked: true,
      bookmarkCount: 1,
    };
  }

  async getBlogsByAuthor(
    authorId: number,
    offset: number = 0,
    limit: number = 10,
  ): Promise<{ rows: Blog[]; count: number }> {
    return this.blogModel.findAndCountAll({
      where: { authorId },
      order: [["createdAt", "DESC"]],
      limit,
      offset,
      attributes: {
        exclude: ["authorId", "categoryId"],
      },
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "full_name", "avatar"],
        },
        {
          model: Category,
          as: "category",
          attributes: ["id", "title"],
        },
      ],
    });
  }
}

export default new BlogService();
