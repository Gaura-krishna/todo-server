const express = require("express");
const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  toggleComplete,
  updateStatus,
  updateTodoStatus,
} = require("../controllers/todoController");
const { protect } = require("../middleware/authMiddleware"); // if using auth

const router = express.Router();

router.post("/",protect, createTodo);
router.get("/", protect, getTodos);
router.put("/:id",protect, updateTodo);
router.delete("/:id",protect, deleteTodo);
router.put("/:id/toggle",protect, toggleComplete);
router.put("/:id/status",protect, updateTodoStatus);


module.exports = router;
