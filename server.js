const express = require("express");
const mongoose = require("mongoose");

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(express.static("public"));

// ✅ MongoDB connection (UPDATED)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("DB Error:", err));

// ✅ Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/project", require("./routes/project"));
app.use("/api/task", require("./routes/task"));

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));