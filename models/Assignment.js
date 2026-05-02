const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  description: String,
  dueDate: { type: Date, required: true },
  status: { type: String, default: "active" }
}, { timestamps: true });

module.exports = mongoose.model("Assignment", assignmentSchema);