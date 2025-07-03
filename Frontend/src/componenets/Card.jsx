function Card({ image = "", name, type, price }) {
  return (
    <div className="bg-[#1e293b] rounded-xl p-4 w-[300px] text-white shadow-md hover:scale-105 transition-transform">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />

      <div className="text-start p-4">
        <h2 className="text-xl font-bold ">{name}</h2>
        <p className="text-sm text-gray-400 my-2">{type}</p>
      </div>

      <div className="flex justify-between items-center p-4">
        {/* ⭐ Rating */}
        <div className="text-yellow-400 flex gap-1 text-sm">
          {Array(5).fill("⭐")}
        </div>

        {/* Price */}
        <p className="text-white font-medium">{`₹${price}/day`}</p>
      </div>
    </div>
  );
}

export default Card;
