import { database } from "../config/mongodb";
import * as z from "zod";
import type { UserType } from "@/types/UserTypes";
import { hashPassword } from "@/helpers/bcrypt";

const UserSchema = z.object({
  email: z.email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  name: z.string().min(1, { message: "Name is required" }),
});

class UserModel {
  static collection() {
    return database.collection("Users");
  }

  static async create(newUser: UserType) {
    /*
      - email, password, name required
      - email format
      - password length min 6
      - unik email
      - hashpassword
    */
    UserSchema.parse(newUser);

    const existingUser = await this.collection().findOne({
      email: newUser.email,
    });

    if (existingUser) {
      throw { message: "Email or username already in use", status: 400 };
    }

    newUser.password = hashPassword(newUser.password);
    await this.collection().insertOne(newUser);
    return newUser;
  }
  static async findByEmail(email: string) {
    const user = await this.collection().findOne({ email });
    return user;
  }
}

export default UserModel;
