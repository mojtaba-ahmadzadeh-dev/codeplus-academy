import { userMessage } from "../../constant/messages";
import { Reaction } from "../blog/entities/blog-likes.model";
import { Blog } from "../blog/entities/blog.model";
import { CourseReaction } from "../course/entities/course-likes.model";
import { Course } from "../course/entities/course.model";
import { CreateUserDTO } from "./types/index.types";
import { User } from "../user/user.model";

class UserService {
  private model: typeof User;

  constructor() {
    this.model = User;
  }

  async getAllUsers() {
    const users = await this.model.findAll();
    return users;
  }

  async getUserById(id: string) {
    const user = await User.findByPk(id);
    return user;
  }

  async updateUserById(id: number, payload: Partial<User>) {
    const user = await User.findByPk(id);

    if (!user) throw new Error("User not found");

    await user.update(payload);

    return user;
  }

  async removeUserById(id: number) {
    const user = await this.model.findByPk(id);

    if (!user) throw new Error(userMessage.USER_NOT_FOUND);

    await user.destroy();
    return user;
  }

  async changeRole(id: number, role: string) {
    const user = await this.model.findByPk(id);

    if (!user) throw new Error(userMessage.USER_NOT_FOUND);

    await user.update({ role });

    return user;
  }

  async createUser(payload: CreateUserDTO) {
    const exists = await this.model.findOne({
      where: { mobile: payload.mobile },
    });
    if (exists) throw new Error(userMessage.MOBILE_ALREADY_EXISTS);

    const user = await this.model.create(payload);
    return user;
  }

  async banUser(id: number, isBanned: boolean) {
    const user = await this.model.findByPk(id);
    if (!user) throw new Error(userMessage.USER_NOT_FOUND);

    await user.update({ is_banned: isBanned });
    return user;
  }

  async getAllUsersBookmarks() {
    const users = await User.findAll({
      attributes: ["id", "full_name", "mobile"],
      include: [
        {
          model: Blog,
          as: "bookmarkedBlogs",
          through: { attributes: [] }, // حذف ستون‌های جدول واسط
          // attributes حذف شد تا همه ستون‌ها بیاد
        },
        {
          model: Course,
          as: "bookmarkedCourses",
          through: { attributes: [] },
          // attributes حذف شد تا همه ستون‌ها بیاد
        },
      ],
    });

    return users;
  }

  async getAllUsersLikes() {
    const users = await User.findAll({
      attributes: ["id", "full_name", "mobile"],
      include: [
        {
          model: Blog,
          as: "likedBlogs",
          through: { attributes: [] },
        },
        {
          model: Course,
          as: "likedCourses",
          through: { attributes: [] },
        },
      ],
    });

    return users;
  }
}

export default new UserService();
