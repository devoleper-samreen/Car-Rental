import {
  FaTachometerAlt,
  FaCar,
  FaCalendarAlt,
  FaUsers,
  FaChartPie,
  FaCog,
  FaPlus,
} from "react-icons/fa";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLogout } from "../features/auth/authSlice";

function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(adminLogout());
    navigate("/admin/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-indigo-700 to-indigo-900 text-white">
        <div className="p-4 text-2xl font-bold">CarsNow Admin</div>
        <nav className="mt-4">
          <ul className="space-y-2">
            <li
              onClick={() => navigate("/admin/dashboard")}
              className={`flex items-center px-4 py-3 cursor-pointer ${
                isActive("/admin/dashboard/dashboard")
                  ? "bg-indigo-600"
                  : "hover:bg-indigo-600"
              }`}
            >
              <FaTachometerAlt className="mr-3" /> Dashboard
            </li>
            <li
              onClick={() => navigate("/admin/dashboard/manage-cars")}
              className={`flex items-center px-4 py-3 cursor-pointer ${
                isActive("/admin/dashboard/manage-cars")
                  ? "bg-indigo-600"
                  : "hover:bg-indigo-600"
              }`}
            >
              <FaCar className="mr-3" /> Manage Cars
            </li>
            <li
              onClick={() => navigate("/admin/dashboard/manage-bookings")}
              className={`flex items-center px-4 py-3 cursor-pointer ${
                isActive("/admin/dashboard/manage-bookings")
                  ? "bg-indigo-600"
                  : "hover:bg-indigo-600"
              }`}
            >
              <FaCalendarAlt className="mr-3" /> Manage Bookings
            </li>
            <li
              onClick={() => navigate("/admin/dashboard/manage-users")}
              className={`flex items-center px-4 py-3 cursor-pointer ${
                isActive("/admin/dashboard/manage-users")
                  ? "bg-indigo-600"
                  : "hover:bg-indigo-600"
              }`}
            >
              <FaUsers className="mr-3" /> Manage Users
            </li>

            <li
              onClick={() => navigate("/admin/dashboard/setting")}
              className={`flex items-center px-4 py-3 cursor-pointer ${
                isActive("/admin/dashboard/setting")
                  ? "bg-indigo-600"
                  : "hover:bg-indigo-600"
              }`}
            >
              <FaCog className="mr-3" /> Settings
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 mt-20 bg-[#E5E7EB]">
        <Outlet />
      </main>

      {/* Top bar */}
      <div className="absolute top-4 right-4 flex items-center gap-4">
        <div className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md">
          <span className="font-medium">Admin User</span>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;
