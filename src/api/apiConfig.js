import axios from 'axios';

// Professional API configuration using environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach auth tokens automatically
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const adminToken = localStorage.getItem('adminToken');
    
    // Attach auth token based on request type
    // We strictly prioritize adminToken for any /admin paths
    if (config.url.includes('/admin') && adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    } else if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access globally (e.g., redirect to login)
      console.error('Session expired or unauthorized. Please login again.');
      // Optional: localStorage.clear(); window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
