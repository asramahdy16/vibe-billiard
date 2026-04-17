import API from './axiosInstance';

export const getPackages = async () => {
  const response = await API.get('/packages');
  return response.data;
};

export const adminGetPackages = async () => {
  const response = await API.get('/admin/packages');
  return response.data;
};

export const adminUpdatePackage = async (id, data) => {
  const response = await API.put(`/admin/packages/${id}`, data);
  return response.data;
};
