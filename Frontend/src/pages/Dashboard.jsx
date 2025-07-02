

import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const stats = [
  { label: 'Total Users', value: 29, change: +3.6, icon: '👥', color: 'bg-blue-100 text-blue-600' },
  { label: 'Total Cars', value: 25, change: -7.4, icon: '🚗', color: 'bg-purple-100 text-purple-600' },
  { label: 'Active Bookings', value: 18, change: -52.6, icon: '📅', color: 'bg-green-100 text-green-600' },
  { label: 'Monthly Revenue', value: 0, change: -100, icon: '📈', color: 'bg-indigo-100 text-indigo-600' },
];

const revenueData = [
  { month: 'Apr', revenue: 11200 },
  { month: 'May', revenue: 800 },
  { month: 'Jun', revenue: 0 },
];

const recentBookings = [
  { name: 'Unknown', car: 'tata', price: '$50', status: 'confirmed', dates: '5/24/2025 - 5/25/2025' },
  { name: 'Samreen Malik', car: 'tata', price: '$100', status: 'pending', dates: '5/25/2025 - 5/27/2025' },
  { name: 'Shiv Shukla', car: 'Maruti', price: '$2', status: 'confirmed', dates: '5/21/2025 - 5/23/2025' },
  { name: 'John Doe', car: 'tata', price: '$50', status: 'confirmed', dates: '5/13/2025 - 5/14/2025' },
  { name: 'Jane Doe', car: 'tata', price: '$100', status: 'confirmed', dates: '5/13/2025 - 5/15/2025' },
  { name: 'Ak', car: 'KIA', price: '$90', status: 'confirmed', dates: '5/10/2025 - 5/13/2025' },
  { name: 'Ak', car: 'tata', price: '$100', status: 'confirmed', dates: '5/10/2025 - 5/12/2025' },
  { name: 'Ak', car: 'BMW', price: '$114', status: 'confirmed', dates: '4/29/2025 - 5/2/2025' },
];

function Dashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto h-[calc(100vh-150px)] overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Dashboard Overview</h2>
        <span className="text-sm text-gray-500">Last updated: 7/1/2025</span>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-4 rounded shadow flex items-center gap-4">
            <div className={`text-2xl p-2 rounded-full ${stat.color}`}>{stat.icon}</div>
            <div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <h4 className="text-xl font-bold">{stat.value}</h4>
              <p
                className={`text-xs ${
                  stat.change > 0 ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {stat.change > 0 ? '+' : ''}
                {stat.change}%
              </p>
            </div>
          </div>
        ))}
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
              {recentBookings.map((b, i) => (
                <tr key={i} className="border-t">
                  <td className="p-2">{b.name}</td>
                  <td className="p-2">{b.car}</td>
                  <td className="p-2">{b.price}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        b.status === 'confirmed'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-yellow-100 text-yellow-600'
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="p-2">{b.dates}</td>
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
