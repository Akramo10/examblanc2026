import express from "express";
import {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/users.controller";

const usersRouter = express.Router();

usersRouter.get("/", getUsers);

usersRouter.get("/:id", getUser);

usersRouter.post("/", createUser);

usersRouter.put("/:id", updateUser);

usersRouter.delete("/:id", deleteUser);

export { usersRouter };