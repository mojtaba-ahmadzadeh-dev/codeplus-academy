import { User } from "./user.model";

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

  async updateUserById (id: number, payload: Partial<User>) {
    const user = await User.findByPk(id);

    if (!user) throw new Error("User not found");

    await user.update(payload)

    return user
  }
}

export default new UserService();
