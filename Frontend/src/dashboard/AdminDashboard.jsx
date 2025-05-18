import { FaTachometerAlt, FaCar, FaCalendarAlt, FaUsers, FaChartPie, FaCog, FaPlus } from "react-icons/fa";
import { Outlet, useNavigate, useLocation } from 'react-router-dom';


function AdminDashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-gradient-to-b from-indigo-700 to-indigo-900 text-white">
                <div className="p-4 text-2xl font-bold">Car Rental Admin</div>
                <nav className="mt-4">
                    <ul className="space-y-2">
                        <li
                            onClick={() => navigate('/admin/dashboard/dashboard')}
                            className={`flex items-center px-4 py-3 cursor-pointer ${isActive('/admin/dashboard/dashboard') ? 'bg-indigo-600' : 'hover:bg-indigo-600'
                                }`}
                        >
                            <FaTachometerAlt className="mr-3" /> Dashboard
                        </li>
                        <li onClick={() => navigate('/admin/dashboard/manage-cars')} className={`flex items-center px-4 py-3 cursor-pointer ${isActive('/admin/dashboard/manage-cars') ? 'bg-indigo-600' : 'hover:bg-indigo-600'
                            }`}>
                            <FaCar className="mr-3" /> Manage Cars
                        </li>
                        <li onClick={() => navigate('/admin/dashboard/manage-bookings')} className={`flex items-center px-4 py-3 cursor-pointer ${isActive('/admin/dashboard/manage-bookings') ? 'bg-indigo-600' : 'hover:bg-indigo-600'
                            }`}>
                            <FaCalendarAlt className="mr-3" /> Manage Bookings
                        </li>
                        <li onClick={() => navigate('/admin/dashboard/manage-users')} className={`flex items-center px-4 py-3 cursor-pointer ${isActive('/admin/dashboard/manage-users') ? 'bg-indigo-600' : 'hover:bg-indigo-600'
                            }`}>
                            <FaUsers className="mr-3" /> Manage Users
                        </li>
                        <li onClick={() => navigate('/admin/dashboard/reports')} className={`flex items-center px-4 py-3 cursor-pointer ${isActive('/admin/dashboard/reports') ? 'bg-indigo-600' : 'hover:bg-indigo-600'
                            }`}>
                            <FaChartPie className="mr-3" /> Reports
                        </li>
                        <li onClick={() => navigate('/admin/dashboard/setting')} className={`flex items-center px-4 py-3 cursor-pointer ${isActive('/admin/dashboard/setting') ? 'bg-indigo-600' : 'hover:bg-indigo-600'
                            }`}>
                            <FaCog className="mr-3" /> Settings
                        </li>
                    </ul>
                </nav>
            </aside>


            {/* Main Content */}
            <main className="flex-1 p-8 mt-20 bg-[#E5E7EB]">
                {/* <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Car Fleet Management</h1>
                        <p className="text-gray-600 text-sm">Manage your vehicle inventory and listings</p>
                    </div>
                    <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow-md">
                        <FaPlus /> Add New Vehicle
                    </button>
                </div>
                Content section can go here */}
                <Outlet />

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
