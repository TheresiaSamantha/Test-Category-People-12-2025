import PeopleModel from "@/db/models/PeopleModel";
import { People } from "@/types/PeopleTypes";
import errHandler from "@/helpers/errHandler";

export async function GET() {
  try {
    const people = await PeopleModel.findAll();
    return Response.json(people, { status: 200 });
  } catch (error) {
    return errHandler(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newPeople = await PeopleModel.create(body as People);
    return Response.json(newPeople, { status: 201 });
  } catch (error) {
    return errHandler(error);
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!body._id) {
      return Response.json(
        { message: "ID is required for updating a person" },
        { status: 400 }
      );
    }
    const updatedPeople = await PeopleModel.updateById(
      body._id,
      body as Partial<People>
    );
    return Response.json(updatedPeople, { status: 200 });
  } catch (error) {
    return errHandler(error);
  }
}
