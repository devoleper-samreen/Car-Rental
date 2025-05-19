// import React from 'react'
// import { FaPlus } from "react-icons/fa";

// function ManageCars() {
//     return (
//         <div>
//             <div className="flex justify-between items-center mb-6">
//                 <div>
//                     <h1 className="text-3xl font-bold text-gray-900">Car Fleet Management</h1>
//                     <p className="text-gray-600 text-sm text-center">Manage your vehicle inventory and listings</p>
//                 </div>
//                 <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow-md cursor-pointer">
//                     <FaPlus /> Add New Vehicle
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default ManageCars


import { useState } from 'react';
import { Modal, Select, Upload, Input } from 'antd';
import { FaPlus } from 'react-icons/fa';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

function ManageCars() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => setIsModalOpen(false);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Car Fleet Management</h1>
                    <p className="text-gray-600 text-sm text-center">Manage your vehicle inventory and listings</p>
                </div>
                <button
                    onClick={showModal}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow-md cursor-pointer"
                >
                    <FaPlus /> Add New Vehicle
                </button>
            </div>

            <Modal
                title="Add New Car"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <form className="space-y-6">
                    <Input placeholder="Enter car name" />
                    <div className="flex gap-4 mt-6">
                        <Input placeholder="Enter brand" />
                        <Input placeholder="Enter model" />
                    </div>
                    <div className="flex gap-4">
                        <Input placeholder="Enter year" />
                        <Input placeholder="Enter price per day" />
                    </div>
                    <Input placeholder="Number of seats" />

                    <div className="flex gap-4 mt-6">
                        <Select className="w-full" placeholder="Select fuel type">
                            <Option value="petrol">Petrol</Option>
                            <Option value="diesel">Diesel</Option>
                            <Option value="electric">Electric</Option>
                        </Select>
                        <Select className="w-full" placeholder="Select transmission">
                            <Option value="automatic">Automatic</Option>
                            <Option value="manual">Manual</Option>
                        </Select>
                    </div>

                    <div className="flex gap-4">
                        <Select className="w-full" placeholder="Select car type">
                            <Option value="suv">SUV</Option>
                            <Option value="sedan">Sedan</Option>
                            <Option value="hatchback">Hatchback</Option>
                        </Select>
                        <Select className="w-full" placeholder="Status" defaultValue="available">
                            <Option value="available">Available</Option>
                            <Option value="unavailable">Unavailable</Option>
                        </Select>
                    </div>

                    <Upload maxCount={1}>
                        <button
                            type="button"
                            className="w-full border border-dashed border-gray-300 p-6 rounded text-gray-600 mb-6"
                        >
                            <UploadOutlined /> Click to upload or drag and drop
                        </button>
                    </Upload>

                    <Input placeholder="Features (comma-separated)" />

                    <div className="flex justify-end gap-2 mt-6">
                        <button type="button" onClick={handleCancel} className="bg-gray-200 px-4 py-2 rounded cursor-pointer">
                            Cancel
                        </button>
                        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded cursor-pointer">
                            Add Car
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default ManageCars;
