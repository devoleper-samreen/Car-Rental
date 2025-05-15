import React from 'react'
import { IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom';

function searchHeader() {
    return (
        <div className='max-w-[1100px] mx-auto h-24 bg-white flex items-center p-4 justify-between'>

            <div>
                <Link to='/' className='text-3xl font-bold text-[#4F3CF7]'>RidezOn</Link>
            </div>

            <div className='flex items-center gap-2 border-[2px] border-[#eaf0f7] px-6 py-2 rounded-full w-[400px]'>
                <div>
                    <IoSearch />
                </div>
                <div>
                    <input type="text" placeholder='Search by name'
                        className='outline-none border-none w-[300px]'
                    />
                </div>
            </div>

            <div className='w-12 h-12 rounded-full'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsynwv-5qtogtOwJbIjaPFJUmHpzhxgqIAug&s" alt="profile"
                    className='w-full h-full object-cover rounded-full'
                />
            </div>

        </div>
    )
}

export default searchHeader