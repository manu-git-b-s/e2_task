import { useEffect, useState } from "react";
import { CheckCircle, Clock, ListTodo } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import axios from "axios";
import TaskCalendar from "../components/task-calendar";

const COLORS = ["#22c55e", "#ef4444"];

export default function Dashboard() {
  const [stats, setStats] = useState([]);
  const [pieData, setPieData] = useState([]);

  const fetchStats = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/dashboard/stats");
      if (response?.data?.success) {
        const { completedCount, pendingCount, totalCount, pieData } = response.data.data;

        setStats([
          {
            id: 1,
            label: "Completed",
            value: completedCount,
            icon: CheckCircle,
            color: "bg-green-500",
          },
          {
            id: 2,
            label: "Pending",
            value: pendingCount,
            icon: Clock,
            color: "bg-red-500",
          },
          {
            id: 3,
            label: "Total Tasks",
            value: totalCount,
            icon: ListTodo,
            color: "bg-yellow-500",
          },
        ]);

        setPieData(pieData);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen text-yellow-400 p-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-gray-900 rounded-2xl shadow-lg p-6 flex items-center gap-4 hover:scale-105 transition-transform"
          >
            <div className={`p-3 rounded-full ${stat.color}`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">{stat.label}</p>
              <p className="text-2xl font-bold text-yellow-300">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-900 rounded-2xl shadow-lg p-6 flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4">Task Overview</h2>
        <PieChart width={400} height={300}>
          <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#facc15" label>
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      <div className="bg-gray-900 rounded-2xl shadow-lg p-6">
        <div className=" rounded-xl overflow-hidden h-[600px]">
          <TaskCalendar />
        </div>
      </div>
    </div>
  );
}
