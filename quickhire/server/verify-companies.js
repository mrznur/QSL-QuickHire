import mongoose from "mongoose";
import dotenv from "dotenv";
import Job from "./src/models/Job.js";

dotenv.config();

async function verifyCompanies() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB\n");

    const first16 = await Job.find().limit(16);
    
    console.log("First 16 jobs (should have logos):");
    first16.forEach((job, i) => {
      console.log(`${i + 1}. ${job.title} at ${job.company}`);
    });

    await mongoose.connection.close();
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

verifyCompanies();
