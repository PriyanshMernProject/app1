import express from "express";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../Controllers/ToDo.js";

const router = express.Router();

router.post("/create", createTodo);

router.get("/", getTodos);

router.put("/:todoId", updateTodo);

router.delete("/:todoId", deleteTodo);

export default router;
