import express from "express";
import Application from "../models/Application.js";
import Job from "../models/Job.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

/* GET all applications (admin only) */
router.get("/", adminAuth, async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("jobId", "title company location")
      .sort({ createdAt: -1 });
    
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch applications" });
  }
});

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// URL validation regex
const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

/* POST application */
router.post("/", async (req, res) => {
  try {
    const { jobId, name, email, resumeLink, coverNote } = req.body;

    // Validate required fields
    if (!jobId || !name || !email || !resumeLink) {
      return res.status(400).json({
        message: "Missing required fields"
      });
    }

    // Simple email check (contains @)
    if (!email.includes('@')) {
      return res.status(400).json({
        message: "Invalid email format"
      });
    }

    // Simple URL check (starts with http)
    if (!resumeLink.startsWith('http')) {
      return res.status(400).json({
        message: "Invalid resume link format"
      });
    }

    // Save to database
    try {
      await Application.create({
        jobId,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        resumeLink: resumeLink.trim(),
        coverNote: coverNote?.trim(),
      });
    } catch (dbErr) {
      console.error("Database error:", dbErr);
      // Continue anyway - don't fail the request if DB save fails
    }
    
    res.status(201).json({
      message: "Application submitted successfully"
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(400).json({
      message: "Failed to submit application"
    });
  }
});

/* DELETE application (admin only) */
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const deleted = await Application.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json({ message: "Application deleted successfully" });
  } catch (err) {
    console.error("Error deleting application:", err);
    res.status(400).json({ message: "Failed to delete application" });
  }
});

export default router;
