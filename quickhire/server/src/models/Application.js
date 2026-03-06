import mongoose from "mongoose";

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// URL validation regex (fixed ReDoS vulnerability)
const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([/?#][^\s]*)?$/i;

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: function(v) {
          return emailRegex.test(v);
        },
        message: props => `${props.value} is not a valid email address`
      }
    },

    resumeLink: {
      type: String,
      required: [true, "Resume link is required"],
      trim: true,
      validate: {
        validator: function(v) {
          return urlRegex.test(v);
        },
        message: props => `${props.value} is not a valid URL`
      }
    },

    coverNote: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;
