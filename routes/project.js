const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const auth = require("../middleware/authMiddleware");

// ✅ Create project (save in DB)
router.post("/create", auth, async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();

    res.json({
      message: "Project created",
      project
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;