import { useEffect, useState } from "react";
import axiosInstance from "../apiManager/axiosInstance";
import { toast } from "react-hot-toast";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchAllBookings = async () => {
    try {
      const response = await axiosInstance.get("/api/admin/all-bookings");
      console.log("Fetched bookings:", response.data);

      if (response.data.success) {
        setBookings(response.data.bookings);
      } else {
        toast.error("Failed to fetch bookings");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to fetch bookings");
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    //TODO: Implement status change logic
  };

  useEffect(() => {
    fetchAllBookings();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto h-[calc(100vh-150px)] overflow-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Bookings</h2>

      <div className="bg-white rounded-md shadow overflow-x-auto">
        <table className="min-w-full text-sm table-auto">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Booking ID</th>
              <th className="p-3">Car</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Dates</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="border-t">
                <td className="p-3">
                  {/*want to show half booking id*/}
                  {b._id.slice(0, 4)}...{b._id.slice(-3)}
                </td>
                <td className="p-3">{b.carId.name}</td>
                <td className="p-3">{b.userId.name}</td>
                <td className="p-3">
                  {new Date(b.pickupDate).toLocaleDateString()} -{" "}
                  {new Date(b.dropoffDate).toLocaleDateString()}
                </td>
                <td className="p-3">₹{b.totalAmount}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      b.status === "Confirmed"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="p-3">
                  {/* want a dropdown to change status */}
                  <span className="inline-flex items-center">
                    <select
                      value={b.status}
                      onChange={(e) => {
                        // Handle status change logic here
                        console.log("Status changed to:", e.target.value);
                      }}
                      className="border rounded px-2 py-1 text-sm"
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination (optional) */}
        {/* <div className="flex justify-end items-center p-4 border-t">
          <button className="px-4 py-1 border rounded mr-2">Previous</button>
          <button className="px-4 py-1 border rounded">Next</button>
        </div> */}
      </div>
    </div>
  );
};

export default ManageBookings;
