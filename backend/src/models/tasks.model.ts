import { Document, model, Schema, Types } from "mongoose";
import { IUser, UserSchema } from "./users.model";

const TaskSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    done: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    user: UserSchema
  },
  { versionKey: false }
);

export interface ITask {
  _id: Types.ObjectId;
  name: String;
  done: Boolean;
  createdAt: Date;
  user: IUser;
}

export interface Task extends Omit<ITask, "_id">, Document {}

export const TasksModel = model(
  "tasks",
  TaskSchema
);