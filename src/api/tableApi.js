import API from './axiosInstance';

export const getTables = async () => {
  const response = await API.get('/tables');
  return response.data;
};

export const getTableById = async (id) => {
  const response = await API.get(`/tables/${id}`);
  return response.data;
};

export const adminGetTables = async () => {
  const response = await API.get('/admin/tables');
  return response.data;
};

export const adminCreateTable = async (data) => {
  const response = await API.post('/admin/tables', data);
  return response.data;
};

export const adminUpdateTable = async (id, data) => {
  const response = await API.put(`/admin/tables/${id}`, data);
  return response.data;
};

export const adminDeleteTable = async (id) => {
  const response = await API.delete(`/admin/tables/${id}`);
  return response.data;
};
