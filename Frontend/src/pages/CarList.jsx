import SearchHeader from '../componenets/searchHeader'
import CarFilterSidebar from '../componenets/filter'
import PickUppDroppOff from "../componenets/PickupDropoffForm"
import CarCard from '../componenets/CarCard'

function CarList() {
    const cars = [
        {
            image: "https://images.unsplash.com/photo-1605283176532-8be0bbf66f7d",
            title: "Tata Nexon",
            price: 45,
            transmission: "Automatic",
            features: ["GPS", "Bluetooth"],
        },
        {
            image: "https://images.unsplash.com/photo-1583267748285-abc98c1dcdf4",
            title: "Kia Seltos",
            price: 55,
            transmission: "Manual",
            features: ["AC", "GPS"],
        },
        {
            image: "https://images.unsplash.com/photo-1591076482161-7b6ea3ee6222",
            title: "Hyundai Creta",
            price: 60,
            transmission: "Automatic",
            features: ["Bluetooth", "Sunroof"],
        },
        {
            image: "https://images.unsplash.com/photo-1518448819042-9b2f75dca6c1",
            title: "Maruti Swift",
            price: 40,
            transmission: "Manual",
            features: ["AC", "USB Charger"],
        },
        {
            image: "https://images.unsplash.com/photo-1604754742629-1c560f7d5d9e",
            title: "Honda City",
            price: 70,
            transmission: "Automatic",
            features: ["GPS", "Leather Seats"],
        },
        {
            image: "https://images.unsplash.com/photo-1565043666747-69f6646db940",
            title: "Toyota Fortuner",
            price: 90,
            transmission: "Automatic",
            features: ["Bluetooth", "4x4"],
        },
        {
            image: "https://images.unsplash.com/photo-1580247811187-27b1d588f0dd",
            title: "Mahindra Thar",
            price: 85,
            transmission: "Manual",
            features: ["GPS", "Off-road"],
        },
        {
            image: "https://images.unsplash.com/photo-1625210852074-bba01290e64b",
            title: "Ford EcoSport",
            price: 50,
            transmission: "Automatic",
            features: ["Bluetooth", "USB Charger"],
        },
        {
            image: "https://images.unsplash.com/photo-1605554173130-1d5be3b4d0e7",
            title: "Skoda Kushaq",
            price: 65,
            transmission: "Automatic",
            features: ["Cruise Control", "GPS"],
        },
    ];


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
                        {
                            cars.map((car) => (
                                <CarCard
                                    key={car.title}
                                    image={car.image}
                                    title={car.title}
                                    price={car.price}
                                    transmission={car.transmission}
                                    features={car.features}
                                />
                            ))
                        }
                    </div>

                </main>

            </div>


        </div>
    )
}

export default CarList