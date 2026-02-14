import createHttpError from "http-errors";
import { BlogMessages } from "../../constant/messages";
import { Blog } from "./entities/blog.model";
import {
  BlogCreationAttributes,
  BlogUpdateAttributes,
  GetAllBlogsParams,
  PaginatedBlogs,
  PaginatedBookmarkedBlogs,
  ReactionResult,
  ToggleBookmarkResult,
} from "./types/index.types";
import { Op, fn, col, where } from "sequelize";
import { User } from "../user/user.model";
import { Bookmark } from "./entities/blog-bookmarks.model";
import { Reaction } from "../blog/entities/blog-likes.model";
import sequelize from "sequelize";

class BlogService {
  private blogModel = Blog;

  /** Common helper to validate numeric IDs */
  private validateId(id: any, name = "ID"): number {
    const num = Number(id);
    if (isNaN(num))
      throw createHttpError.BadRequest(`${name} must be a number`);
    return num;
  }

  /** Common helper to get bookmark and like counts for multiple blogs */
  private async getBookmarkAndReactionCounts(blogIds: number[]) {
    if (!blogIds.length) return [{}, {}];

    const [bm, rc] = await Promise.all([
      Bookmark.findAll({
        attributes: [
          "blogId",
          [sequelize.fn("COUNT", sequelize.col("blogId")), "c"],
        ],
        where: { blogId: blogIds },
        group: ["blogId"],
        raw: true,
      }),
      Reaction.findAll({
        attributes: [
          "blogId",
          [sequelize.fn("COUNT", sequelize.col("blogId")), "c"],
        ],
        where: { blogId: blogIds },
        group: ["blogId"],
        raw: true,
      }),
    ]);

    const bmMap = Object.fromEntries(bm.map((x: any) => [x.blogId, +x.c]));
    const rcMap = Object.fromEntries(rc.map((x: any) => [x.blogId, +x.c]));

    return [bmMap, rcMap];
  }

  async createBlog(data: BlogCreationAttributes): Promise<Blog> {
    if (!data.title || !data.content || !data.authorId)
      throw createHttpError.BadRequest(
        "Title, content and authorId are required.",
      );

    const existingBlog = await this.blogModel.findOne({
      where: { title: data.title, authorId: data.authorId },
    });
    if (existingBlog)
      throw createHttpError.BadRequest(BlogMessages.BLOG_TITLE_ALREADY_EXISTS);

    return this.blogModel.create({
      ...data,
      categoryId: data.categoryId || null,
    });
  }

  async getAllBlogs(params: GetAllBlogsParams): Promise<PaginatedBlogs> {
    const { search = "", page = 1, limit = 10, sort = "newest" } = params;
    const p = Math.max(1, +page);
    const l = Math.min(50, Math.max(1, +limit));
    const offset = (p - 1) * l;

    const whereCondition = search
      ? {
          [Op.or]: ["title", "content"].map((f) =>
            where(fn("LOWER", col(f)), {
              [Op.like]: `%${search.toLowerCase()}%`,
            }),
          ),
        }
      : {};

    const result = await Blog.findAndCountAll({
      where: whereCondition,
      order: [["createdAt", sort === "newest" ? "DESC" : "ASC"]],
      limit: l,
      offset,
      distinct: true,
      attributes: { exclude: ["authorId", "categoryId"] },
      include: [{ model: User, attributes: ["id", "full_name", "avatar"] }],
    });

    const ids = result.rows.map((b) => b.id);
    if (!ids.length)
      return {
        total: result.count,
        totalPages: Math.ceil(result.count / l),
        page: p,
        limit: l,
        sort,
        blogs: [],
      };

    const [bmMap, rcMap] = await this.getBookmarkAndReactionCounts(ids);

    const blogs = result.rows.map((b: any) => {
      const j = b.toJSON();
      return {
        ...j,
        bookmarkCount: bmMap[j.id] || 0,
        likeCount: rcMap[j.id] || 0,
      };
    });

    return {
      total: result.count,
      totalPages: Math.ceil(result.count / l),
      page: p,
      limit: l,
      sort,
      blogs,
    };
  }

  async getBlogById(id: number) {
    const blog = await this.blogModel.findOne({
      where: { id },
      attributes: { exclude: ["authorId", "categoryId"] },
      include: [
        {
          model: User,
          attributes: [
            "id",
            "full_name",
            "mobile",
            "avatar",
            "is_banned",
            "role",
          ],
          required: false,
        },
        { model: Reaction, attributes: ["id"], required: false },
      ],
    });

    if (!blog) return null;

    const blogJSON = blog.toJSON() as any;
    const bookmarkCount = await Bookmark.count({
      where: { blogId: blogJSON.id },
    });
    const likeCount = blogJSON.blog_likes?.length ?? 0;
    delete blogJSON.blog_likes;

    return { ...blogJSON, bookmarkCount, likeCount };
  }

  async updateBlog(
    idParam: string,
    body: BlogUpdateAttributes,
    userId?: number,
  ) {
    if (!userId) throw createHttpError.Unauthorized("Unauthorized");
    const id = this.validateId(idParam, "Blog id");

    const blog = await this.blogModel.findByPk(id);
    if (!blog) throw createHttpError.NotFound(BlogMessages.BLOG_NOT_FOUND);
    if (blog.authorId !== userId)
      throw createHttpError.Forbidden(BlogMessages.BLOG_UPDATE_FORBIDDEN);

    return blog.update({
      title: body.title ?? blog.title,
      content: body.content ?? blog.content,
      status: body.status ?? blog.status,
      categoryId: body.categoryId ?? blog.categoryId,
    });
  }

  async deleteBlog(idParam: string, userId?: number) {
    if (!userId) throw createHttpError.Unauthorized("Unauthorized");
    const id = this.validateId(idParam, "Blog id");

    const blog = await this.blogModel.findByPk(id);
    if (!blog) throw createHttpError.NotFound(BlogMessages.BLOG_NOT_FOUND);
    if (blog.authorId !== userId)
      throw createHttpError.Forbidden(BlogMessages.BLOG_DELETE_FORBIDDEN);

    await blog.destroy();
  }

  async likeOrDislike(
    blogId: number,
    userId: number,
    isLike: boolean,
  ): Promise<ReactionResult> {
    if (isNaN(blogId))
      throw createHttpError.BadRequest("Blog id must be a number");
    if (typeof isLike !== "boolean")
      throw createHttpError.BadRequest("isLike must be boolean");

    const blog = await this.blogModel.findByPk(blogId);
    if (!blog) throw createHttpError.NotFound("Blog not found");

    const existingReaction = await Reaction.findOne({
      where: { blogId, userId },
    });
    if (existingReaction) {
      if (existingReaction.isLike === isLike) await existingReaction.destroy();
      else {
        existingReaction.isLike = isLike;
        await existingReaction.save();
      }
    } else await Reaction.create({ blogId, userId, isLike });

    const [likes, dislikes] = await Promise.all([
      Reaction.count({ where: { blogId, isLike: true } }),
      Reaction.count({ where: { blogId, isLike: false } }),
    ]);

    return { likes, dislikes, message: "Reaction updated successfully" };
  }

  async toggleBookmark(
    userId: number,
    blogIdParam: string,
  ): Promise<ToggleBookmarkResult> {
    if (!userId) throw createHttpError.Unauthorized("Unauthorized");
    const blogId = this.validateId(blogIdParam, "Blog id");

    const blog = await this.blogModel.findByPk(blogId);
    if (!blog) throw createHttpError.NotFound(BlogMessages.BLOG_NOT_FOUND);

    const existing = await Bookmark.findOne({ where: { userId, blogId } });
    if (existing) {
      await existing.destroy();
      return { isBookmarked: false };
    }

    await Bookmark.create({ userId, blogId });
    return { isBookmarked: true };
  }

  async getUserBlogs(userId?: number, pageParam?: string, limitParam?: string) {
    if (!userId) throw createHttpError.Unauthorized("Unauthorized");

    const page = Number(pageParam) || 1;
    const limit = Number(limitParam) || 10;
    const offset = (page - 1) * limit;

    const { rows: bookmarks, count } = await Bookmark.findAndCountAll({
      where: { userId },
      offset,
      limit,
      order: [["createdAt", "DESC"]],
    });

    const blogIds = bookmarks.map((b) => b.blogId);
    if (!blogIds.length)
      return {
        count,
        totalPages: Math.ceil(count / limit),
        page,
        limit,
        rows: [],
      };

    const blogs = await this.blogModel.findAll({
      where: { id: blogIds },
      attributes: { exclude: ["authorId", "categoryId"] },
      include: [
        {
          model: User,
          attributes: [
            "id",
            "full_name",
            "mobile",
            "avatar",
            "is_banned",
            "role",
          ],
        },
        { model: Reaction, attributes: ["id"] },
      ],
    });

    const [bookmarkCountMap] = await this.getBookmarkAndReactionCounts(blogIds);

    const rows = blogs.map((blog: any) => {
      const blogJSON = blog.toJSON();
      const likeCount = blogJSON.blog_likes?.length ?? 0;
      delete blogJSON.blog_likes;
      return {
        ...blogJSON,
        bookmarkCount: bookmarkCountMap[blogJSON.id] || 0,
        likeCount,
      };
    });

    return { count, totalPages: Math.ceil(count / limit), page, limit, rows };
  }
}

export default new BlogService();
