const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect("mongodb://todo:todo@localhost:27017/todoapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a Mongoose schema for Todo items
const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Create a new todo item
app.post("/todos", async (req, res) => {
  try {
    const { task, completed } = req.body;
    const todo = new Todo({
      task,
      completed,
    });

    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all todo items
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /todos/:id - Delete a todo by ID
app.delete("/todos/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await Todo.deleteOne({ _id: id });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Todo deleted successfully" });
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/todos/:id", async (req, res) => {
  const id = req.params.id;
  const task = req.body.task; // New task value from the request body
  const completed = req.body.completed; // New task value from the request body

  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id },
      { $set: { task, completed } },
      { new: true }, // Return the updated document
    );

    if (updatedTodo) {
      res.status(200).json(updatedTodo);
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    console.error("Error updating todo task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
