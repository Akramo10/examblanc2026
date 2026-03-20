import express from "express";
import {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
} from "../controllers/tasks.controller";

const router = express.Router();

router.get("/", getTasks);

router.get("/:id", getTask);

router.post("/", createTask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

export { router };