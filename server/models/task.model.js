import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    priority: { type: String, required: true },
    isCompleted: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export const TaskModel = mongoose.model("Task", taskSchema);
