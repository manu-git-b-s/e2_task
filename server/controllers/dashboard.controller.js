import { TaskModel } from "../models/task.model.js";

export const getDashboardStats = async (req, res) => {
  try {
    const completedCount = await TaskModel.countDocuments({ isCompleted: true });
    const pendingCount = await TaskModel.countDocuments({ isCompleted: false });
    const totalCount = completedCount + pendingCount;

    const pieData = [
      { name: "Completed", value: completedCount },
      { name: "Pending", value: pendingCount },
    ];

    res.status(200).json({
      success: true,
      data: {
        completedCount,
        pendingCount,
        totalCount,
        pieData,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats",
    });
  }
};

export const getCalendarTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find().sort({ createdAt: 1 });

    const events = tasks.map((task) => ({
      id: task._id,
      title: `${task.title}`,
      start: new Date(task.createdAt),
      end: new Date(task.createdAt),
      allDay: true,
      isCompleted: task.isCompleted,
    }));

    res.status(200).json({ success: true, data: events });
  } catch (error) {
    console.error("Error fetching calendar tasks:", error);
    res.status(500).json({ success: false, message: "Failed to fetch calendar tasks" });
  }
};
