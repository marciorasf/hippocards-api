import bcrypt from "bcrypt";

import { User } from "../entities/user";
import { __salt_rounds__ } from "../env-variables";

type CreateData = {
  email: string;
  password: string;
};

class UserService {
  async create(user: CreateData) {
    const hashedPassword = await bcrypt.hash(user.password, Number(__salt_rounds__));

    return User.create({
      email: user.email,
      password: hashedPassword,
    }).save();
  }

  async getByEmail(email: string) {
    return User.find({
      where: {
        email,
      },
    });
  }

  async updatePassword(id: number, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, Number(__salt_rounds__));
    return User.update({ id }, { password: hashedPassword });
  }

  async existsUserWithEmail(email: string) {
    const user = await User.find({ where: { email } });
    return Boolean(user);
  }
}

export default new UserService();
