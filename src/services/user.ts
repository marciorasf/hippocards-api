import bcrypt from "bcrypt";

import { PrismaClient, UserCreateInput } from "@prisma/client";

import { User } from "../entities/user";
import { __salt_rounds__ } from "../env-variables";

const prisma = new PrismaClient();

class UserService {
  async create(user: UserCreateInput) {
    const hashedPassword = await bcrypt.hash(user.password, Number(__salt_rounds__));

    return User.create({
      email: user.email,
      password: hashedPassword,
    }).save();
  }

  async getByEmail(email: string) {
    return prisma.user.findOne({ where: { email } });
  }

  async updatePassword(id: number, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, Number(__salt_rounds__));
    return prisma.user.update({
      data: {
        password: hashedPassword,
      },
      where: {
        id,
      },
    });
  }

  async existsUserWithEmail(email: string) {
    const user = await prisma.user.findOne({ where: { email } });
    return Boolean(user);
  }
}

export default new UserService();
