const CarFilterSidebar = ({ onCategoryChange, onPriceRangeChange }) => {
    const carTypes = [
        'suv', 'sedan', 'hatchback'
    ];

    return (
        <div className="w-full bg-white p-8 space-y-6">
            {/* Category Filter */}
            <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-2">TYPE</h3>
                {carTypes.map((type) => (
                    <label key={type} className="flex items-center space-x-2 text-sm text-gray-700 mb-1">
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
                <h3 className="text-sm font-semibold text-gray-500 mb-2">PRICE RANGE</h3>
                <label className="flex items-center space-x-2 text-sm text-gray-700 mb-1">
                    <input
                        type="radio"
                        name="price"
                        value="under50"
                        onChange={(e) => onPriceRangeChange?.(e.target.value)}
                        className="accent-blue-500"
                    />
                    <span>Under $50</span>
                </label>
                <label className="flex items-center space-x-2 text-sm text-gray-700 mb-1">
                    <input
                        type="radio"
                        name="price"
                        value="50to100"
                        onChange={(e) => onPriceRangeChange?.(e.target.value)}
                        className="accent-blue-500"
                    />
                    <span>$50 to $100</span>
                </label>
                <label className="flex items-center space-x-2 text-sm text-gray-700 mb-1">
                    <input
                        type="radio"
                        name="price"
                        value="over100"
                        onChange={(e) => onPriceRangeChange?.(e.target.value)}
                        className="accent-blue-500"
                    />
                    <span>Over $100</span>
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
        </div>
    );
};

export default CarFilterSidebar;

