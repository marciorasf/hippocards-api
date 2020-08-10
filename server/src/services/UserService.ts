import { PrismaClient } from "@prisma/client";

import { UserCreate } from "../interfaces/UserInterface";

const prisma = new PrismaClient();

class UserService {
  public async create(user: UserCreate) {
    return prisma.user.create({
      data: user,
    });
  }
}

export default new UserService();
