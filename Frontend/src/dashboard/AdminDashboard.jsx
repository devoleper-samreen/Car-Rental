import { FaTachometerAlt, FaCar, FaCalendarAlt, FaUsers, FaChartPie, FaCog, FaPlus } from "react-icons/fa";
import Sidebar from "../componenets/Sidebar";

function AdminDashboard() {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            {/* <Sidebar /> */}
            <aside className="w-64 bg-gradient-to-b from-indigo-700 to-indigo-900 text-white">
                <div className="p-4 text-2xl font-bold">Car Rental Admin</div>
                <nav className="mt-4">
                    <ul className="space-y-2">
                        <li className="flex items-center px-4 py-2 hover:bg-indigo-600 cursor-pointer">
                            <FaTachometerAlt className="mr-3" /> Dashboard
                        </li>
                        <li className="flex items-center px-4 py-2 bg-indigo-600 cursor-pointer">
                            <FaCar className="mr-3" /> Manage Cars
                        </li>
                        <li className="flex items-center px-4 py-2 hover:bg-indigo-600 cursor-pointer">
                            <FaCalendarAlt className="mr-3" /> Manage Bookings
                        </li>
                        <li className="flex items-center px-4 py-2 hover:bg-indigo-600 cursor-pointer">
                            <FaUsers className="mr-3" /> Manage Users
                        </li>
                        <li className="flex items-center px-4 py-2 hover:bg-indigo-600 cursor-pointer">
                            <FaChartPie className="mr-3" /> Reports
                        </li>
                        <li className="flex items-center px-4 py-2 hover:bg-indigo-600 cursor-pointer">
                            <FaCog className="mr-3" /> Settings
                        </li>
                    </ul>
                </nav>
            </aside>


            {/* Main Content */}
            <main className="flex-1 p-8 mt-20">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Car Fleet Management</h1>
                        <p className="text-gray-600">Manage your vehicle inventory and listings</p>
                    </div>
                    <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow-md">
                        <FaPlus /> Add New Vehicle
                    </button>
                </div>
                {/* Content section can go here */}
            </main>

            {/* Top bar */}
            <div className="absolute top-4 right-4 flex items-center gap-4">
                <div className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md">
                    <span className="font-medium">Admin User</span>
                </div>
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
                    Logout
                </button>
            </div>
        </div>
    );
}

export default AdminDashboard;
