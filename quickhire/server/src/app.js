import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import jobsRoutes from "./routes/jobs.js";
import applicationsRoutes from "./routes/applications.js";

dotenv.config();

const app = express();

// MongoDB connection for serverless
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb && mongoose.connection.readyState === 1) {
    return cachedDb;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    cachedDb = mongoose.connection;
    console.log("MongoDB connected");
    return cachedDb;
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
}

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-admin-key'],
  credentials: false
}));
app.use(express.json());

// Middleware to ensure DB connection for API routes
app.use('/api', async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    res.status(503).json({ 
      message: "Database connection failed",
      error: error.message 
    });
  }
});

app.get("/", (_req, res) => {
  res.json({ message: "QuickHire API running" });
});

app.get("/health", async (_req, res) => {
  try {
    await connectToDatabase();
    const dbState = mongoose.connection.readyState;
    const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
    
    res.json({ 
      status: "ok",
      database: states[dbState] || 'unknown',
      dbState: dbState,
      mongoUri: process.env.MONGO_URI ? 'set' : 'missing'
    });
  } catch (error) {
    res.status(500).json({ 
      status: "error",
      message: error.message 
    });
  }
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