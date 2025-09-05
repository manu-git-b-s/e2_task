import { Pencil, Trash, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api/axios";

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState({});
  const [editState, setEditState] = useState({ title: "", priority: "medium" });

  const [showAddModal, setShowAddModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    priority: "medium",
    isCompleted: false,
  });

  const fetchTasks = async () => {
    try {
      const response = await api.get("/task/get-all-tasks");
      if (response?.data?.success) {
        setTasks(response.data.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch tasks");
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const response = await api.delete(`/task/delete-task/${taskId}`);
      if (response?.data?.success) {
        toast.success("Task deleted");
        fetchTasks();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete task");
    }
  };

  const handleMarkComplete = async (taskId) => {
    try {
      const task = tasks.find((t) => t._id === taskId);
      if (!task || task.isCompleted) return;

      const response = await api.post(`/task/edit-task/${taskId}`, {
        title: task.title,
        priority: task.priority,
        isCompleted: true,
      });

      if (response?.data?.success) {
        toast.success("Task marked as complete");
        fetchTasks();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to mark task as complete");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`http://localhost:3000/api/task/edit-task/${editTask._id}`, {
        title: editState.title,
        priority: editState.priority,
        isCompleted: editTask.isCompleted,
      });
      if (response?.data?.success) {
        toast.success("Task updated successfully");
        setShowModal(false);
        fetchTasks();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update task");
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/task/create-task`, newTask);
      if (response?.data?.success) {
        toast.success("Task created successfully");
        setShowAddModal(false);
        setNewTask({ title: "", priority: "medium", isCompleted: false });
        fetchTasks();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create task");
    }
  };

  const handleEditClick = (task) => {
    setEditTask(task);
    setEditState({ title: task.title, priority: task.priority });
    setShowModal(true);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">All Tasks</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-amber-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-amber-500 transition"
        >
          + Add Task
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg text-left">
          <thead className="bg-amber-200">
            <tr>
              <th className="py-3 px-4 border-b border-gray-300">Title</th>
              <th className="py-3 px-4 border-b border-gray-300">Priority</th>
              <th className="py-3 px-4 border-b border-gray-300">Status</th>
              <th className="py-3 px-4 border-b border-gray-300">Actions</th>
              <th className="py-3 px-4 border-b border-gray-300">Date</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => {
              const taskDate = new Date(task.createdAt).toLocaleDateString("en-GB");
              const todayDate = new Date().toLocaleDateString("en-GB");

              return (
                <tr
                  key={task._id}
                  className={`border-b ${
                    taskDate === todayDate ? "bg-red-200" : "bg-white"
                  } hover:bg-gray-100 transition`}
                >
                  <td className="py-3 px-4">{task.title}</td>
                  <td className="py-3 px-4 capitalize">{task.priority}</td>
                  <td className="py-3 px-4">{task.isCompleted ? "Completed" : "Yet to complete"}</td>
                  <td className="py-3 px-4 flex gap-3">
                    <Pencil className="cursor-pointer text-blue-600" onClick={() => handleEditClick(task)} />
                    <Trash className="cursor-pointer text-red-600" onClick={() => handleDelete(task._id)} />
                    {!task.isCompleted && (
                      <button
                        onClick={() => handleMarkComplete(task._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition"
                      >
                        Mark as Complete
                      </button>
                    )}
                  </td>
                  <td className="py-3 px-4">{taskDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <form
            onSubmit={handleEditSubmit}
            className="bg-white p-6 rounded-xl w-full max-w-md flex flex-col gap-4 relative shadow-lg"
          >
            <X className="absolute top-4 right-4 cursor-pointer" size={24} onClick={() => setShowModal(false)} />
            <h2 className="text-2xl font-bold mb-2">Edit Task</h2>

            <label className="font-semibold">Task Title</label>
            <input
              type="text"
              value={editState.title}
              onChange={(e) => setEditState((prev) => ({ ...prev, title: e.target.value }))}
              className="border p-2 rounded-lg w-full"
              required
            />

            <label className="font-semibold">Priority</label>
            <select
              value={editState.priority}
              onChange={(e) => setEditState((prev) => ({ ...prev, priority: e.target.value }))}
              className="border p-2 rounded-lg w-full"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <button
              type="submit"
              className="bg-amber-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-amber-500 transition"
            >
              Update Task
            </button>
          </form>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <form
            onSubmit={handleAddSubmit}
            className="bg-white p-6 rounded-xl w-full max-w-md flex flex-col gap-4 relative shadow-lg"
          >
            <X className="absolute top-4 right-4 cursor-pointer" size={24} onClick={() => setShowAddModal(false)} />
            <h2 className="text-2xl font-bold mb-2">Add Task</h2>

            <label className="font-semibold">Task Title</label>
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask((prev) => ({ ...prev, title: e.target.value }))}
              className="border p-2 rounded-lg w-full"
              required
            />

            <label className="font-semibold">Priority</label>
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask((prev) => ({ ...prev, priority: e.target.value }))}
              className="border p-2 rounded-lg w-full"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <button
              type="submit"
              className="bg-amber-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-amber-500 transition"
            >
              Add Task
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AllTasks;
