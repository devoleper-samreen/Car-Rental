import { FaUser, FaPhone, FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import AxiosInstance from "../apiManager/axiosInstance"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";


const UserSignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
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
        e.prevanteDefault();
        try {
            const response = await AxiosInstance.post("/user/register", formData)

            console.log(response);
            navigate("/user/login");

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }

    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600">
            <div className="bg-white p-8 rounded-2xl w-[400px]">
                <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="flex items-center bg-gray-100 rounded px-3 py-2">
                        <FaUser className="text-gray-400 mr-3" />
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="bg-transparent w-full outline-none"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex items-center bg-gray-100 rounded px-3 py-2">
                        <FaPhone className="text-gray-400 mr-3" />
                        <input type="tel" placeholder="Phone Number" className="bg-transparent w-full outline-none" name="phone" value={formData.phone} onChange={handleChange} />
                    </div>
                    <div className="flex items-center bg-gray-100 rounded px-3 py-2">
                        <FaEnvelope className="text-gray-400 mr-3" />
                        <input type="email" placeholder="Email Address" className="bg-transparent w-full outline-none" name="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="flex items-center bg-gray-100 rounded px-3 py-2">
                        <FaLock className="text-gray-400 mr-3" />
                        <input type="password" placeholder="Password" className="bg-transparent w-full outline-none" name="password" value={formData.password} onChange={handleChange} />
                    </div>
                    <button className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition cursor-pointer" type="submit">Sign Up</button>
                </form>
                <p className="text-center text-sm mt-4 text-gray-600">
                    Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default UserSignUp;
