import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const dummyUsers = [
  {
    _id: 1,
    name: 'azam',
    email: 'render@render.com',
    joinDate: '6/17/2025',
    bookings: 1,
    status: 'active',
  },
  {
    _id: 2,
    name: 'Sudeshna Roy',
    email: 'sudeshna0217@gmail.com',
    joinDate: '5/29/2025',
    bookings: 1,
    status: 'active',
  },
  {
    _id: 3,
    name: 'Supratim Biswas',
    email: '45supratim@gmail.com',
    joinDate: '5/29/2025',
    bookings: 0,
    status: 'active',
  },
  // Add more dummy data or connect to backend later
];

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // TODO: Replace with real API
    setUsers(dummyUsers);
  }, []);

  const handleBan = (id) => {
    if (window.confirm('Are you sure you want to ban this user?')) {
      console.log('Ban user:', id);
      // TODO: API call
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <div className="bg-white rounded-md shadow overflow-x-auto">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">User</th>
              <th className="p-3">Email</th>
              <th className="p-3">Join Date</th>
              <th className="p-3">Bookings</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id} className="border-t">
                <td className="p-3 flex items-center gap-2">
                  <div className="bg-gray-200 text-gray-700 font-bold rounded-full w-8 h-8 flex items-center justify-center">
                    {user.name ? user.name[0].toUpperCase() : '?'}
                  </div>
                  {user.name || 'N/A'}
                </td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.joinDate}</td>
                <td className="p-3">{user.bookings}</td>
                <td className="p-3">
                  <span className="bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded-full">
                    {user.status}
                  </span>
                </td>
                <td className="p-3 space-x-2">
                  <Link to={`/admin/user/${user._id}`} className="text-blue-600 font-medium hover:underline">
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
        <div className="flex justify-end items-center p-4 border-t">
          <button className="px-4 py-1 border rounded mr-2">Previous</button>
          <button className="px-4 py-1 border rounded">Next</button>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
