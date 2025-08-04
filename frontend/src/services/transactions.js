import api from './api';

export const getTransactions = (params = {}) => {
  return api.get('/api/transactions', { params });
};

export const createTransaction = (data) => {
  return api.post('/api/transactions', data);
};

export const updateTransaction = (id, data) => {
  return api.put(`/api/transactions/${id}`, data);
};

export const deleteTransaction = (id) => {
  return api.delete(`/api/transactions/${id}`);
};