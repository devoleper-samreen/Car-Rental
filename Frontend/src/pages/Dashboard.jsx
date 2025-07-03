import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import AxiosInstance from "../apiManager/axiosInstance";

function Dashboard() {
  const [revenueData, setRevenueData] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCars: 0,
    activeBookings: 0,
    monthlyRevenue: 0,
    changePercent: {
      users: 0,
      cars: 0,
      bookings: 0,
      revenue: 0,
    },
  });

  const fetchBookings = async () => {
    try {
      const response = await AxiosInstance.get("/api/admin/all-bookings");
      console.log("Recent Bookings Response:", response.data);
      if (response.data.success) {
        setRecentBookings(response.data.bookings);
      }
    } catch (error) {
      console.error("Failed to load recent bookings", error);
    }
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await AxiosInstance.get("/api/admin/dashboard-stats");
        console.log("Dashboard Stats Response:", response.data);

        if (response.data.success) {
          setStats(response.data.stats);
        }
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      }
    };

    const fetchRevenue = async () => {
      try {
        const res = await AxiosInstance.get("/api/admin/revenue-trends");
        console.log("Revenue Trends Response:", res.data);
        if (res.data.success) {
          setRevenueData(res.data.data);
        }
      } catch (err) {
        console.error("Failed to load revenue data", err);
      }
    };

    fetchStats();
    fetchRevenue();
    fetchBookings();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto h-[calc(100vh-150px)] overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Dashboard Overview</h2>
        <span className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </span>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow flex items-center gap-4">
          <div className="text-2xl p-2 rounded-full bg-blue-100 text-blue-600">
            👥
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Users</p>
            <h4 className="text-xl font-bold">{stats.totalUsers}</h4>
            <p
              className={`text-xs ${
                stats.changePercent?.users >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {stats.changePercent?.users >= 0 ? "+" : ""}
              {stats.changePercent?.users}%
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow flex items-center gap-4">
          <div className="text-2xl p-2 rounded-full bg-purple-100 text-purple-600">
            🚗
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Cars</p>
            <h4 className="text-xl font-bold">{stats.totalCars}</h4>
            <p
              className={`text-xs ${
                stats.changePercent?.cars >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {stats.changePercent?.cars >= 0 ? "+" : ""}
              {stats.changePercent?.cars}%
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow flex items-center gap-4">
          <div className="text-2xl p-2 rounded-full bg-green-100 text-green-600">
            📅
          </div>
          <div>
            <p className="text-sm text-gray-600">Active Bookings</p>
            <h4 className="text-xl font-bold">{stats.activeBookings}</h4>
            <p
              className={`text-xs ${
                stats.changePercent.bookings >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {stats.changePercent.bookings >= 0 ? "+" : ""}
              {stats.changePercent.bookings}%
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow flex items-center gap-4">
          <div className="text-2xl p-2 rounded-full bg-indigo-100 text-indigo-600">
            📈
          </div>
          <div>
            <p className="text-sm text-gray-600">Monthly Revenue</p>
            <h4 className="text-xl font-bold">₹{stats.monthlyRevenue}</h4>
            <p
              className={`text-xs ${
                stats.changePercent.revenue >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {stats.changePercent.revenue >= 0 ? "+" : ""}
              {stats.changePercent.revenue}%
            </p>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-lg font-semibold mb-4">Revenue Trends</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={revenueData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#6366F1"
              strokeWidth={2}
              fillOpacity={0.2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm table-auto">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2">Customer</th>
                <th className="p-2">Car</th>
                <th className="p-2">Price</th>
                <th className="p-2">Status</th>
                <th className="p-2">Dates</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings?.map((b, i) => (
                <tr key={i} className="border-t">
                  <td className="p-2">{b.userId?.name}</td>
                  <td className="p-2">{b.carId?.name}</td>
                  <td className="p-2">{b.totalAmount}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        b.status === "confirmed"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="p-2">
                    {new Date(b.pickupDate).toLocaleDateString()} -{" "}
                    {new Date(b.dropoffDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
