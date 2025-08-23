const Todo = require("../models/todoSchema");

// Valid statuses
const validStatuses = ["Not Started", "Pending", "In Progress", "Completed"];

// Create Todo
exports.createTodo = async (req, res) => {
  try {
    const { title, description, dueDate, currentStatus } = req.body;

    const status = validStatuses.includes(currentStatus)
      ? currentStatus
      : "NotStarted";

    const todo = await Todo.create({
      title,
      description,
      dueDate,
      currentStatus: status,
      user: req.user.id,
    });

    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get User Todos
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Todo 
exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!todo) return res.status(404).json({ error: "Todo not found" });

    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Todo
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!todo) return res.status(404).json({ error: "Todo not found" });

    res.json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Toggle Todo for complete and incomplete
exports.toggleComplete = async (req, res) => {
  try {
    const { isCompleted } = req.body;

    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      {
        isCompleted,
        currentStatus: isCompleted ? "Completed" : "InProgress",
      },
      { new: true, runValidators: true }
    );

    if (!todo) return res.status(404).json({ error: "Todo not found" });

    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Todo Status
exports.updateTodoStatus = async (req, res) => {
  try {
    const { currentStatus } = req.body;

    if (!validStatuses.includes(currentStatus)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { currentStatus },
      { new: true, runValidators: true }
    );

    if (!todo) return res.status(404).json({ error: "Todo not found" });

    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
