import { FaExchangeAlt } from 'react-icons/fa';

const PickupDropoffForm = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="flex items-center space-x-4 p-6 rounded-2xl shadow-md bg-white">
                {/* Pick-Up */}
                <div className="space-y-4 bg-white">
                    <div className="flex items-center space-x-2">
                        <input type="radio" checked readOnly className="accent-blue-500" />
                        <span className="font-semibold text-gray-900">Pick – Up</span>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                        {/* Location Input */}
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-gray-800">Location</span>
                            <input
                                type="text"
                                placeholder="Enter city"
                                className="text-sm mt-1 px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                            />
                        </div>

                        {/* Date Input */}
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-gray-800">Date</span>
                            <input
                                type="date"
                                className="text-sm mt-1 px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                            />
                        </div>

                        {/* Time Input */}
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-gray-800">Time</span>
                            <input
                                type="time"
                                className="text-sm mt-1 px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                            />
                        </div>
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
                    <div className="grid grid-cols-3 gap-6">
                        {/* Location Input */}
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-gray-800">Location</span>
                            <input
                                type="text"
                                placeholder="Enter city"
                                className="text-sm mt-1 px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                            />
                        </div>

                        {/* Date Input */}
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-gray-800">Date</span>
                            <input
                                type="date"
                                className="text-sm mt-1 px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                            />
                        </div>

                        {/* Time Input */}
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-gray-800">Time</span>
                            <input
                                type="time"
                                className="text-sm mt-1 px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PickupDropoffForm;

