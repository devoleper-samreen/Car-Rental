import { useState } from "react";

const CarFilterSidebar = ({ onCategoryChange, onPriceRangeChange }) => {
  const [price, setPrice] = useState(2000);
  const carTypes = ["suv", "sedan", "hatchback"];

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setPrice(value);
    onPriceRangeChange?.(value);
  };

  return (
    <div className="w-full bg-white p-8 space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="text-sm font-semibold text-gray-500 mb-2">TYPE</h3>
        {carTypes.map((type) => (
          <label
            key={type}
            className="flex items-center space-x-2 text-sm text-gray-700 mb-1"
          >
            <input
              type="radio"
              name="category"
              value={type}
              onChange={(e) => onCategoryChange?.(e.target.value)}
              className="accent-blue-500"
            />
            <span>{type}</span>
          </label>
        ))}
        <label className="flex items-center space-x-2 text-sm text-gray-700 mt-2">
          <input
            type="radio"
            name="category"
            value=""
            onChange={() => onCategoryChange?.("")}
            className="accent-blue-500"
          />
          <span>All</span>
        </label>
      </div>

      {/* Price Filter */}
      <div>
        <h3 className="text-sm font-semibold text-gray-500 mb-2">
          PRICE RANGE
        </h3>
        <label className="flex items-center space-x-2 text-sm text-gray-700 mb-1">
          <input
            type="radio"
            name="price"
            value="under50"
            onChange={(e) => onPriceRangeChange?.(e.target.value)}
            className="accent-blue-500"
          />
          <span>Under ₹50</span>
        </label>
        <label className="flex items-center space-x-2 text-sm text-gray-700 mb-1">
          <input
            type="radio"
            name="price"
            value="50to100"
            onChange={(e) => onPriceRangeChange?.(e.target.value)}
            className="accent-blue-500"
          />
          <span>₹50 to ₹100</span>
        </label>
        <label className="flex items-center space-x-2 text-sm text-gray-700 mb-1">
          <input
            type="radio"
            name="price"
            value="over100"
            onChange={(e) => onPriceRangeChange?.(e.target.value)}
            className="accent-blue-500"
          />
          <span>Over ₹100</span>
        </label>
        <label className="flex items-center space-x-2 text-sm text-gray-700 mt-2">
          <input
            type="radio"
            name="price"
            value=""
            onChange={() => onPriceRangeChange?.("")}
            className="accent-blue-500"
          />
          <span>All</span>
        </label>
      </div>

      {/* Price Filter with Slider */}
      <div>
        <h3 className="text-sm font-semibold text-gray-500 mb-2">MAX PRICE</h3>
        <input
          type="range"
          min="100"
          max="5000"
          value={price}
          onChange={handlePriceChange}
          className="w-full accent-blue-500"
        />
        <p className="text-sm text-gray-700 mt-1">Up to ₹{price}</p>
      </div>
    </div>
  );
};

export default CarFilterSidebar;
