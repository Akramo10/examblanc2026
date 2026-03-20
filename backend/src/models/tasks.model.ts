import { Document, model, Schema, Types } from "mongoose";

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
  },
  { versionKey: false }
);

export interface ITask {
  _id: Types.ObjectId;
  name: String;
  done: Boolean;
  createdAt: Date;
}

export interface Task extends Omit<ITask, "_id">, Document {}

export const TasksModel = model(
  "tasks",
  TaskSchema
);