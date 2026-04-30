const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  members: [String]   // emails of users
});

module.exports = mongoose.model("Project", ProjectSchema);