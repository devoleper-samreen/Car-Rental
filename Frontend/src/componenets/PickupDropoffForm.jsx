import { FaExchangeAlt } from "react-icons/fa";
import { useState, useEffect } from "react";

const PickupDropoffForm = ({ onChange }) => {
  const [formData, setFormData] = useState({
    pickupLocation: "",
    pickupDate: "",
    pickupTime: "",
    dropoffLocation: "",
    dropoffDate: "",
    dropoffTime: "",
  });

  useEffect(() => {
    onChange(formData);
  }, [formData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex justify-center items-center px-4">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 bg-white p-6 rounded-2xl shadow-xl w-full max-w-5xl">
        {/* Pick-Up Section */}
        <div className="w-full space-y-4">
          <div className="flex items-center space-x-2">
            <input type="radio" checked readOnly className="accent-blue-500" />
            <span className="font-semibold text-gray-900">Pick-Up</span>
          </div>

          {/* Row 1: Location + Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InputField
              label="Location"
              type="text"
              value={formData.pickupLocation}
              onChange={(val) => handleChange("pickupLocation", val)}
              placeholder="Enter city"
            />
            <InputField
              label="Date"
              type="date"
              value={formData.pickupDate}
              onChange={(val) => handleChange("pickupDate", val)}
            />
          </div>

          {/* Row 2: Time */}
          <div className="grid grid-cols-1 sm:grid-cols-1">
            <InputField
              label="Time"
              type="time"
              value={formData.pickupTime}
              onChange={(val) => handleChange("pickupTime", val)}
            />
          </div>
        </div>

        {/* Switch Button */}
        <div className="pt-2">
          <button
            type="button"
            className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-transform duration-200 hover:scale-110"
          >
            <FaExchangeAlt size={18} />
          </button>
        </div>

        {/* Drop-Off Section */}
        <div className="w-full space-y-4">
          <div className="flex items-center space-x-2">
            <input type="radio" checked readOnly className="accent-blue-500" />
            <span className="font-semibold text-gray-900">Drop-Off</span>
          </div>

          {/* Row 1: Location + Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InputField
              label="Location"
              type="text"
              value={formData.dropoffLocation}
              onChange={(val) => handleChange("dropoffLocation", val)}
              placeholder="Enter city"
            />
            <InputField
              label="Date"
              type="date"
              value={formData.dropoffDate}
              onChange={(val) => handleChange("dropoffDate", val)}
            />
          </div>

          {/* Row 2: Time */}
          <div className="grid grid-cols-1 sm:grid-cols-1">
            <InputField
              label="Time"
              type="time"
              value={formData.dropoffTime}
              onChange={(val) => handleChange("dropoffTime", val)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// 🔧 Reusable InputField
const InputField = ({ label, type, value, onChange, placeholder }) => (
  <div className="flex flex-col">
    <label className="text-sm font-semibold text-gray-800 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="text-sm px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
    />
  </div>
);

export default PickupDropoffForm;
