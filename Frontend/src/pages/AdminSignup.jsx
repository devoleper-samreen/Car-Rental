import { FaUserShield, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AxiosInstance from '../apiManager/axiosInstance';
import { adminLogin } from "../features/auth/authSlice"
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const AdminSignupPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await AxiosInstance.post("/api/admin/register", formData)

            console.log(response);

            dispatch(adminLogin({
                user: response.data.admin,
                adminToken: response.data.admin.acessToken
            }))

            toast.success(response.data.message);
            navigate("/admin/dashboard");


        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);

        }
    }
    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
            <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
                <div className="flex justify-center mb-4">
                    <FaUserShield size={40} className="text-violet-600" />
                </div>
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Register Admin</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="flex items-center border px-4 py-2 rounded-md">
                        <FaUser className="text-gray-400 mr-3" />
                        <input className="w-full outline-none" type="text" placeholder="Admin Name" name='name' value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="flex items-center border px-4 py-2 rounded-md">
                        <FaEnvelope className="text-gray-400 mr-3" />
                        <input className="w-full outline-none" type="email" placeholder="Admin Email" name='email' value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="flex items-center border px-4 py-2 rounded-md">
                        <FaLock className="text-gray-400 mr-3" />
                        <input className="w-full outline-none" type="password" placeholder="Password" name='password' value={formData.password} onChange={handleChange} />
                    </div>
                    <button className="w-full bg-violet-600 hover:bg-violet-700 text-white py-2 rounded-md font-semibold transition duration-300 cursor-pointer" type='submit'>
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
