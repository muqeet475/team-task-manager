const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.error("DB Error:", err));

// 🔥 SAFE ROUTE LOADING (IMPORTANT)
try {
  app.use("/api/auth", require("./routes/auth"));
  console.log("Auth route loaded");
} catch (e) {
  console.error("Auth route error:", e.message);
}

try {
  app.use("/api/project", require("./routes/project"));
  console.log("Project route loaded");
} catch (e) {
  console.error("Project route error:", e.message);
}

try {
  app.use("/api/task", require("./routes/task"));
  console.log("Task route loaded");
} catch (e) {
  console.error("Task route error:", e.message);
}

// Root
app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

// Health
app.get("/health", (req, res) => {
  res.send("OK");
});

// Start server
const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`);
});