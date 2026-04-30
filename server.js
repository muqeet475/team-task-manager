const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(express.static("public"));

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("DB Error:", err));

// ✅ Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/project", require("./routes/project"));
app.use("/api/task", require("./routes/task"));

// ✅ Serve frontend (IMPORTANT)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ Start server (FIXED)
const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`);
});