import { ObjectId } from "mongodb";
export type UserType = {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string;
};
