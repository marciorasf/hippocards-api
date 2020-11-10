import crypto from "crypto";

import { PrismaClient, UserTokenCreateInput } from "@prisma/client";

const prisma = new PrismaClient();

class UserTokenService {
  async createForgotPasswordUserToken(userId: number) {
    const token = this.generateUserTokenToken();

    return this.createUserToken({
      token,
      expiresIn: String(Date.now() + 3600000), // 1 hour
      User: {
        connect: {
          id: userId,
        },
      },
    });
  }

  async createUserToken(data: UserTokenCreateInput) {
    return prisma.userToken.create({ data });
  }

  generateUserTokenToken() {
    const buf = crypto.randomBytes(20);
    const token = buf.toString("hex");
    return token;
  }

  async getUserByUserToken(token: string) {
    const userToken = await prisma.userToken.findOne({ where: { token }, include: { User: {} } });

    if (!userToken || +userToken?.expiresIn < Date.now()) {
      return null;
    }

    return userToken.User;
  }
}

export default new UserTokenService();
