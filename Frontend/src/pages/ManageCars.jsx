import { useEffect, useState } from 'react';
import { Modal, Select, Upload, Input } from 'antd';
import { FaPlus } from 'react-icons/fa';
import { UploadOutlined } from '@ant-design/icons';
import AxiosInstance from "../apiManager/axiosInstance";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import CarCard from '../componenets/CarCard';

const { Option } = Select;

function ManageCars() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [cars, setCars] = useState([]);


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
        category: '',
        status: 'available',
        features: '',
    })

    const handleChange = (e) => {
        setCarData({
            ...carData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', carData.name);
        formData.append('brand', carData.brand);
        formData.append('model', carData.model);
        formData.append('year', carData.year);
        formData.append('pricePerDay', carData.pricePerDay);
        formData.append('seats', carData.seats);
        formData.append('fuelType', carData.fuelType);
        formData.append('transmission', carData.transmission);
        formData.append('category', carData.category);
        formData.append('status', carData.status);

        carData.features.split(',').map(f => f.trim()).forEach((feature) => {
            formData.append('features[]', feature);
        });

        formData.append('image', image);
        console.log("formData : ", formData);
        try {
            setIsLoading(true);
            const response = await AxiosInstance.post("/api/car/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            //await fetchCars();
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
                category: '',
                status: 'available',
                features: '',
            })

            setIsModalOpen(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    const getAllCars = async () => {
        try {
            const response = await AxiosInstance.get("/api/car/all");
            console.log(response);
            return response.data.cars;
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        const getCars = async () => {
            const cars = await getAllCars();
            setCars(cars);
        }
        getCars();
    }, [])

    return (
        <div>
            <div className="flex justify-between items-center mb-12">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Car Cards */}
                {
                    cars?.map((car, index) => (
                        <CarCard
                            key={index}
                            image={car.image}
                            title={car.name}
                            price={car.pricePerDay}
                            transmission={car.transmission}
                            features={car.features}
                        />
                    ))
                }

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
                            value={carData.fuelType}
                            onChange={(value) => setCarData({ ...carData, fuelType: value })}
                        >
                            <Option value="petrol">Petrol</Option>
                            <Option value="diesel">Diesel</Option>
                            <Option value="electric">Electric</Option>
                            <Option value="hybrid">Hybrid</Option>
                        </Select>
                        <Select className="w-full"
                            value={carData.transmission}
                            onChange={(value) => setCarData({ ...carData, transmission: value })}
                            placeholder="Select transmission">
                            <Option value="automatic">Automatic</Option>
                            <Option value="manual">Manual</Option>
                        </Select>
                    </div>

                    <div className="flex gap-4">
                        <Select className="w-full" placeholder="Select category"
                            value={carData.category}
                            onChange={(value) => setCarData({ ...carData, category: value })}
                        >
                            <Option value="suv">SUV</Option>
                            <Option value="sedan">Sedan</Option>
                            <Option value="hatchback">Hatchback</Option>
                        </Select>
                        <Select className="w-full"
                            value={carData.status}
                            onChange={(value) => setCarData({ ...carData, status: value })}
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
                            {isLoading ? (
                                <span className="loader">loading...</span>
                            ) : (
                                <span>Add Car</span>
                            )}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default ManageCars;
