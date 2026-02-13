import createHttpError from "http-errors";
import { BlogMessages } from "../../constant/messages";
import { Blog } from "./entities/blog.model";
import {
  BlogCreationAttributes,
  BlogUpdateAttributes,
  GetAllBlogsParams,
  PaginatedBlogs,
  ReactionResult,
  ToggleBookmarkResult,
} from "./types/index.types";
import { Op, fn, col, where } from "sequelize";
import { User } from "../user/user.model";
import { Bookmark } from "./entities/blog-bookmarks.model";
import { Reaction } from "../blog/entities/blog-likes.model";

class BlogService {
  private blogModel: typeof Blog;

  constructor() {
    this.blogModel = Blog;
  }

  async createBlog(data: BlogCreationAttributes): Promise<Blog> {
    if (!data.title || !data.content || !data.authorId) {
      throw createHttpError.BadRequest(
        "Title, content and authorId are required.",
      );
    }

    const existingBlog = await this.blogModel.findOne({
      where: {
        title: data.title,
        authorId: data.authorId,
      },
    });

    if (existingBlog) {
      throw createHttpError.BadRequest(BlogMessages.BLOG_TITLE_ALREADY_EXISTS);
    }

    const blog = await this.blogModel.create({
      ...data,
      categoryId: data.categoryId || null,
    });

    return blog;
  }

  async getAllBlogs({
    search = "",
    page = 1,
    limit = 10,
    sort = "newest",
  }: GetAllBlogsParams): Promise<PaginatedBlogs> {
    const offset = (page - 1) * limit;

    const result = await this.blogModel.findAndCountAll({
      where: search
        ? {
            [Op.or]: ["title", "content"].map((field) =>
              where(fn("LOWER", col(field)), {
                [Op.like]: `%${search.toLowerCase()}%`,
              }),
            ),
          }
        : {},
      order: [["createdAt", sort === "newest" ? "DESC" : "ASC"]],
      limit,
      offset,
      distinct: true,
      attributes: { exclude: ["authorId", "categoryId"] },
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "full_name", "avatar"],
        },
        {
          model: User,
          as: "bookmarkedBy",
          attributes: ["id"],
          through: { attributes: [] },
        },
      ],
    });

    const blogs = result.rows.map((b: any) => {
      const blog = b.toJSON();
      blog.bookmarkCount = blog.bookmarkedBy?.length || 0;
      delete blog.bookmarkedBy;
      return blog;
    });

    return {
      total: result.count,
      totalPages: Math.ceil(result.count / limit),
      page,
      limit,
      sort,
      blogs,
    };
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

  async updateBlog(
    idParam: string,
    body: BlogUpdateAttributes,
    userId?: number,
  ): Promise<Blog> {
    const id = Number(idParam);

    if (isNaN(id)) {
      throw createHttpError.BadRequest("Blog id must be a number");
    }

    if (!userId) {
      throw createHttpError.Unauthorized("Unauthorized");
    }

    const blog = await this.blogModel.findByPk(id);

    if (!blog) {
      throw createHttpError.NotFound(BlogMessages.BLOG_NOT_FOUND);
    }

    if (blog.authorId !== userId) {
      throw createHttpError.Forbidden(BlogMessages.BLOG_UPDATE_FORBIDDEN);
    }

    await blog.update({
      title: body.title ?? blog.title,
      content: body.content ?? blog.content,
      status: body.status ?? blog.status,
      categoryId:
        body.categoryId !== undefined ? body.categoryId : blog.categoryId,
    });

    return blog;
  }

  async deleteBlog(idParam: string, userId?: number): Promise<void> {
    const id = Number(idParam);

    if (isNaN(id)) {
      throw createHttpError.BadRequest("Blog id must be a number");
    }

    if (!userId) {
      throw createHttpError.Unauthorized("Unauthorized");
    }

    const blog = await this.blogModel.findByPk(id);

    if (!blog) {
      throw createHttpError.NotFound(BlogMessages.BLOG_NOT_FOUND);
    }

    if (blog.authorId !== userId) {
      throw createHttpError.Forbidden(BlogMessages.BLOG_DELETE_FORBIDDEN);
    }

    await blog.destroy();
  }

  async likeOrDislike(
    blogId: number,
    userId: number,
    isLike: boolean,
  ): Promise<ReactionResult> {
    if (isNaN(blogId)) {
      throw createHttpError.BadRequest("Blog id must be a number");
    }

    if (typeof isLike !== "boolean") {
      throw createHttpError.BadRequest("isLike must be boolean");
    }

    const blog = await this.blogModel.findByPk(blogId);

    if (!blog) {
      throw createHttpError.NotFound("Blog not found");
    }

    const existingReaction = await Reaction.findOne({
      where: { blogId, userId },
    });

    if (existingReaction) {
      if (existingReaction.isLike === isLike) {
        await existingReaction.destroy();
      } else {
        existingReaction.isLike = isLike;
        await existingReaction.save();
      }
    } else {
      await Reaction.create({ blogId, userId, isLike });
    }

    const [likes, dislikes] = await Promise.all([
      Reaction.count({ where: { blogId, isLike: true } }),
      Reaction.count({ where: { blogId, isLike: false } }),
    ]);

    return {
      likes,
      dislikes,
      message: "Reaction updated successfully",
    };
  }

  async toggleBookmark(
    userId: number,
    blogIdParam: string,
  ): Promise<ToggleBookmarkResult> {
    if (!userId) {
      throw createHttpError.Unauthorized("Unauthorized");
    }

    const blogId = Number(blogIdParam);
    if (isNaN(blogId)) {
      throw createHttpError.BadRequest("Blog id must be a number");
    }

    const blog = await this.blogModel.findByPk(blogId);
    if (!blog) {
      throw createHttpError.NotFound(BlogMessages.BLOG_NOT_FOUND);
    }

    const existing = await Bookmark.findOne({ where: { userId, blogId } });

    if (existing) {
      await existing.destroy();
      return { isBookmarked: false };
    }

    await Bookmark.create({ userId, blogId });
    return { isBookmarked: true };
  }

  async getUserBookmarkedBlogs(
    userId?: number,
    pageParam?: string,
    limitParam?: string,
  ): Promise<{
    rows: Blog[];
    count: number;
    totalPages: number;
    page: number;
    limit: number;
  }> {
    if (!userId) {
      throw createHttpError.Unauthorized("Unauthorized");
    }

    const page = Number(pageParam) || 1;
    const limit = Number(limitParam) || 10;
    const offset = (page - 1) * limit;

    const { rows, count } = await Blog.findAndCountAll({
      include: [
        {
          model: User,
          as: "bookmarkedBy",
          where: { id: userId },
          attributes: [],
          through: { attributes: [] },
        },
        {
          model: User,
          as: "author",
          attributes: ["id", "full_name", "avatar"],
        },
      ],
      offset,
      limit,
      order: [["createdAt", "DESC"]],
    });

    return {
      rows,
      count,
      totalPages: Math.ceil(count / limit),
      page,
      limit,
    };
  }
}

export default new BlogService();
