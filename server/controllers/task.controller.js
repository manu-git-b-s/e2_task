import { TaskModel } from "../models/task.model.js";

export async function getAllTasks(req, res) {
  try {
    const allTasks = await TaskModel.find();
    res.json({
      success: true,
      msg: "All Task details fetched successfully!",
      data: allTasks,
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, msg: "Something Went Wrong" });
  }
}

export async function createTask(req, res) {
  const { title, priority, isCompleted } = req.body;
  try {
    const newTask = await TaskModel.create({ title, priority, isCompleted });
    newTask.save();
    res.json({
      success: true,
      msg: "Task created successfully",
      data: newTask,
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, msg: "Something Went Wrong" });
  }
}

export async function deleteTask(req, res) {
  const { taskId } = req.params;
  try {
    const deletedTask = await TaskModel.deleteOne({ _id: taskId });
    res.json({
      success: true,
      msg: "Task deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, msg: "Something Went Wrong" });
  }
}

export async function editTask(req, res) {
  try {
    const { taskId } = req.params;
    const { title, priority, isCompleted } = req.body;

    const task = await TaskModel.findByIdAndUpdate(taskId, { title, priority, isCompleted }, { new: true });

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.json({ success: true, data: task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}
