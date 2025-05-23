import SearchHeader from '../componenets/searchHeader'
import CarFilterSidebar from '../componenets/filter'
import PickUppDroppOff from "../componenets/PickupDropoffForm"
import CarCard from '../componenets/CarCard'
import { useState } from 'react'
import AxiosInstance from '../apiManager/axiosInstance'
import { useEffect } from 'react'

function CarList() {
    const [filteredCars, setFilteredCars] = useState([]);

    const getAllCars = async () => {
        try {
            const response = await AxiosInstance.get("/api/car/all-cars");
            console.log(response);

            setFilteredCars(response.data.cars);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllCars();
    }, [])


    return (
        <div className='bg-white'>

            <div className='border-b-[2px] border-b-[#eaf0f7]'>
                <SearchHeader />
            </div>

            <div className='h-[calc(100vh-100px)] flex'>
                <aside className='w-[22%] bg-white h-[calc(100vh-100px)] rounded-lg'>
                    <CarFilterSidebar />

                </aside>
                <main className='bg-[#F6F7F9] w-[78%] h-[calc(100vh-100px)] overflow-auto'>
                    <div className='bg-[#F6F7F9]'>
                        <PickUppDroppOff />
                    </div>
                    <div className='grid grid-cols-3 gap-4 p-10'>

                        {filteredCars?.map((car) => (
                            <CarCard
                                key={car._id}
                                image={car.image}
                                title={car.name}
                                price={car.pricePerDay}
                                transmission={car.transmission}
                                features={car.features}
                            />
                        ))}
                    </div>

                </main>

            </div>


        </div>
    )
}

export default CarList