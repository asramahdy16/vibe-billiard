import API from './axiosInstance';

export const login = async (credentials) => {
  const response = await API.post('/login', credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await API.post('/register', userData);
  return response.data;
};

export const logout = async () => {
  const response = await API.post('/logout');
  return response.data;
};

export const getMe = async () => {
  const response = await API.get('/user');
  return response.data;
};
