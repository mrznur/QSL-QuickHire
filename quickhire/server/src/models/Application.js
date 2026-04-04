import mongoose from "mongoose";

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
          return v && v.includes('@');
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
          return v && (v.startsWith('http://') || v.startsWith('https://'));
        },
        message: props => `${props.value} is not a valid URL (must start with http:// or https://)`
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
