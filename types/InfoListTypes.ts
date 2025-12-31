import { ObjectId } from "mongodb";

export type OptionItem = {
  label: string;
  value: string;
  score: number;
};

export type FieldsType = {
  [key: string]: OptionItem[];
};

export type FormOptionDocument = {
  _id?: ObjectId;
  name: string;
  fields: FieldsType;
};

export type FormOptionCollection = FormOptionDocument[];
