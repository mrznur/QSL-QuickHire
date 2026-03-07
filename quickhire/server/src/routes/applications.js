import express from "express";
import Application from "../models/Application.js";
import Job from "../models/Job.js";

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
    res.status(400).json({
      message: "Invalid application data",
      error: err.message,
    });
  }
});

export default router;
