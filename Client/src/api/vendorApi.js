import api from "./axios"; 

export const getMyVendor = () => api.get("/vendor/me");
