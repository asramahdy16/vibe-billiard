import API from './axiosInstance';

export const processPayment = async (bookingId, paymentData) => {
  const response = await API.post(`/bookings/${bookingId}/payment`, paymentData);
  return response.data;
};

export const adminGetAllPayments = async () => {
  const response = await API.get('/admin/payments');
  return response.data;
};

export const adminUpdatePaymentStatus = async (id, status) => {
  const response = await API.patch(`/admin/payments/${id}/status`, { status_bayar: status });
  return response.data;
};
