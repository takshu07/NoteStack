import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const mongoDbUrl = process.env.MONGODB_URL;

    if (!mongoDbUrl) {
      throw new Error("MONGO_URL not defined in environment variables");
    }

    await mongoose.connect(mongoDbUrl);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
