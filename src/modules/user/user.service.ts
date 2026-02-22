import { userMessage } from "../../constant/messages";
import { Blog } from "../blog/entities/blog.model";
import { Course } from "../course/entities/course.model";
import { CreateUserDTO } from "./types/index.types";
import { User } from "../user/user.model";
import createHttpError from "http-errors";

class UserService {
  private model: typeof User;

  constructor() {
    this.model = User;
  }
  async getAllUsers() {
    return this.model.findAll();
  }

  async getUserById(id: string) {
    const user = await this.findUserOrFail(id);
    return user;
  }

  async updateUserById(id: number, payload: Partial<User>) {
    const user = await this.findUserOrFail(id);

    await user.update(payload);

    return user;
  }

  async removeUserById(id: number) {
    const user = await this.findUserOrFail(id);

    await user.destroy();
    return user;
  }

  async changeRole(id: number, role: string) {
    const user = await this.findUserOrFail(id);

    await user.update({ role });

    return user;
  }

  async createUser(payload: CreateUserDTO) {
    const exists = await this.model.findOne({
      where: { mobile: payload.mobile },
    });

    if (exists) {
      throw createHttpError.Conflict(userMessage.MOBILE_ALREADY_EXISTS);
    }

    const user = await this.model.create(payload);
    return user;
  }

  async banUser(id: number, isBanned: boolean) {
    const user = await this.findUserOrFail(id);

    await user.update({ is_banned: isBanned });
    return user;
  }

  async getAllUsersBookmarks() {
    const users = await this.model.findAll({
      attributes: ["id", "full_name", "mobile"],
      include: [
        {
          model: Blog,
          as: "bookmarkedBlogs",
          through: { attributes: [] },
        },
        {
          model: Course,
          as: "bookmarkedCourses",
          through: { attributes: [] },
        },
      ],
    });

    return users;
  }

  async getAllUsersLikes() {
    const users = await this.model.findAll({
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

  private async findUserOrFail(id: number | string) {
    const user = await this.model.findByPk(id);

    if (!user) {
      throw createHttpError.NotFound(userMessage.USER_NOT_FOUND);
    }

    return user;
  }
}

export default new UserService();
