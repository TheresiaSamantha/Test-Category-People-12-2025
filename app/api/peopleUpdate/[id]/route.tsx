import PeopleModel from "@/db/models/PeopleModel";
// import { People } from "@/types/PeopleTypes";
import errHandler from "@/helpers/errHandler";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const people = await PeopleModel.findById(id);
    return Response.json(people, { status: 200 });
  } catch (error) {
    return errHandler(error);
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updatedPeople = await PeopleModel.updateById(
      id,
      body // as Partial<People>
    );
    return Response.json(updatedPeople, { status: 200 });
  } catch (error) {
    return errHandler(error);
  }
}
