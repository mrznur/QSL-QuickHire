import express from "express";
import Application from "../models/Application.js";
import Job from "../models/Job.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { jobId, name, email, resumeLink, coverNote } = req.body;

    if (!jobId || !name || !email || !resumeLink) {
      return res.status(400).json({
        message: "jobId, name, email, resumeLink are required",
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const application = await Application.create({
      jobId,
      name,
      email,
      resumeLink,
      coverNote,
    });

    res.status(201).json(application);
  } catch (err) {
    console.error("Application creation error:", err);
    res.status(400).json({
      message: "Invalid application data",
      error: err.message,
      details: err.errors ? Object.keys(err.errors).map(key => ({
        field: key,
        message: err.errors[key].message
      })) : undefined
    });
  }
});

/* GET all applications (admin only) */
router.get("/", adminAuth, async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("jobId")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (err) {
    res.status(500).json({ 
      message: "Failed to fetch applications",
      error: err.message 
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

    res.json({ message: "Application deleted" });
  } catch (err) {
    res.status(400).json({ 
      message: "Invalid application id",
      error: err.message 
    });
  }
});

export default router;
