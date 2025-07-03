import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import AxiosInstance from "../apiManager/axiosInstance";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import { userLogin, adminLogout } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fromData = {
    email: email,
    password: password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await AxiosInstance.post("/api/user/login", fromData);

      console.log(response);

      dispatch(
        userLogin({
          user: response.data.userData,
          userToken: response.data.userData.acessToken,
        })
      );

      dispatch(adminLogout());

      toast.success(response.data.message);
      navigate("/list");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600">
      <div className="bg-white p-8 rounded-2xl w-[400px]">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex items-center bg-gray-100 rounded px-3 py-2">
            <FaEnvelope className="text-gray-400 mr-3" />
            <input
              type="email"
              placeholder="Email Address"
              className="bg-transparent w-full outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center bg-gray-100 rounded px-3 py-2">
            <FaLock className="text-gray-400 mr-3" />
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent w-full outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition cursor-pointer"
            type="submit"
          >
            Sign In
          </button>
        </form>
        <p className="text-center text-sm mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link to="/user/signup" className="text-indigo-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
