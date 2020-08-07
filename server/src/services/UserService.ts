import db from "../database/connection";
import { User } from "../interfaces/UserInterface";

class UserService {
  public async create(user: User) {
    return db("users").insert(user);
  }
}

export default new UserService();
