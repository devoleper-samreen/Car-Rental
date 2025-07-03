import image from "../assets/A-43.webp";
import { FaUser } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import Card from "../componenets/Card";
import ferrariImg from "../assets/Ferrari_Vision_GT_front_02.jpg";
import bmwImg from "../assets/photo-1617469767053-d3b523a0b982.jpeg";
import bugattiImg from "../assets/Bugatti-Chiron-Grand-Sport.jpeg";
import supportImg from "../assets/soft-and-elegant-black-gradient-background-abstract-free-vector.jpg";
import { FaCalendarAlt } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa6";
import { FaUserShield } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const { user, admin } = useSelector((state) => state.auth);

  const [showDropdown, setShowDropdown] = useState(false);

  const cars = [
    {
      id: 1,
      name: "Mercedes-Benz S-Class",
      type: "Luxury Sedan",
      price: 299,
      image: ferrariImg,
    },
    {
      id: 2,
      name: "BMW X7",
      type: "Luxury SUV",
      price: 249,
      image: bmwImg,
    },
    {
      id: 3,
      name: "Bugatti",
      type: "Sports Car",
      price: 399,
      image: bugattiImg,
    },
  ];

  const getInitial = () => {
    if (user?.name) return user.name[0].toUpperCase();
    if (admin?.name) return admin.name[0].toUpperCase();
    return "U";
  };

  return (
    <>
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-screen text-white"
        style={{ backgroundImage: `url(${image})` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

        {/* Header Bar */}
        <div className="relative z-20 w-full flex justify-between items-center px-8 py-4">
          {/* Logo */}
          <Link
            to="/"
            className="ml-10 text-3xl font-bold text-white tracking-wide drop-shadow-lg hover:text-[#bfc9ff] transition-all"
          >
            Cars<span className="text-[#778CFF]">Now</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/list"
              className="px-6 py-3 bg-[#778CFF] text-white font-semibold rounded-full shadow-lg hover:bg-[#5c6edc] transition-all"
            >
              Book Now
            </Link>

            <div className="relative">
              {!(user || admin) ? (
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="cursor-pointer flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all duration-300 shadow-lg"
                >
                  <FaUser />
                  <span className="font-semibold">Login</span>
                </button>
              ) : (
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-12 h-12 rounded-full bg-[#778CFF] text-white flex items-center justify-center text-lg font-bold hover:bg-[#5c6edc] transition-all cursor-pointer"
                >
                  {getInitial()}
                </button>
              )}

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-xl shadow-lg py-2 space-y-2 z-30">
                  {!(user || admin) && !user ? (
                    <>
                      <Link
                        to="/user/login"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full"
                      >
                        <FaUser className="text-[#4F39F6]" />
                        User Login
                      </Link>
                      <Link
                        to="/admin/login"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full"
                      >
                        <FaUserShield className="text-[#4F39F6]" />
                        Admin Login
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/user/dashboard"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full"
                      >
                        <FaUser className="text-[#4F39F6]" />
                        User Dashboard
                      </Link>
                      {admin && (
                        <Link
                          to="/admin/dashboard"
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full"
                        >
                          <FaUserShield className="text-[#4F39F6]" />
                          Admin Dashboard
                        </Link>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="relative z-10 h-full max-w-[1000px] mx-auto flex flex-col justify-center gap-8 px-6">
          <h1 className="leading-tight text-7xl md:text-8xl font-bold text-white">
            Drive Your
            <br />
            <span className="text-[#778CFF]">Dreams</span>
          </h1>

          <p className="text-xl md:text-2xl">
            Experience luxury and comfort with our premium car rental service.{" "}
            <br />
            Choose from our wide selection of vehicles at competitive prices.
          </p>

          <div className="flex flex-wrap justify-around w-full p-6 rounded-2xl bg-white/10 backdrop-blur-md">
            <div className="text-center">
              <h2 className="text-4xl font-bold">500+</h2>
              <p className="text-gray-300">cars available</p>
            </div>
            <div className="text-center">
              <h2 className="text-4xl font-bold">1000+</h2>
              <p className="text-gray-300">happy customers</p>
            </div>
            <div className="text-center">
              <h2 className="text-4xl font-bold">50+</h2>
              <p className="text-gray-300">locations</p>
            </div>
            <div className="text-center">
              <h2 className="text-4xl font-bold">24/7</h2>
              <p className="text-gray-300">support</p>
            </div>
          </div>
        </div>
      </div>

      {/* featured section */}
      <div className="py-12 bg-[#111929] min-h-screen">
        <div className="max-w-[1000px] mx-auto p-6 text-white text-center">
          <h2 className="text-4xl font-bold m-4">Featured Vehicles</h2>
          <p className="text-[16px] text-gray-500">
            Choose from our exceptional collection
          </p>
          <div className="mt-20 flex gap-8">
            {cars.map((car) => (
              <Card
                key={car.id}
                name={car.name}
                image={car.image}
                type={car.type}
                price={car.price}
              />
            ))}
          </div>
        </div>
      </div>

      {/* support section */}
      <div
        style={{ backgroundImage: `url(${supportImg})` }}
        className="h-[75vh]"
      >
        <div className="max-w-[1000px] mx-auto py-28 flex justify-around items-center">
          <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
            <FaCar className="text-indigo-400 text-6xl mb-4" />
            <h3 className="text-xl font-bold text-white mb-4">
              Premium Selection
            </h3>
            <p className="text-gray-400">
              Luxury and comfort <br /> vehicles
            </p>
          </div>
          <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
            <FaCalendarAlt className="text-indigo-400 text-6xl mb-4" />
            <h3 className="text-xl font-bold text-white mb-4">Easy Booking</h3>
            <p className="text-gray-400">
              Quick reservation <br /> process
            </p>
          </div>
          <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
            <BiSupport className="text-indigo-400 text-6xl mb-4" />
            <h3 className="text-xl font-bold text-white mb-4">24/7 Support</h3>
            <p className="text-gray-400">Always here to help</p>
          </div>
          <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
            <AiFillSafetyCertificate className="text-indigo-400 text-6xl mb-4" />
            <h3 className="text-xl font-bold text-white mb-4">Safe & Secure</h3>
            <p className="text-gray-400">Fully insured vehicles</p>
          </div>
        </div>
      </div>

      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-500 transform -skew-y-6"></div>
        <div className="container mx-auto px-6 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-8">
              Ready for Your Next Adventure?
            </h2>
            <p className="text-xl text-white/80 mb-12">
              Get started with our easy booking process and experience the best
              in car rentals.
            </p>

            <a
              className="inline-flex items-center px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              href="/list"
              data-discover="true"
            >
              Book Now <FaArrowRight className="ml-2 font-extrabold" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
