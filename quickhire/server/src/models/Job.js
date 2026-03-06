import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
      minlength: [3, "Job title must be at least 3 characters long"],
    },

    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },

    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: ["Development", "Design", "Marketing", "Sales", "Finance", "Operations"],
        message: "{VALUE} is not a valid category"
      }
    },

    jobType: {
      type: String,
      required: [true, "Job type is required"],
      enum: {
        values: ["Full-time", "Part-time", "Remote", "Internship", "Contract"],
        message: "{VALUE} is not a valid job type"
      }
    },

    salaryRange: { 
      type: String,
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Job description is required"],
      trim: true,
      minlength: [10, "Job description must be at least 10 characters long"],
    },
  },
  {
    timestamps: true,
  },
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
