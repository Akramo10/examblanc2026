import { User, UsersModel } from "../models/users.model";

const getUsers = async () => {
  return await UsersModel.find({});
};

const getUser = async (id: string) => {
  return await UsersModel.findById(id)
};

const createUser = async (user: User) => {
  const newUser = new UsersModel(user);
  return await newUser.save();
};

const updateUser = async (id: string, user: User) => {
  return await UsersModel.findByIdAndUpdate(id, user, {new: true});
};

const deleteUser = async (id: string) => {
  await UsersModel.findByIdAndDelete(id);
};

export {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};