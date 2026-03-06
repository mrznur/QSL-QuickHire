import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import jobsRoutes from "./routes/jobs.js";
import applicationsRoutes from "./routes/applications.js";

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-admin-key'],
  credentials: false
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "QuickHire API running" });
});

app.use("/api/jobs", jobsRoutes);
app.use("/api/applications", applicationsRoutes);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;