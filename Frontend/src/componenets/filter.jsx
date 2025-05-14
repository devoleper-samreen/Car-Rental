import { useState } from 'react';

const CarFilterSidebar = () => {
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedCapacities, setSelectedCapacities] = useState([]);
    const [maxPrice, setMaxPrice] = useState(100);

    const carTypes = [
        { label: 'Sport', count: 10 },
        { label: 'SUV', count: 12 },
        { label: 'MPV', count: 16 },
        { label: 'Sedan', count: 20 },
        { label: 'Coupe', count: 14 },
        { label: 'Hatchback', count: 14 },
    ];

    const capacities = [
        { label: '2 Person', count: 10 },
        { label: '4 Person', count: 14 },
        { label: '6 Person', count: 12 },
        { label: '8 or More', count: 16 },
    ];

    const toggleFilter = (item, selectedList, setList) => {
        if (selectedList.includes(item)) {
            setList(selectedList.filter(i => i !== item));
        } else {
            setList([...selectedList, item]);
        }
    };

    return (
        <div className="w-full bg-white p-8 space-y-6">
            <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-2">TYPE</h3>
                {carTypes.map((type) => (
                    <label key={type.label} className="flex items-center space-x-2 text-sm text-gray-700 mb-1">
                        <input
                            type="checkbox"
                            checked={selectedTypes.includes(type.label)}
                            onChange={() => toggleFilter(type.label, selectedTypes, setSelectedTypes)}
                            className="accent-blue-500"
                        />
                        <span>{type.label} ({type.count})</span>
                    </label>
                ))}
            </div>

            <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-2">CAPACITY</h3>
                {capacities.map((cap) => (
                    <label key={cap.label} className="flex items-center space-x-2 text-sm text-gray-700 mb-1">
                        <input
                            type="checkbox"
                            checked={selectedCapacities.includes(cap.label)}
                            onChange={() => toggleFilter(cap.label, selectedCapacities, setSelectedCapacities)}
                            className="accent-blue-500"
                        />
                        <span>{cap.label} ({cap.count})</span>
                    </label>
                ))}
            </div>

            <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-2">PRICE</h3>
                <input
                    type="range"
                    min="0"
                    max="200"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full accent-blue-500"
                />
                <p className="text-sm text-gray-700 mt-1">Max. ${maxPrice}.00</p>
            </div>
        </div>
    );
};

export default CarFilterSidebar;
