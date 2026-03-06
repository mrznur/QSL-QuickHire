import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
      socketTimeoutMS: 30000,
      heartbeatFrequencyMS: 10000,
      maxPoolSize: 10,
    });
    console.log("MongoDB connected");

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected — will auto-reconnect");
    });
    mongoose.connection.on("reconnected", () => {
      console.log("MongoDB reconnected");
    });
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err.message);
    });
  } catch (error) {
    console.error("DB connection error:", error.message);
  }
};

export default connectDB;
