import api from "./apiClient";

export const notificationApi = {
    getNotifications: () => api.get("/notifications"),
};
