const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

// ✅ Create Task
router.post("/create", auth, async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();

    res.json({ message: "Task created", task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get all tasks
router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// ✅ Update task status
router.put("/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json({ message: "Task updated", task });
});

// ✅ Dashboard (real data)
router.get("/dashboard", async (req, res) => {
  try {
    const tasks = await Task.find();

    const total = tasks.length;
    const pending = tasks.filter(t => t.status === "pending").length;
    const inProgress = tasks.filter(t => t.status === "in-progress").length;
    const completed = tasks.filter(t => t.status === "completed").length;

    res.json({
      total,
      pending,
      inProgress,
      completed,
      tasks
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;