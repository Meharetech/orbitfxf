import api from '../api/apiConfig';

// Clear ALL old token keys to avoid stale data
const clearOldKeys = () => {
    localStorage.removeItem('token');      // old key (unused, but clear it)
    localStorage.removeItem('adminToken'); // only remove on user login
};

// Register user
const register = async (userData) => {
    const response = await api.post(`/auth/register`, userData);
    if (response.data) {
        clearOldKeys();
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

// Login user
const login = async (userData) => {
    const response = await api.post(`/auth/login`, userData);
    if (response.data) {
        clearOldKeys();
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

// Logout user
const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
};

// Get user profile
const getProfile = async () => {
    const response = await api.get(`/auth/profile`);
    return response.data;
};

// Get sponsor name by code
const getSponsorByCode = async (code) => {
    const response = await api.get(`/auth/sponsor/${code}`);
    return response.data;
};

// Update password
const updatePassword = async (passwordData) => {
    const response = await api.put(`/auth/updatepassword`, passwordData);
    return response.data;
};

const authService = {
    register,
    login,
    logout,
    getProfile,
    getSponsorByCode,
    updatePassword,
};

export default authService;
