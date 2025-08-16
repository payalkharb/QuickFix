// src/api/api.js
import axios from "axios";

// Use fallback if environment variable is undefined
const baseURL = import.meta.env.VITE_API_URL || "";

const api = axios.create({
  baseURL,
  headers: { Accept: "application/json" },
  timeout: 10000,
});

// Optionally add auth token header interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // or from Zustand store
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
