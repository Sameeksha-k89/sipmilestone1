const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment"
  },
  studentName: String,
  content: String,
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Submission", submissionSchema);