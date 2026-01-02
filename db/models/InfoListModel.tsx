import { database } from "../config/mongodb";
import { ObjectId } from "mongodb";

class InfoListModel {
  static getCollection() {
    return database.collection("InfoList");
  }

  static async findAll() {
    const collection = this.getCollection();
    return await collection.find().toArray();
  }
  static async findById(id: string) {
    const collection = this.getCollection();
    return await collection.findOne({ _id: new ObjectId(id) });
  }
}

export default InfoListModel;
