import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AxiosInstance from "../apiManager/axiosInstance";
import { toast } from "react-hot-toast";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchedAllUsers = async () => {
    try {
      const response = await AxiosInstance.get("/api/admin/all-users");
      console.log("Fetched users:", response.data);

      if (response.data.success) {
        setUsers(response.data.users);
      } else {
        toast.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchedAllUsers();
  }, []);

  const handleBan = async (id) => {
    if (window.confirm("Are you sure you want to ban this user?")) {
      console.log("Ban user:", id);

      const response = await AxiosInstance.patch(`/api/admin/ban-user`, {
        userId: id,
      });
      console.log(response);

      if (response.data.success) {
        toast.success("User banned successfully");
        fetchedAllUsers();
      } else {
        toast.error("Failed to ban user");
      }
    }
  };

  const calculateJoinDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  console.log("Users:", users);

  return (
    <div className="p-6 max-w-6xl mx-auto h-[calc(100vh-150px)] overflow-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <div className="bg-white rounded-md shadow overflow-x-auto">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">User</th>
              <th className="p-3">Email</th>
              <th className="p-3">Join Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id} className="border-t">
                <td className="p-3 flex items-center gap-2">
                  <div className="bg-gray-200 text-gray-700 font-bold rounded-full w-8 h-8 flex items-center justify-center">
                    {user.name ? user.name[0].toUpperCase() : "?"}
                  </div>
                  {user.name || "N/A"}
                </td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{calculateJoinDate(user.createdAt)}</td>
                <td className="p-3">
                  {/* if user Banned bg will be red */}
                  <span
                    className={`bg-${
                      user.status === "Banned" ? "red" : "green"
                    }-100 text-${
                      user.status === "Banned" ? "red" : "green"
                    }-600 text-xs font-medium px-2 py-1 rounded-full`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-3 space-x-2">
                  <Link
                    to={`/admin/user/${user._id}`}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleBan(user._id)}
                    className="text-red-600 font-medium hover:underline"
                  >
                    Ban User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {/* <div className="flex justify-end items-center p-4 border-t">
          <button className="px-4 py-1 border rounded mr-2">Previous</button>
          <button className="px-4 py-1 border rounded">Next</button>
        </div> */}
      </div>
    </div>
  );
};

export default ManageUsers;
