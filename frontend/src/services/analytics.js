import api from './api';

export const getAnalytics = (range = 'monthly') => {
  return api.get('/api/analytics', { params: { range } });
};
