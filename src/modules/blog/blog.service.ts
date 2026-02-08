import { Blog } from "./blog.model";
import { BlogCreationAttributes } from "./types/index.types";
import { Op, fn, col, where } from "sequelize"; // اضافه شد

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
}

export default new BlogService();
