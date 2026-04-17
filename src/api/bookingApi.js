import API from './axiosInstance';

export const createBooking = async (bookingData) => {
  const response = await API.post('/bookings', bookingData);
  return response.data;
};

export const getMyBookings = async () => {
  const response = await API.get('/bookings');
  return response.data;
};

export const getBookingById = async (id) => {
  const response = await API.get(`/bookings/${id}`);
  return response.data;
};

export const adminGetAllBookings = async () => {
  const response = await API.get('/admin/bookings');
  return response.data;
};

export const adminUpdateBookingStatus = async (id, status) => {
  const response = await API.patch(`/admin/bookings/${id}/status`, { status });
  return response.data;
};
