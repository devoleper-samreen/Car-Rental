import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        "Content-Type": "application/json",
    },
});


axiosInstance.interceptors.request.use((config) => {
    const userToken = localStorage.getItem("userToken");
    const adminToken = localStorage.getItem("adminToken");
    const token = userToken || adminToken;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

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
        }

        if (status === 500) {
            console.warn("Server Error! Try again later.");
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
