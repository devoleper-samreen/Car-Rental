import React, { useEffect, useState } from 'react';

const dummyBookings = [
  {
    _id: 'B001',
    car: 'Toyota Fortuner',
    customer: 'Samreen Malik',
    startDate: '2025-06-28',
    endDate: '2025-07-01',
    amount: 7200,
    status: 'Confirmed',
  },
  {
    _id: 'B002',
    car: 'Maruti Swift',
    customer: 'Azam',
    startDate: '2025-07-02',
    endDate: '2025-07-04',
    amount: 3000,
    status: 'Cancelled',
  },
  {
    _id: 'B003',
    car: 'Honda City',
    customer: 'Mithun',
    startDate: '2025-07-05',
    endDate: '2025-07-07',
    amount: 5000,
    status: 'Confirmed',
  },
];

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // TODO: Replace with real API
    setBookings(dummyBookings);
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
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="border-t">
                <td className="p-3 font-medium">{b._id}</td>
                <td className="p-3">{b.car}</td>
                <td className="p-3">{b.customer}</td>
                <td className="p-3">
                  {new Date(b.startDate).toLocaleDateString()} - {new Date(b.endDate).toLocaleDateString()}
                </td>
                <td className="p-3">₹{b.amount}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      b.status === 'Confirmed'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination (optional) */}
        <div className="flex justify-end items-center p-4 border-t">
          <button className="px-4 py-1 border rounded mr-2">Previous</button>
          <button className="px-4 py-1 border rounded">Next</button>
        </div>
      </div>
    </div>
  );
};

export default ManageBookings;
