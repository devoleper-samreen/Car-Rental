import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignIn = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600">
            <div className="bg-white p-8 rounded-2xl w-[400px]">
                <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>
                <form className="space-y-4">
                    <div className="flex items-center bg-gray-100 rounded px-3 py-2">
                        <FaEnvelope className="text-gray-400 mr-3" />
                        <input type="email" placeholder="Email Address" className="bg-transparent w-full outline-none" />
                    </div>
                    <div className="flex items-center bg-gray-100 rounded px-3 py-2">
                        <FaLock className="text-gray-400 mr-3" />
                        <input type="password" placeholder="Password" className="bg-transparent w-full outline-none" />
                    </div>
                    <button className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition cursor-pointer">Sign In</button>
                </form>
                <p className="text-center text-sm mt-4 text-gray-600">
                    Don’t have an account? <Link to="/signup" className="text-indigo-600 hover:underline">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
