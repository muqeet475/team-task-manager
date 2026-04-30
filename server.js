const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.error("DB Error:", err));

// ✅ Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/project", require("./routes/project"));
app.use("/api/task", require("./routes/task"));

// ✅ Root route (serve frontend)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ Health route (VERY IMPORTANT for Railway)
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// ✅ Start server (FIXED)
const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`);
});

// ✅ Keep container alive (IMPORTANT)
setInterval(() => {
  console.log("Server alive...");
}, 30000);