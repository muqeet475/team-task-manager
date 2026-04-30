const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: String,
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending"
  },
  assignedTo: String,
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  }
});

module.exports = mongoose.model("Task", TaskSchema);