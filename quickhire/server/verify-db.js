import mongoose from "mongoose";
import dotenv from "dotenv";
import Job from "./src/models/Job.js";

dotenv.config();

async function verifyDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const totalJobs = await Job.countDocuments();
    console.log(`Total jobs in database: ${totalJobs}`);

    const featuredJobs = await Job.find().limit(8);
    console.log(`\nFirst 8 jobs (Featured):`);
    featuredJobs.forEach((job, i) => {
      console.log(`${i + 1}. ${job.title} at ${job.company} - ${job.category}`);
    });

    const businessJobs = await Job.find({ category: "Business" });
    console.log(`\nBusiness category jobs: ${businessJobs.length}`);
    businessJobs.forEach(job => {
      console.log(`- ${job.title} at ${job.company}`);
    });

    await mongoose.connection.close();
    console.log("\nDatabase connection closed");
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

verifyDatabase();
