import UserModel from "@/db/models/UserModel";
import errHandler from "@/helpers/errHandler";
import { comparePassword } from "@/helpers/bcrypt";
import { signToken } from "@/helpers/jwt";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw { message: "Invalid email or password", status: 401 };
    }

    const isPasswordValid = comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw { message: "Invalid email or password", status: 401 };
    }

    const token = signToken({ id: user._id, email: user.email });

    const cookieStore = await cookies();
    cookieStore.set("Authorization", `Bearer ${token}`);

    return Response.json({ token }, { status: 200 });
  } catch (err) {
    return errHandler(err);
  }
}
