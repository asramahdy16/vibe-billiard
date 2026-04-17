import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useBookingStore from '../../store/bookingStore';

const BookingSuccessPage = () => {
  const location = useLocation();
  const { resetBooking } = useBookingStore();
  
  // Ambil data dari state navigasi if available
  const bookingData = location.state?.booking;
  
  useEffect(() => {
    return () => resetBooking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 pb-24 md:pb-4 relative">
      {/* Background celebration glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-tertiary/5 rounded-full blur-3xl animate-glow-pulse"></div>
      
      <div className="max-w-md w-full flex flex-col items-center relative z-10">
        
        {/* Success Icon */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full bg-tertiary/10 flex items-center justify-center border-2 border-tertiary/30">
            <span className="text-5xl">✅</span>
          </div>
          <div className="absolute -inset-4 rounded-full border border-tertiary/10 animate-ping" style={{ animationDuration: '3s' }}></div>
        </div>
        
        <h1 className="text-4xl font-black tracking-tight text-on-surface mb-2">Booking Berhasil!</h1>
        <p className="text-on-surface-variant text-center mb-8">
          Pesanan Anda telah kami terima. Tunjukkan tiket ini ke kasir.
        </p>

        {/* Digital Ticket */}
        <div className="w-full rounded-2xl overflow-hidden border border-outline-variant/10 shadow-[0_20px_60px_-15px_rgba(0,40,93,0.3)] mb-8">
          {/* Ticket Header */}
          <div className="bg-gradient-to-r from-primary/20 to-primary-container/10 p-5 border-b border-outline-variant/10 text-center">
            <h2 className="font-black tracking-[0.3em] text-primary text-sm uppercase">Tiket Booking</h2>
            <p className="text-xs text-on-surface-variant mt-1 font-mono">#BK-20260416-001</p>
          </div>
          
          <div className="bg-surface-container-high p-6 space-y-5">
            <div>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Meja</p>
              <p className="font-bold text-xl text-on-surface">{bookingData?.table?.nama_meja || 'Pemesanan'}</p>
            </div>
            
            <div className="flex justify-between">
              <div>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Tanggal</p>
                <p className="font-bold text-on-surface">{formatDate(bookingData?.tanggal)}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Jam</p>
                <p className="font-bold text-on-surface">{bookingData?.waktu_mulai} - {bookingData?.waktu_selesai}</p>
              </div>
            </div>

            <div>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Paket</p>
              <p className="font-bold text-on-surface">{bookingData?.package?.nama_paket || 'Reguler'}</p>
            </div>

            {/* Dashed separator */}
            <div className="border-t-2 border-dashed border-outline-variant/20 pt-5">
              <div className="flex justify-between items-center mb-3">
                <p className="text-on-surface-variant text-sm">Total</p>
                <p className="font-black text-2xl text-primary">Rp {Number(bookingData?.total_harga || 0).toLocaleString('id-ID')}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-on-surface-variant text-sm">Status</p>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-primary/20">
                  {bookingData?.status || 'Pending'}
                </span>
              </div>
            </div>
          </div>

          {/* Barcode area */}
          <div className="bg-surface-container p-6 flex justify-center items-center border-t border-outline-variant/10">
            <div className="h-12 w-full max-w-[200px] flex items-center justify-center gap-[2px]">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="bg-on-surface/40 h-full" style={{ width: `${Math.random() > 0.5 ? 3 : 1}px` }}></div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4 w-full">
          <Link to="/my-bookings" className="btn-secondary flex-1 text-center">
            Lihat Riwayat
          </Link>
          <Link to="/dashboard" className="btn-primary flex-1 text-center">
            Selesai
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccessPage;
