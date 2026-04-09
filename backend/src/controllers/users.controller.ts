import * as UsersService from "../services/users.service";

export const getUsers = async (req: any, res: any) => {
  const users = await UsersService.getUsers();
  return res.status(200).json(users);
};

export const getUser = async (req: any, res: any) => {
  const { id } = req.params;
  const user = await UsersService.getUser(id);
  return res.status(200).json(user);
};

export const createUser = async (req: any, res: any) => {
  const user = await UsersService.createUser(req.body);
  return res.status(201).json(user);
};

export const updateUser = async (req: any, res: any) => {
  const { id } = req.params;
  const user = await UsersService.updateUser(id, req.body);
  return res.status(200).json(user);
};

export const deleteUser = async (req: any, res: any) => {
  const { id } = req.params;
  await UsersService.deleteUser(id);
  return res.status(204).json("User deleted");
};