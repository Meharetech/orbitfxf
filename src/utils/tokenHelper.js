// Centralized token helper - all API calls must use this

export const getToken = () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        return user?.token || null;
    } catch {
        return null;
    }
};

export const getAuthHeader = () => {
    const token = getToken();
    if (!token) return {};
    return { Authorization: `Bearer ${token}` };
};

export const clearSession = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // clear any old stale keys too
    localStorage.removeItem('adminToken');
};

export const isLoggedIn = () => !!getToken();
