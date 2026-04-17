import API from './axiosInstance';

export const getDashboardStats = async () => {
  const response = await API.get('/admin/dashboard/stats');
  return response.data;
};
