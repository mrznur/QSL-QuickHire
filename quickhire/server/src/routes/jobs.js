import express from "express";
import Job from "../models/Job.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

/* GET all jobs */
router.get("/", async (req, res) => {
  try {
    const { search, category, location } = req.query;

    const filter = {};

    if (category) filter.category = category;
    if (location) filter.location = { $regex: location, $options: "i" };

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
    }

    const jobs = await Job.find(filter).sort({ createdAt: 1 });

    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
});

/* GET job by id */
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (err) {
    res.status(400).json({ message: "Invalid job id" });
  }
});

/* POST job (admin) */
router.post("/", adminAuth, async (req, res) => {
  try {
    const job = await Job.create(req.body);

    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({
      message: "Invalid job data",
      error: err.message,
    });
  }
});

/* DELETE job (admin) */
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const deleted = await Job.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({ message: "Job deleted" });
  } catch (err) {
    res.status(400).json({ message: "Invalid job id" });
  }
});

export default router;
