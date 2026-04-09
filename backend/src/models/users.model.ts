import { Document, model, Schema, Types } from "mongoose";

export const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true
    },
  },
  { versionKey: false }
);

export interface IUser {
  _id: Types.ObjectId;
  name: String;
  firstname: String;
}

export interface User extends Omit<IUser, "_id">, Document {}

export const UsersModel = model(
  "users",
  UserSchema
);