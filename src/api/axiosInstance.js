import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach Token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Handle 401
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized (401) - Clearing auth state...');
      localStorage.removeItem('token');
      // Dynamically import store to avoid circular dependency
      import('../store/authStore').then(({ default: useAuthStore }) => {
        useAuthStore.getState().clearAuth();
      });
    }
    return Promise.reject(error);
  }
);

export default API;
