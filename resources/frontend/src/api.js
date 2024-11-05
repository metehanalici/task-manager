import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

// Her isteğe otomatik olarak token eklemek için interceptor ekleyin
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
