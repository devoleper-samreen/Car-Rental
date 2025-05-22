import { useState } from 'react';
import { Modal, Select, Upload, Input } from 'antd';
import { FaPlus } from 'react-icons/fa';
import { UploadOutlined } from '@ant-design/icons';
import AxiosInstance from "../apiManager/axiosInstance";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

function ManageCars() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => setIsModalOpen(false);

    const [image, setImage] = useState(null);
    const [carData, setCarData] = useState({
        name: '',
        brand: '',
        model: '',
        year: '',
        pricePerDay: '',
        seats: '',
        fuelType: '',
        transmission: '',
        carType: '',
        status: 'available',
        image: '',
        features: '',
    })

    const handleChange = (e) => {
        setCarData({
            ...carData,
            [e.target.name]: e.target.value
        })
    }

    const formData = {
        ...carData,
        //seperate features by comma
        features: carData.features.split(',').map(feature => feature.trim()),
        image: image,
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await AxiosInstance.post("/api/car/add", formData)
            console.log(response);
            toast.success(response.data.message);

            setCarData({
                name: '',
                brand: '',
                model: '',
                year: '',
                pricePerDay: '',
                seats: '',
                fuelType: '',
                transmission: '',
                carType: '',
                status: 'available',
                features: '',
            })

            setIsModalOpen(false);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

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
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <Input placeholder="Enter car name" name="name" value={carData.name} onChange={handleChange} />
                    <div className="flex gap-4 mt-6">
                        <Input placeholder="Enter brand"
                            name="brand"
                            value={carData.brand}
                            onChange={handleChange}
                        />
                        <Input placeholder="Enter model"
                            name="model"
                            value={carData.model}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex gap-4">
                        <Input placeholder="Enter year"
                            name="year"
                            value={carData.year}
                            onChange={handleChange}
                        />
                        <Input placeholder="Enter price per day"
                            name="pricePerDay"
                            value={carData.pricePerDay}
                            onChange={handleChange}
                        />
                    </div>
                    <Input placeholder="Number of seats"
                        name="seats"
                        value={carData.seats}
                        onChange={handleChange}
                    />

                    <div className="flex gap-4 mt-6">
                        <Select className="w-full" placeholder="Select fuel type"
                            name="fuelType"
                            value={carData.fuelType}
                            onChange={handleChange}
                        >
                            <Option value="petrol">Petrol</Option>
                            <Option value="diesel">Diesel</Option>
                            <Option value="electric">Electric</Option>
                        </Select>
                        <Select className="w-full"
                            name="transmission"
                            value={carData.transmission}
                            onChange={handleChange}
                            placeholder="Select transmission">
                            <Option value="automatic">Automatic</Option>
                            <Option value="manual">Manual</Option>
                        </Select>
                    </div>

                    <div className="flex gap-4">
                        <Select className="w-full" placeholder="Select car type"
                            name="carType"
                            value={carData.carType}
                            onChange={handleChange}
                        >
                            <Option value="suv">SUV</Option>
                            <Option value="sedan">Sedan</Option>
                            <Option value="hatchback">Hatchback</Option>
                        </Select>
                        <Select className="w-full"
                            name="status"
                            value={carData.status}
                            onChange={handleChange}
                            placeholder="Status" defaultValue="available">
                            <Option value="available">Available</Option>
                            <Option value="unavailable">Unavailable</Option>
                        </Select>
                    </div>

                    <Upload
                        maxCount={1}
                        beforeUpload={(file) => {
                            setImage(file);
                            return false;
                        }}
                    >
                        <button
                            type="button"
                            className="w-full border border-dashed border-gray-300 p-6 rounded text-gray-600 mb-6"
                        >
                            <UploadOutlined /> Click to upload or drag and drop
                        </button>
                    </Upload>

                    <Input placeholder="Features (comma-separated)"
                        name="features"
                        value={carData.features}
                        onChange={handleChange}
                    />

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
