import React from 'react'
import { FaPlus } from "react-icons/fa";

function ManageCars() {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Car Fleet Management</h1>
                    <p className="text-gray-600 text-sm text-center">Manage your vehicle inventory and listings</p>
                </div>
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow-md cursor-pointer">
                    <FaPlus /> Add New Vehicle
                </button>
            </div>
        </div>
    )
}

export default ManageCars