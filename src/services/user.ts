import bcrypt from "bcrypt";

import { __salt_rounds__ } from "@config/encrypt";
import { User } from "@entities/user";
import generateToken from "@utils/generate-token";

type CreateData = {
  email: string;
  password: string;
};

type RetrieveWhere = {
  id?: number;
  email?: string;
  recoverPasswordToken?: string;
};

const userService = {
  async create(user: CreateData) {
    const hashedPassword = await bcrypt.hash(user.password, Number(__salt_rounds__));

    return User.create({
      email: user.email,
      password: hashedPassword,
    }).save();
  },

  async retrieveOne(where: RetrieveWhere) {
    return User.findOne({
      where,
    });
  },

  async updatePassword(id: number, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, Number(__salt_rounds__));
    return User.update({ id }, { password: hashedPassword });
  },

  async existsUserWithEmail(email: string) {
    try {
      await User.findOneOrFail({ where: { email } });
      return true;
    } catch (err) {
      return false;
    }
  },

  async addRecoverPasswordToken(email: string) {
    const oneHour = 60 * 60;
    const token = generateToken({ email }, oneHour);

    return User.update({ email }, { recoverPasswordToken: token });
  },

  async removeRecoverPasswordTokenById(id: number) {
    return User.update({ id }, { recoverPasswordToken: null });
  },
};

export default userService;
