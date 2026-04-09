import * as TasksService from "../services/tasks.service";

export const getTasks = async (req: any, res: any) => {
  const tasks = await TasksService.getTasks();
  return res.status(200).json(tasks);
};

export const getTask = async (req: any, res: any) => {
  const { id } = req.params;
  const task = await TasksService.getTask(id);
  return res.status(200).json(task);
};

export const createTask = async (req: any, res: any) => {
  const { name, user } = req.body;
  const task = await TasksService.createTask(name, user);
  return res.status(201).json(task);
};

export const updateTask = async (req: any, res: any) => {
  const { id } = req.params;
  const task = await TasksService.updateTask(id, req.body);
  return res.status(200).json(task);
};

export const deleteTask = async (req: any, res: any) => {
  const { id } = req.params;
  await TasksService.deleteTask(id);
  return res.status(204).json("Task deleted");
};