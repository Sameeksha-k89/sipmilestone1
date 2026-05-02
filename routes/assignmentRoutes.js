const express = require("express");
const router = express.Router();
const Assignment = require("../models/Assignment");
const Submission = require("../models/Submission");

// CREATE assignment
router.post("/", async (req, res) => {
  try {
    const assignment = new Assignment(req.body);
    await assignment.save();
    res.json(assignment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET all assignments
router.get("/", async (req, res) => {
  const assignments = await Assignment.find();
  res.json(assignments);
});

// GET single assignment
router.get("/:id", async (req, res) => {
  const assignment = await Assignment.findById(req.params.id);
  res.json(assignment);
});

// UPDATE assignment
router.put("/:id", async (req, res) => {
  const updated = await Assignment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE assignment
router.delete("/:id", async (req, res) => {
  await Assignment.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});
router.post("/:id/submit", async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    const currentDate=new Date();
    const dueDate=new Date(assignment.dueDate);

    if (new Date() > assignment.dueDate) {
      return res.status(400).json({ message: "Deadline passed" });
    }

    const submission = new Submission({
      assignmentId: assignment._id,
      studentName: req.body.studentName,
      content: req.body.content
    });

    await submission.save();
    res.json(submission);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/:id/submissions", async (req, res) => {
  const submissions = await Submission.find({
    assignmentId: req.params.id
  });
  res.json(submissions);
});
module.exports = router;