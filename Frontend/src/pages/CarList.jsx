import { useState, useEffect } from 'react';
import SearchHeader from '../componenets/searchHeader';
import CarFilterSidebar from '../componenets/filter';
import CarCard from '../componenets/CarCard';
import AxiosInstance from '../apiManager/axiosInstance';

function CarList() {
    const [filteredCars, setFilteredCars] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [priceRange, setPriceRange] = useState('');

    // Fetch filtered cars from backend
    const fetchFilteredCars = async () => {
        try {
            console.log('Fetching cars with filters:', { search, category, priceRange });
            const response = await AxiosInstance.get('/api/car/search', {
                params: {
                    search,
                    category,
                    priceRange
                }
            });
            console.log(response);


            setFilteredCars(response.data.data); // use the .data array from backend response
        } catch (error) {
            console.log('Error fetching cars:', error);
        }
    };

    // Fetch cars when filters/search change
    useEffect(() => {
        fetchFilteredCars();
    }, [search, category, priceRange]);

    return (
        <div className="bg-white">
            {/* Search bar */}
            <div className="border-b-[2px] border-b-[#eaf0f7]">
                <SearchHeader onSearch={(value) => setSearch(value)} />
            </div>

            {/* Main content layout */}
            <div className="h-[calc(100vh-100px)] flex">
                {/* Sidebar filters */}
                <aside className="w-[22%] bg-white h-[calc(100vh-100px)] rounded-lg">
                    <CarFilterSidebar
                        onCategoryChange={(value) => setCategory(value)}
                        onPriceRangeChange={(value) => setPriceRange(value)}
                    />
                </aside>

                {/* Car listing */}
                <main className="bg-[#F6F7F9] w-[78%] h-[calc(100vh-100px)] overflow-auto">
                    <div className="grid grid-cols-3 gap-4 p-10">
                        {filteredCars.length > 0 ? (
                            filteredCars.map((car) => (
                                <CarCard
                                    key={car.id}
                                    image={car.image}
                                    title={car.name}
                                    price={car.price}
                                    transmission={car.transmission}
                                    features={car.features}
                                />
                            ))
                        ) : (
                            <p className="text-gray-500 col-span-3">No cars found.</p>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default CarList;
