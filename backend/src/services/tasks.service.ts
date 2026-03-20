import { Task, TasksModel } from "../models/tasks.model";

const getTasks = async () => {
  return await TasksModel.find();
};

const getTask = async (id: string) => {
  return await TasksModel.findById(id)
};

const createTask = async (task: Task) => {
  const newTask = new TasksModel(task);
  return await newTask.save();
};

const updateTask = async (id: string, task: Task) => {
  return await TasksModel.findByIdAndUpdate(id, task);
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