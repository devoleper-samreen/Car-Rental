import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
});


// axiosInstance.interceptors.request.use((config) => {
//     const token = localStorage.getItem("token"); 
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status;
        const message = error?.response?.data?.message || error.message;

        // Log the error clearly
        console.error(`API Error [${status}]:`, message);

        //  You can handle specific errors globally
        if (status === 401) {
            console.warn("Unauthorized! Redirecting to login...");
            // window.location.href = "/login"; // Uncomment if you want to redirect
        }

        if (status === 500) {
            console.warn("Server Error! Try again later.");
        }

        // You can show a toast here if using something like react-toastify

        return Promise.reject(error);
    }
);

export default axiosInstance;
