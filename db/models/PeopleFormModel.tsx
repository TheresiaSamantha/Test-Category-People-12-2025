import { database } from "../config/mongodb";
import { FormPeople } from "@/types/PeopleTypes";
import * as z from "zod";

const peopleFormSchema = z.object({
  idPeople: z.string({ message: "personId harus diisi" }),
  categoryPeople: z.string({ message: "formData harus diisi" }),
  totalScore: z.number({ message: "totalScore harus diisi" }),
});

class PeopleFormModel {
  static getCollection() {
    return database.collection("PeopleForm");
  }
  static async findbyIdPeople(idPeople: string) {
    const collection = this.getCollection();
    return await collection.findOne({ idPeople: idPeople });
  }
  static async create(formPeopleData: FormPeople) {
    peopleFormSchema.parse(formPeopleData);
    const collection = this.getCollection();
    const result = await collection.insertOne(formPeopleData);
    return result;
  }
  static async updateByIdPeople(id: string, updateData: Partial<FormPeople>) {
    const collection = this.getCollection();
    return await collection.updateOne({ idPeople: id }, { $set: updateData });
  }
  static async deleteByIdPeople(id: string) {
    const collection = this.getCollection();
    return await collection.deleteOne({ idPeople: id });
  }
}

export default PeopleFormModel;
