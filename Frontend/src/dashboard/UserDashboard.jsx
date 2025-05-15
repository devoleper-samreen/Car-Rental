import React from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaCarSide, FaUserShield } from 'react-icons/fa';
import { FaCar } from "react-icons/fa";

const UserDashboard = () => {
    return (
        <div className="min-h-screen bg-[#f4f6fa] p-6">
            <div className="max-w-6xl mx-auto">
                {/* Profile Header */}
                <div className="bg-white rounded-2xl shadow-md flex items-center p-6 mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-500 to-violet-600 flex items-center justify-center text-white text-3xl font-bold">
                        S
                    </div>
                    <div className="ml-4">
                        <h2 className="text-2xl font-bold text-purple-700">Samreen Malik</h2>
                        <p className="flex items-center text-gray-500">
                            <FaMapMarkerAlt className="mr-2 text-blue-400" /> Member since May 2025
                        </p>
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
                                <FaUserShield className="text-purple-400 mr-2" />
                                <span>Samreen Malik</span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="text-gray-600 block mb-1">Email</label>
                            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
                                <FaEnvelope className="text-purple-400 mr-2" />
                                <span>maliksamreen721@gmail.com</span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="text-gray-600 block mb-1">Phone</label>
                            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
                                <FaPhone className="text-purple-400 mr-2" />
                                <span>9897469714</span>
                            </div>
                        </div>
                        <button className="w-full mt-4 bg-gradient-to-tr from-purple-500 to-violet-600 text-white py-2 rounded-xl shadow hover:scale-105 transition-transform cursor-pointer">
                            Update Profile
                        </button>
                    </div>

                    {/* Booking History */}
                    <div className="bg-white rounded-2xl shadow-md p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center text-purple-600">
                            <FaCar className="mr-2" /> Booking History
                        </h3>
                        <div className="flex flex-col items-center justify-center text-gray-400 my-28">
                            <FaCar className="text-5xl mb-2" />
                            <p>No bookings found</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
