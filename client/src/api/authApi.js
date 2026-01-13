import api from "./apiClient";

export const authApi = {
    register: (userData) => api.post("/register", userData),
    login: (credentials) => api.post("/login", credentials),
    getCurrentUser: () => api.get("/me"),
};
