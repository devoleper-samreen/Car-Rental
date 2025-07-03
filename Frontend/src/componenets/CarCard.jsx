import { FaCar } from "react-icons/fa";

const CarCard = ({ image, title, price, transmission, features }) => {
  return (
    <div className="max-w-xs bg-white rounded-2xl overflow-hidden mb-5">
      {/* Image & Price Badge */}
      <div className="relative">
        <img src={image} alt={title} className="w-full h-40 object-cover" />
        <span className="absolute top-2 right-2 bg-indigo-600 text-white text-sm px-3 py-1 rounded-full">
          ₹{price}/day
        </span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="text-lg font-semibold">{title}</h3>

        <div className="flex items-center text-sm text-gray-600 space-x-2">
          <FaCar className="text-indigo-600" />
          <span>{transmission}</span>
        </div>

        {/* Tags */}
        <div className="flex gap-2 flex-wrap">
          {features.map((feature, index) => (
            <span
              key={index}
              className="bg-gray-100 text-xs px-3 py-1 rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarCard;
