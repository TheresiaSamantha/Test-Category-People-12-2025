import PeopleFormModel from "@/db/models/PeopleFormModel";
import PeopleModel from "@/db/models/PeopleModel";
import { FormPeople } from "@/types/PeopleTypes";
import errHandler from "@/helpers/errHandler";
import { ObjectId } from "mongodb";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const personForm = await PeopleFormModel.findbyIdPeople(id);
    return Response.json(personForm, { status: 200 });
  } catch (error) {
    return errHandler(error);
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { id } = await params;

    // Check if already exists before creating
    const checkExisting = await PeopleFormModel.findbyIdPeople(id);
    if (checkExisting) {
      return Response.json(
        { message: "Person form already exists" },
        { status: 409 }
      );
    }

    // Convert idPeople string to ObjectId
    const formData: FormPeople = {
      ...body,
      idPeople: new ObjectId(id),
    };

    const newPersonForm = await PeopleFormModel.create(formData);
    return Response.json(newPersonForm, { status: 201 });
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

    // Ensure idPeople is ObjectId, not string
    const updateData: Partial<FormPeople> = {
      ...body,
      idPeople: new ObjectId(id),
    };

    const updatedPersonForm = await PeopleFormModel.updateByIdPeople(
      id,
      updateData
    );
    return Response.json(updatedPersonForm, { status: 200 });
  } catch (error) {
    return errHandler(error);
  }
}
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await PeopleFormModel.deleteByIdPeople(id);
    const deletedPerson = await PeopleModel.deleteById(id);
    return Response.json(deletedPerson, { status: 200 });
  } catch (error) {
    return errHandler(error);
  }
}
