import { database } from "../config/mongodb";
import { FormPeople } from "@/types/PeopleTypes";
import * as z from "zod";
import { ObjectId } from "mongodb";

const peopleFormSchema = z.object({
  idPeople: z.instanceof(ObjectId, { message: "idPeople harus diisi" }),
  categoryPeople: z.string({ message: "formData harus diisi" }),
  totalScore: z.number({ message: "totalScore harus diisi" }),
});

class PeopleFormModel {
  static getCollection() {
    return database.collection("PeopleForm");
  }
  static async findbyIdPeople(id: string) {
    const collection = this.getCollection();
    const idPeople = new ObjectId(id);
    const data = await collection.findOne({ idPeople: idPeople });
    return data;
  }
  static async create(formPeopleData: FormPeople) {
    peopleFormSchema.parse(formPeopleData);
    console.log(
      "🚀 ~ PeopleFormModel ~ create ~ formPeopleData:",
      formPeopleData
    );
    const collection = this.getCollection();
    const result = await collection.insertOne(formPeopleData);
    return result;
  }
  static async updateByIdPeople(id: string, updateData: Partial<FormPeople>) {
    const collection = this.getCollection();
    const idPe = new ObjectId(id);
    return await collection.updateOne({ idPeople: idPe }, { $set: updateData });
  }
  static async deleteByIdPeople(id: string) {
    const collection = this.getCollection();
    const idPe = new ObjectId(id);
    return await collection.deleteOne({ idPeople: idPe });
  }
}

export default PeopleFormModel;
