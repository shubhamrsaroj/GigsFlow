import api from "./apiClient";

export const gigApi = {
    createGig: (gigData) => api.post("/gigs", gigData),
    getAllGigs: (search = "") => api.get(`/gigs?search=${search}`),
    getGigById: (id) => api.get(`/gigs/${id}`),
};
