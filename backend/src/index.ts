import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { tasksRouter } from "./routes/tasks.route";
import { usersRouter } from "./routes/users.route";

const hostname = "127.0.0.1";
const port = 5000;

mongoose.connect(
  `mongodb://localhost:27017/todo_list`
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello !");
});

app.use("/tasks", tasksRouter);
app.use("/users", usersRouter);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
