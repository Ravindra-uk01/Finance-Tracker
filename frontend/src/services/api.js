import axios from 'axios';

console.log('API URL:', import.meta.env.VITE_APP_API_URL);
const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true
});

// Request interceptor to add headers, etc.
// api.interceptors.request.use((config) => {
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

// Response interceptor to handle errors
// api.interceptors.response.use((response) => response, (error) => {
//   if (error.response && error.response.status === 401) {
//     window.location.href = '/login';
//   }
//   return Promise.reject(error);
// });

export default api;