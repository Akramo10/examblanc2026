import { Task, TasksModel } from "../models/tasks.model";
import { IUser } from "../models/users.model";

const getTasks = async () => {
  return await TasksModel.find({}, {_id: 1, name: 1, done: 1, user: 1});
};

const getTask = async (id: string) => {
  return await TasksModel.findById(id)
};

const createTask = async (taskName: string, user: IUser) => {
  const task: Pick<Task, 'name' | 'user'> = {
    name: taskName,
    user: user
  }
  const newTask = new TasksModel(task);
  return await newTask.save();
};

const updateTask = async (id: string, task: Task) => {
  return await TasksModel.findByIdAndUpdate(id, task, {new: true});
};

const deleteTask = async (id: string) => {
  await TasksModel.findByIdAndDelete(id);
};

export {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
};