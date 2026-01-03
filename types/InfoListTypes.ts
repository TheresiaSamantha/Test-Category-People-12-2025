import { ObjectId } from "mongodb";

export type OptionItem = {
  label: string;
  value: string;
  score: number;
  bobotOptions: number;
};

export type FieldsType = {
  [key: string]: {
    bobotOptions: number;
    options: OptionItem[];
  };
};

export type FormOptionDocument = {
  _id?: ObjectId;
  name: string;
  bobotInfo: number;
  fields: FieldsType;
};

export type FormOptionCollection = FormOptionDocument[];
