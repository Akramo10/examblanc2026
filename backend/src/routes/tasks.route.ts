import express from "express";
import {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
} from "../controllers/tasks.controller";

const tasksRouter = express.Router();

tasksRouter.get("/", getTasks);

tasksRouter.get("/:id", getTask);

tasksRouter.post("/", createTask);

tasksRouter.put("/:id", updateTask);

tasksRouter.delete("/:id", deleteTask);

export { tasksRouter };