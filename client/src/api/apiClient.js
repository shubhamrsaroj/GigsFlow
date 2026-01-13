import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/auth",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.response.use((res) => res, (error) => {
    if (error.response && error.response.status === 401) {
        // Check if the request explicitly wants to handle 401 itself (e.g., checking login status)
        if (!error.config._suppressAuthRedirect) {
            window.location.href = "/login";
        }
    }
    return Promise.reject(error);
});

export default api;
