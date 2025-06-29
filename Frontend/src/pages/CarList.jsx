import { useState, useEffect } from 'react';
import SearchHeader from '../componenets/searchHeader';
import CarFilterSidebar from '../componenets/filter';
import CarCard from '../componenets/CarCard';
import AxiosInstance from '../apiManager/axiosInstance';
import { Modal, Button, Descriptions, Image, Input } from 'antd';
import PickupDropoffForm from '../componenets/PickupDropoffForm';
import { loadStripe } from '@stripe/stripe-js';


function CarList() {
    const [filteredCars, setFilteredCars] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [priceRange, setPriceRange] = useState('');

    const [selectedCar, setSelectedCar] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    // New state
    const [pickupDropoffData, setPickupDropoffData] = useState({
        pickupLocation: '',
        pickupDate: '',
        pickupTime: '',
        dropoffLocation: '',
        dropoffDate: '',
        dropoffTime: '',
    });


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

    const handleCarClick = (car) => {
        setSelectedCar(car);
        setModalVisible(true);
    };

    const calculateTotalDaysAndPrice = () => {
        const pickupDate = new Date(pickupDropoffData.pickupDate);
        const dropoffDate = new Date(pickupDropoffData.dropoffDate);
        const diffTime = Math.abs(dropoffDate - pickupDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const totalPrice = diffDays * selectedCar.price;
        return { totalPrice, totalDays: diffDays };
    };

    useEffect(() => {
        if (selectedCar) {
            const { totalPrice, totalDays } = calculateTotalDaysAndPrice();
            console.log('Total Price:', totalPrice);
            console.log('Total Days:', totalDays);
        }
    }
        , [pickupDropoffData, selectedCar]);


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
                        {/* {filteredCars.length > 0 ? (
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
                        )} */}

                        {filteredCars.length > 0 ? (
                            filteredCars.map((car) => (
                                <div key={car.id} className="relative bg-white rounded-xl shadow-lg">
                                    <CarCard
                                        image={car.image}
                                        title={car.name}
                                        price={car.price}
                                        transmission={car.transmission}
                                        features={car.features}
                                    />
                                    <Button
                                        type="primary"
                                        className="absolute bottom-4 left-1/2 -translate-x-1/2"
                                        onClick={() => handleCarClick(car)}
                                    >
                                        Book Now
                                    </Button>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 col-span-3">No cars found.</p>
                        )}
                    </div>
                </main>
            </div >

            {/* Modal */}
            < Modal
                title="Car Booking Summary"
                open={modalVisible}
                onCancel={() => setModalVisible(false)
                }
                footer={null}
                width={700}
            >
                {selectedCar && (
                    <>
                        <Image
                            src={selectedCar.image}
                            alt={selectedCar.name}
                            width="100%"
                            style={{ borderRadius: 10, marginBottom: 20 }}
                        />

                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="Car Name">{selectedCar.name}</Descriptions.Item>
                            <Descriptions.Item label="Model">{selectedCar.model || 'N/A'}</Descriptions.Item>
                            <Descriptions.Item label="Brand">{selectedCar.brand || 'N/A'}</Descriptions.Item>
                            <Descriptions.Item label="Transmission">{selectedCar.transmission}</Descriptions.Item>
                            <Descriptions.Item label="Price per Day">₹{selectedCar.price}</Descriptions.Item>
                            {/*add fuel type */}
                            <Descriptions.Item label="Fuel Type">{selectedCar.fuelType || 'N/A'}</Descriptions.Item>
                            <Descriptions.Item label="Features">
                                <ul className="list-disc pl-5">
                                    {selectedCar.features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </Descriptions.Item>
                        </Descriptions>
                        <PickupDropoffForm onChange={(data) => setPickupDropoffData(data)} />
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold">Total Days:</h3>
                            <p className="text-xl font-bold">{calculateTotalDaysAndPrice().totalDays}</p>
                        </div>

                        <div className="mt-4">
                            <h3 className="text-lg font-semibold">Total Price:</h3>
                            <p className="text-xl font-bold">₹{
                                calculateTotalDaysAndPrice().totalPrice}</p>
                        </div>
                        <Button
                            type="primary"
                            block
                            size="large"
                            style={{ marginTop: 20 }}
                            
                        >
                            Book Now
                        </Button>
                    </>
                )}
            </Modal >
        </div >
    );
}

export default CarList;
