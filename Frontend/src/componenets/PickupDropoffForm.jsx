import React from 'react';
import { FaExchangeAlt } from 'react-icons/fa';

const PickupDropoffForm = () => {
    const renderField = (label, placeholder) => (
        <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-800">{label}</span>
            <select className="text-sm mt-1 bg-transparent outline-none text-gray-500">
                <option>{placeholder}</option>
            </select>
        </div>
    );

    return (
        <div className="p-6 flex justify-center items-center">
            <div className="flex items-center space-x-4 p-6 rounded-2xl shadow-md bg-white">
                {/* Pick-Up */}
                <div className="space-y-4 bg-white">
                    <div className="flex items-center space-x-2">
                        <input type="radio" checked readOnly className="accent-blue-500" />
                        <span className="font-semibold text-gray-900">Pick – Up</span>
                    </div>
                    <div className="grid grid-cols-3 gap-9">
                        {renderField("Locations", "Select city")}
                        {renderField("Date", "Select date")}
                        {renderField("Time", "Select time")}
                    </div>
                </div>

                {/* Switch Button */}
                <div className="flex items-center justify-center mx-8">
                    <button className="w-10 h-10 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center">
                        <FaExchangeAlt size={18} />
                    </button>
                </div>

                {/* Drop-Off */}
                <div className="space-y-4 ml-3">
                    <div className="flex items-center space-x-2">
                        <input type="radio" checked readOnly className="accent-blue-500" />
                        <span className="font-semibold text-gray-900">Drop – Off</span>
                    </div>
                    <div className="grid grid-cols-3 gap-9">
                        {renderField("Locations", "Select city")}
                        {renderField("Date", "Select date")}
                        {renderField("Time", "Select time")}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PickupDropoffForm;
