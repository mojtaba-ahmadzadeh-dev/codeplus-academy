import { Blog } from "./blog.model";
import { BlogCreationAttributes } from "./types/index.types";

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

  async getAllBlogs(): Promise<Blog[]> {
    try {
      const blogs = await this.blogModel.findAll({
        order: [["createdAt", "DESC"]],
      });
      return blogs;
    } catch (error) {
      console.error("Error fetching blogs:", error);
      throw error;
    }
  }
}

export default new BlogService();
