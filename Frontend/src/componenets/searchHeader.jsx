import React from 'react'
import { IoSearch } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function searchHeader() {
    const Navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

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

            <div className='w-12 h-12 rounded-full bg-white/20 text-purple-500 flex items-center justify-center text-lg font-bold hover:bg-white/30 transition-all cursor-pointer border-[2px] border-purple-500'
                title={user?.name}
                onClick={() => { Navigate('/user/dashboard') }}
            >
                <span className="text-2xl">{user?.name?.charAt(0) || 'U'}</span>
            </div>

        </div>
    )
}

export default searchHeader