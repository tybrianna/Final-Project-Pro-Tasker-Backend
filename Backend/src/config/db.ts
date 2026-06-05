import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI is not set in environment variables");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Error:", error);
    console.error("Check: 1) MONGO_URI env var is set  2) MongoDB Atlas IP whitelist includes 0.0.0.0/0");
    process.exit(1);
  }
};

export default connectDB;