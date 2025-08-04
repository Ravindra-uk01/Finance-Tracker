import api from './api';

export const register = (userData) => api.post('/api/auth/register', userData);
export const login = (userData) => api.post('/api/auth/login', userData);
export const logout = () => api.post('/api/auth/logout');
export const getMe = () => api.get('/api/auth/me');