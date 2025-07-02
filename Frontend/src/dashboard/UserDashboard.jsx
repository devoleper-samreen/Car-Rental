import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaCarSide,
  FaUserShield,
} from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../features/auth/authSlice.js";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form, Input } from "antd";
import { useState } from "react";
import AxiosInstance from "../apiManager/axiosInstance";
import { toast } from "react-hot-toast";
import { userProfile } from "../features/auth/authSlice.js";
import React, { useEffect } from "react";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [userBookings, setUserBookings] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log("Form values:", values);
      const response = await AxiosInstance.put(
        "/api/user/update-profile",
        values
      );
      console.log(response);
      dispatch(
        userProfile({
          user: response.data.user,
        })
      );

      form.resetFields();
      setIsModalOpen(false);
      toast.success(response.data.message);
    } catch (error) {
      console.log("Validation Failed:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    dispatch(userLogout());
    navigate("/user/login");
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await AxiosInstance.get("/api/booking/");
        console.log("Bookings:", response.data.data);
        setUserBookings(response.data.data);
      } catch (err) {
        console.error("Error fetching user bookings:", err);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f6fa] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-md flex items-center p-6 mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-500 to-violet-600 flex items-center justify-center text-white text-3xl font-bold">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-purple-700">
              {user?.name || "User"}
            </h2>
            <p className="flex items-center text-gray-500">
              <FaMapMarkerAlt className="mr-2 text-blue-400" />
              {`Member since ${new Date(user?.createdAt).toLocaleString(
                "en-US",
                {
                  month: "long",
                  year: "numeric",
                }
              )}`}
            </p>
          </div>
          <div className="ml-auto bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer">
            <button className="cursor-pointer" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Info */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center text-purple-600">
              <FaUserShield className="mr-2" /> Profile Information
            </h3>
            <div className="mb-4">
              <label className="text-gray-600 block mb-1">Name</label>
              <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
                <FaUserShield className="text-purple-400 mr-3" />
                <span>{user?.name || "User"}</span>
              </div>
            </div>
            <div className="mb-4">
              <label className="text-gray-600 block mb-1">Email</label>
              <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
                <FaEnvelope className="text-purple-400 mr-3" />
                <span>{user?.email || "user@example.com"}</span>
              </div>
            </div>
            <div className="mb-4">
              <label className="text-gray-600 block mb-1">Phone</label>
              <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
                <FaPhone className="text-purple-400 mr-3" />
                <span>{user?.phone || "9897469714"}</span>
              </div>
            </div>
            <button
              className="w-full mt-4 bg-gradient-to-tr from-purple-500 to-violet-600 text-white py-2 rounded-xl shadow hover:scale-105 transition-transform cursor-pointer"
              onClick={showModal}
            >
              Update Profile
            </button>
          </div>

          {/* Booking History */}
          <div className="bg-white rounded-2xl shadow-md p-6 h-[calc(100vh-190px)] overflow-auto">
            <h3 className="text-lg font-semibold mb-4 flex items-center text-purple-600">
              <FaCar className="mr-2" /> Booking History
            </h3>

            {userBookings.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-gray-400 my-28">
                <FaCar className="text-5xl mb-2" />
                <p>No bookings found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {userBookings.map((booking, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center border rounded-xl p-4 shadow-sm hover:shadow-md transition"
                  >
                    {/* Car Info */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-700">
                        {booking.carId?.name || "N/A"}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {booking.carId?.brand || "N/A"}
                      </p>
                      <p className="text-sm mt-1 text-blue-500 flex items-center">
                        <FaCalendar className="mr-2" />{" "}
                        {new Date(booking.pickupDate).toLocaleDateString()} to{" "}
                        {new Date(booking.dropoffDate).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Amount */}
                    <div className="text-purple-600 font-semibold text-lg flex items-center gap-1">
                      <FaRupeeSign />
                      {booking.totalAmount || 0}
                    </div>

                    {/* Status */}
                    <span
                      className={`px-4 py-1 text-sm rounded-full font-semibold ${
                        booking.status === "confirmed"
                          ? "bg-red-100 text-red-500"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal for Updating Profile */}
        <Modal
          title="Update Profile"
          centered
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Submit"
          cancelText="Cancel"
        >
          <Form form={form} layout="vertical" name="userForm">
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <Input placeholder="Enter your name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Invalid email!" },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                { required: true, message: "Please enter your phone number!" },
              ]}
            >
              <Input placeholder="Enter your phone number" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default UserDashboard;
