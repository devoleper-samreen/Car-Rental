import { FaUserShield, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AdminSignupPage = () => {
    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
            <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
                <div className="flex justify-center mb-4">
                    <FaUserShield size={40} className="text-violet-600" />
                </div>
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Register Admin</h2>
                <form className="space-y-6">
                    <div className="flex items-center border px-4 py-2 rounded-md">
                        <FaUser className="text-gray-400 mr-3" />
                        <input className="w-full outline-none" type="text" placeholder="Admin Name" />
                    </div>
                    <div className="flex items-center border px-4 py-2 rounded-md">
                        <FaEnvelope className="text-gray-400 mr-3" />
                        <input className="w-full outline-none" type="email" placeholder="Admin Email" />
                    </div>
                    <div className="flex items-center border px-4 py-2 rounded-md">
                        <FaLock className="text-gray-400 mr-3" />
                        <input className="w-full outline-none" type="password" placeholder="Password" />
                    </div>
                    <button className="w-full bg-violet-600 hover:bg-violet-700 text-white py-2 rounded-md font-semibold transition duration-300 cursor-pointer">
                        Register Admin
                    </button>
                </form>
                <div className='flex mt-6 items-center justify-center w-full'>
                    <Link to="/admin/login" className="text-sm text-violet-600 hover:underline cursor-pointer">
                        Already registered? Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminSignupPage;
