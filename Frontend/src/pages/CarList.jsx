import SearchHeader from '../componenets/searchHeader'
import CarFilterSidebar from '../componenets/filter'

function CarList() {
    return (
        <div className='bg-white'>

            <div className='border-b-[2px] border-b-[#eaf0f7]'>
                <SearchHeader />
            </div>

            <div className='h-[calc(100vh-100px)] flex'>
                <aside className='w-[22%] bg-white h-[calc(100vh-100px)] rounded-lg'>
                    <CarFilterSidebar />

                </aside>
                <main className='bg-[#F6F7F9] w-[78%] h-80'>

                </main>

            </div>


        </div>
    )
}

export default CarList