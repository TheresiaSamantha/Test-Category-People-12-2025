import { database } from "../config/mongodb";

class InfoListModel {
  static getCollection() {
    return database.collection("InfoList");
  }

  static async findAll() {
    const collection = this.getCollection();
    return await collection.find().toArray();
  }
}

export default InfoListModel;
