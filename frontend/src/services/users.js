import api from './api';

export const getUsers = (params = {}) => {
  return api.get('/api/users', { params });
};