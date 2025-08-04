import api from './api';

export const getAnalytics = (params = {}) => {
  return api.get('/api/analytics', { params });
};