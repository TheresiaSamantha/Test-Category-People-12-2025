import UserModel from "@/db/models/UserModel";
import errHandler from "@/helpers/errHandler";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    const newUser = await UserModel.create({
      email,
      password,
      name,
    });
    return Response.json(newUser, { status: 201 });
  } catch (error) {
    return errHandler(error);
  }
}
