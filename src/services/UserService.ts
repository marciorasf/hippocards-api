import * as bcrypt from "bcrypt";

import { PrismaClient, UserCreateInput } from "@prisma/client";

import { salt_rounds } from "../config";

const prisma = new PrismaClient();

class UserService {
  async create(user: UserCreateInput) {
    const hashedPassword = await bcrypt.hash(user.password, Number(salt_rounds));
    return prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
      },
    });
  }

  async getByEmail(email: string) {
    return prisma.user.findOne({ where: { email } });
  }

  async updatePassword(id: number, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, Number(salt_rounds));
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
