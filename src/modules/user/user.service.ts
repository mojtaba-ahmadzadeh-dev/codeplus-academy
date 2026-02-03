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
}

export default new UserService();
