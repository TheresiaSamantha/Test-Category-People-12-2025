import { database } from "../config/mongodb";
import { People } from "@/types/PeopleTypes";
import { ObjectId } from "mongodb";
import * as z from "zod";

const PeopleSchema = z.object({
  noApp: z.string({ message: "noApp harus diisi" }),
  nama: z.string({ message: "nama harus diisi" }),
  tempatLahir: z.string({ message: "Tempat Lahir harus diisi" }),
  tanggalLahir: z.iso.date({ message: "Tanggal Lahir harus diisi" }),
  Kelamin: z.string({ message: "Kelamin harus diisi" }),
  kodePos: z.string({ message: "Kode Pos harus diisi" }),
  alamat: z.string({ message: "Alamat harus diisi" }),
});

class PeopleModel {
  static getCollection() {
    return database.collection("People");
  }

  static async findAll() {
    const collection = this.getCollection();
    return await collection.find().toArray();
  }

  static async create(peopleData: People) {
    PeopleSchema.parse(peopleData);
    const collection = this.getCollection();
    const result = await collection.insertOne(peopleData);
    return result;
  }
  static async findById(id: string) {
    const collection = this.getCollection();
    const data = await collection.findOne({ _id: new ObjectId(id) });
    console.log("🚀 ~ PeopleModel ~ findById ~ data:", data);
    return data;
  }
  static async updateById(id: string, updateData: Partial<People>) {
    const collection = this.getCollection();
    return await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
  }
  static async deleteById(id: string) {
    const collection = this.getCollection();
    return await collection.deleteOne({ _id: new ObjectId(id) });
  }
}

export default PeopleModel;
