import bcrypt from "bcrypt";

import { PrismaClient, UserCreateInput } from "@prisma/client";

import { UserAuth } from "../interfaces/AuthInterface";

const prisma = new PrismaClient();

class UserService {
  public async create(user: UserCreateInput) {
    const hashedPassword = await bcrypt.hash(user.password, Number(process.env.SALT_ROUNDS));
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

  public async getByEmail(email: string) {
    return prisma.user.findOne({ where: { email } });
  }

  public async updatePassword(user: UserAuth) {
    const hashedPassword = await bcrypt.hash(user.password, Number(process.env.SALT_ROUNDS));
    return prisma.user.update({
      data: {
        password: hashedPassword,
      },
      where: {
        email: user.email,
      },
    });
  }

  public async existsUserWithEmail(email: string) {
    const user = await prisma.user.findOne({ where: { email } });
    return Boolean(user);
  }
}

export default new UserService();
