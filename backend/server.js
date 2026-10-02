require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB when configured. Without a URI, use a small in-memory
// store so the app can run locally without an Atlas account.
const useMongo = Boolean(process.env.MONGODB_URI);
const memoryTasks = [];
if (useMongo) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => {
      console.error("MongoDB connection error:", err.message);
      process.exit(1);
    });
} else {
  console.log("MONGODB_URI not set; using in-memory task storage");
}

// ---- Model ----
const Task = mongoose.model(
  "Task",
  new mongoose.Schema(
    { text: { type: String, required: true, trim: true, maxlength: 200 } },
    { timestamps: true }
  )
);

// ---- Routes ----
app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "To-Do API is running", routes: ["GET /tasks", "POST /add"] });
});

// POST /add -> add a new task
app.post("/add", async (req, res) => {
  try {
    const text = (req.body.text || "").trim();
    if (!text) return res.status(400).json({ error: "Task text is required" });

    const newTask = useMongo
      ? await new Task({ text }).save()
      : { _id: `${Date.now()}-${Math.random()}`, text, createdAt: new Date() };
    if (!useMongo) memoryTasks.push(newTask);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: "Failed to add task" });
  }
});

// GET /tasks -> get all tasks (oldest first)
app.get("/tasks", async (req, res) => {
  try {
    const tasks = useMongo
      ? await Task.find().sort({ createdAt: 1 })
      : memoryTasks;
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
