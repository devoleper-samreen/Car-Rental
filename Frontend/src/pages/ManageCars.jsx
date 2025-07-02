import { useEffect, useState } from "react";
import { Modal, Select, Upload, Input } from "antd";
import { FaPlus } from "react-icons/fa";
import { UploadOutlined } from "@ant-design/icons";
import AxiosInstance from "../apiManager/axiosInstance";
import toast from "react-hot-toast";

const { Option } = Select;

const defaultState = {
  name: "",
  brand: "",
  model: "",
  year: "",
  pricePerDay: "",
  seats: "",
  fuelType: "",
  transmission: "",
  category: "",
  status: "available",
  features: "",
};

function ManageCars() {
  const [editCarId, setEditCarId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cars, setCars] = useState([]);
  const [image, setImage] = useState(null);
  const [carData, setCarData] = useState({ ...defaultState });

  const showModal = (car = null) => {
    if (car) {
      setCarData({
        name: car.name,
        brand: car.brand,
        model: car.model,
        year: car.year,
        pricePerDay: car.pricePerDay,
        seats: car.seats,
        fuelType: car.fuelType,
        transmission: car.transmission,
        category: car.category,
        status: car.status,
        features: car.features?.join(", ") || "",
      });
      setEditCarId(car._id);
    } else {
      setCarData({ ...defaultState });
      setEditCarId(null);
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditCarId(null);
    setImage(null);
    setCarData({ ...defaultState });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData((prev) => ({ ...prev, [name]: value }));
  };

  const getAllCars = async () => {
    try {
      const res = await AxiosInstance.get("/api/car/all-cars");
      return res.data.cars;
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch cars");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(carData).forEach(([key, value]) => {
      if (key === "features") {
        value
          .split(",")
          .map((f) => f.trim())
          .forEach((f) => formData.append("features[]", f));
      } else {
        formData.append(key, value);
      }
    });

    if (image) formData.append("image", image);

    try {
      setIsLoading(true);

      const res = editCarId
        ? await AxiosInstance.put(`/api/car/update/${editCarId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
        : await AxiosInstance.post("/api/car/add", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

      toast.success(res.data.message);
      const updated = await getAllCars();
      setCars(updated);
      handleCancel();
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCar = async (id) => {
    try {
      await AxiosInstance.delete(`/api/car/delete/${id}`);
      toast.success("Car deleted successfully");
      const updated = await getAllCars();
      setCars(updated);
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete car");
    }
  };

  useEffect(() => {
    (async () => {
      const initialCars = await getAllCars();
      setCars(initialCars);
    })();
  }, []);

  return (
    <div className="h-[calc(100vh-150px)] overflow-auto p-4">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Car Fleet Management
          </h1>
          <p className="text-gray-600 text-sm text-center">
            Manage your vehicle inventory and listings
          </p>
        </div>
        <button
          onClick={() => showModal()}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow-md cursor-pointer"
        >
          <FaPlus /> Add New Vehicle
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-lg">
        <table className="min-w-full bg-white text-sm text-left text-gray-500">
          <thead className="bg-gray-100 text-xs text-gray-700 uppercase">
            <tr>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Price/Day</th>
              <th className="px-6 py-4">Transmission</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars?.map((car) => (
              <tr key={car._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="h-14 w-24 object-cover rounded-lg"
                  />
                </td>
                <td className="px-6 py-3 font-medium text-gray-900">
                  {car.name}
                </td>
                <td className="px-6 py-3">${car.pricePerDay}</td>
                <td className="px-6 py-3">{car.transmission}</td>
                <td className="px-6 py-3 space-x-2">
                  <button
                    onClick={() => showModal(car)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      window.confirm("Delete this car?") &&
                      handleDeleteCar(car._id)
                    }
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        title={editCarId ? "Edit Car" : "Add New Car"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            placeholder="Car name"
            name="name"
            value={carData.name}
            onChange={handleChange}
          />
          <div className="flex gap-4 mt-6">
            <Input
              placeholder="Brand"
              name="brand"
              value={carData.brand}
              onChange={handleChange}
            />
            <Input
              placeholder="Model"
              name="model"
              value={carData.model}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-4">
            <Input
              placeholder="Year"
              name="year"
              value={carData.year}
              onChange={handleChange}
            />
            <Input
              placeholder="Price per day"
              name="pricePerDay"
              value={carData.pricePerDay}
              onChange={handleChange}
            />
          </div>
          <Input
            placeholder="Number of seats"
            name="seats"
            value={carData.seats}
            onChange={handleChange}
          />
          <div className="flex gap-4 mt-6">
            <Select
              className="w-full"
              placeholder="Fuel type"
              value={carData.fuelType}
              onChange={(v) => setCarData({ ...carData, fuelType: v })}
            >
              <Option value="petrol">Petrol</Option>
              <Option value="diesel">Diesel</Option>
              <Option value="electric">Electric</Option>
              <Option value="hybrid">Hybrid</Option>
            </Select>
            <Select
              className="w-full"
              placeholder="Transmission"
              value={carData.transmission}
              onChange={(v) => setCarData({ ...carData, transmission: v })}
            >
              <Option value="automatic">Automatic</Option>
              <Option value="manual">Manual</Option>
            </Select>
          </div>
          <div className="flex gap-4">
            <Select
              className="w-full"
              placeholder="Category"
              value={carData.category}
              onChange={(v) => setCarData({ ...carData, category: v })}
            >
              <Option value="suv">SUV</Option>
              <Option value="sedan">Sedan</Option>
              <Option value="hatchback">Hatchback</Option>
            </Select>
            <Select
              className="w-full"
              placeholder="Status"
              value={carData.status}
              onChange={(v) => setCarData({ ...carData, status: v })}
            >
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

          <Input
            placeholder="Features (comma-separated)"
            name="features"
            value={carData.features}
            onChange={handleChange}
          />

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-200 px-4 py-2 rounded cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
              {isLoading ? "Loading..." : editCarId ? "Update Car" : "Add Car"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default ManageCars;
