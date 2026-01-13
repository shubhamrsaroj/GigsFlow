import api from "./apiClient";

export const bidApi = {
    placeBid: (bidData) => api.post("/bids", bidData),
    getGigBids: (gigId) => api.get(`/bids/${gigId}`),
    hireFreelancer: (bidId) => api.patch(`/bids/${bidId}/hire`),
};
