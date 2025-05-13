import image from "../assets/A-43.webp";
import { FaUser } from "react-icons/fa";

function Home() {
    return (
        <>
            <div
                className="relative bg-cover bg-center h-screen text-white"
                style={{ backgroundImage: `url(${image})` }}
            >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black opacity-50"></div>

                <div class="relative w-[100%] flex justify-end p-6">
                    <button class="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all duration-300 shadow-lg">
                        <FaUser />
                        <span class="font-semibold">Login</span></button>
                </div>

                {/* Text Content */}
                <div className="relative z-10 h-full max-w-[1000px] mx-auto flex flex-col flex-start gap-8">

                    <h1 className="leading-tight text-8xl font-bold text-white">
                        Drive Your
                        <br />
                        <span className="text-[#778CFF]">Dreams</span>
                    </h1>

                    <p className="text-2xl">Experience luxury and comfort with our premium car rental service. <br />Choose from our wide selection of vehicles at competitive prices.</p>

                    <div className="flex justify-around w-[100%] p-6 rounded-2xl bg-white/10 backdrop-blur-md">
                        <div>
                            <h2 className="text-4xl font-bold">500+</h2>
                            <p className="text-gray-300">cars available</p>
                        </div>
                        <div>
                            <h2 className="text-4xl font-bold">1000+</h2>
                            <p className="text-gray-300">happy customers</p>
                        </div>
                        <div>
                            <h2 className="text-4xl font-bold">50+</h2>
                            <p className="text-gray-300">locations</p>
                        </div>
                        <div>
                            <h2 className="text-4xl font-bold">24/7</h2>
                            <p className="text-gray-300">support</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Home;
