import axios from 'axios';

const API = import.meta.env.VITE_API_URL;
const api = axios.create({
    baseURL: API,
    withCredentials: true,
})

export const registerUser = (data) => api.post("/api/users/register", data);
export const loginUser = (data) => api.post("/api/users/login", data);

// Get current user
export const getCurrentUser = () => api.get("/api/users/me");

export default api;