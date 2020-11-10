import bcrypt from "bcrypt";

import { PrismaClient, UserCreateInput } from "@prisma/client";

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

  public async updatePassword(id: number, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, Number(process.env.SALT_ROUNDS));
    return prisma.user.update({
      data: {
        password: hashedPassword,
      },
      where: {
        id,
      },
    });
  }

  public async existsUserWithEmail(email: string) {
    const user = await prisma.user.findOne({ where: { email } });
    return Boolean(user);
  }
}

export default new UserService();
