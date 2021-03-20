import bcrypt from "bcrypt";

import { __salt_rounds__ } from "../config/encrypt";
import { User } from "../entities/user";

type CreateData = {
  email: string;
  password: string;
};

const userService = {
  async create(user: CreateData) {
    const hashedPassword = await bcrypt.hash(user.password, Number(__salt_rounds__));

    return User.create({
      email: user.email,
      password: hashedPassword,
    }).save();
  },

  async getByEmail(email: string) {
    return User.find({
      where: {
        email,
      },
    });
  },

  async updatePassword(id: number, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, Number(__salt_rounds__));
    return User.update({ id }, { password: hashedPassword });
  },

  async existsUserWithEmail(email: string) {
    const user = await User.find({ where: { email } });
    return Boolean(user);
  },
};

export default userService;
