import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/e2_info_systems");
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
  }
};
