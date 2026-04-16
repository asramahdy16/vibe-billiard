import { create } from 'zustand';

const useBookingStore = create((set) => ({
  selectedTable: null,     // { id, nama_meja }
  selectedDate: null,      // Date string 'YYYY-MM-DD'
  startTime: null,         // 'HH:mm'
  endTime: null,           // 'HH:mm'
  selectedPackage: null,   // { id, nama_paket, harga }
  totalPrice: 0,

  setTable: (table) => set({ selectedTable: table }),
  setDateTime: (date, start, end) => set({ selectedDate: date, startTime: start, endTime: end }),
  setPackage: (pkg, total) => set({ selectedPackage: pkg, totalPrice: total }),
  
  resetBooking: () => set({
    selectedTable: null, 
    selectedDate: null,
    startTime: null, 
    endTime: null,
    selectedPackage: null, 
    totalPrice: 0,
  }),
}));

export default useBookingStore;
