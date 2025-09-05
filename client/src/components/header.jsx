import { LogOutIcon } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="h-16 p-4 bg-amber-200 flex items-center justify-between">
      <span className="text-3xl font-bold">Task Manager</span>

      <div className="flex gap-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg font-semibold  ${isActive ? "bg-black text-white" : "text-black"}`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/all-tasks"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg font-semibold  ${isActive ? "bg-black text-white" : "text-black"}`
          }
        >
          All Tasks
        </NavLink>
      </div>

      <button
        onClick={handleLogout}
        className="bg-black text-white px-4 py-1 rounded-lg hover:bg-gray-900 transition duration-300 flex gap-2"
      >
        <LogOutIcon />
        Logout
      </button>
    </nav>
  );
};

export default Header;
