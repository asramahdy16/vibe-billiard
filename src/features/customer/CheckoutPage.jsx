import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useBookingStore from '../../store/bookingStore';
import * as bookingApi from '../../api/bookingApi';
import * as paymentApi from '../../api/paymentApi';
import { Loader2, ArrowLeft, Wallet, Building2, Smartphone } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const CheckoutPage = () => {
  const { selectedTable, selectedDate, startTime, endTime, selectedPackage, totalPrice, resetBooking } = useBookingStore();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);

  if (!selectedTable || !selectedPackage) {
    return (
      <div className="flex flex-col items-center justify-center p-20 min-h-[60vh]">
        <div className="glass-panel rounded-2xl border border-outline-variant/10 p-8 text-center">
          <span className="text-5xl mb-4 block">⚠️</span>
          <h2 className="text-2xl font-bold text-on-surface mb-2">Data pemesanan tidak ditemukan</h2>
          <p className="text-on-surface-variant mb-6">Silakan mulai proses booking dari awal.</p>
          <Link to="/booking" className="btn-primary inline-block">Ke Halaman Booking</Link>
        </div>
      </div>
    );
  }

  const handleConfirm = async () => {
    if (!paymentMethod) {
      toast.error('Silakan pilih metode pembayaran');
      return;
    }

    setLoading(true);
    try {
      // 1. Create Booking
      // selectedDate is already in local YYYY-MM-DD format
      const bookingResp = await bookingApi.createBooking({
        table_id: selectedTable.id,
        package_id: selectedPackage.id,
        tanggal: selectedDate,
        waktu_mulai: startTime,
        waktu_selesai: endTime,
        catatan: `Metode pembayaran: ${paymentMethod}`
      });

      const bookingId = bookingResp.data.id;

      // 2. Create Payment Record
      let metode = 'transfer';
      if (paymentMethod.includes('Cash')) metode = 'cash';
      else if (paymentMethod.includes('E-Wallet')) metode = 'ewallet';

      await paymentApi.processPayment(bookingId, {
        metode: metode,
        bukti_transfer: null // Placeholder for now
      });

      toast.success('Pemesanan berhasil dibuat!');
      
      // Navigate and pass booking data
      navigate('/booking/success', { state: { booking: bookingResp.data } });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Gagal membuat pesanan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const payments = [
    { label: 'Bayar di Kasir (Cash)', icon: <Wallet className="h-5 w-5" /> },
    { label: 'Transfer Bank', icon: <Building2 className="h-5 w-5" /> },
    { label: 'E-Wallet (GoPay/OVO/Dana)', icon: <Smartphone className="h-5 w-5" /> },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 lg:p-8 py-8 pb-24 md:pb-8">
      <Link to="/booking" className="inline-flex items-center text-on-surface-variant hover:text-primary mb-6 transition-all font-medium gap-2">
        <ArrowLeft className="h-5 w-5" /> Kembali ke Booking
      </Link>

      <h1 className="text-4xl md:text-5xl font-black tracking-tight text-on-surface mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Ringkasan */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="card-elevated p-6 md:p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-container"></div>
          <h2 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-6">Ringkasan Pesanan</h2>
          
          <div className="space-y-5 text-on-surface-variant flex-1">
            {[
              { label: 'Meja', value: selectedTable.nama_meja || selectedTable.name },
              { label: 'Tanggal', value: formatDate(selectedDate) },
              { label: 'Waktu', value: `${startTime} - ${endTime}` },
              { label: 'Paket', value: selectedPackage.name },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-sm">{item.label}</span>
                <span className="font-bold text-on-surface text-right">{item.value}</span>
              </div>
            ))}

            <div className="border-t border-outline-variant/10 pt-5 flex justify-between items-center mt-auto">
              <span className="font-bold text-lg text-on-surface">Total Harga</span>
              <span className="text-3xl font-black text-primary">Rp {totalPrice.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </motion.div>

        {/* Metode Pembayaran */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h2 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-6">Metode Pembayaran</h2>
          <div className="space-y-3 mb-8">
            {payments.map(method => (
              <label 
                key={method.label} 
                onClick={() => setPaymentMethod(method.label)}
                className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all duration-300 group
                  ${paymentMethod === method.label 
                    ? 'border-primary bg-primary/10 ring-1 ring-primary shadow-[0_0_15px_rgba(173,198,255,0.15)] scale-[1.02]' 
                    : 'border-outline-variant/10 bg-surface-container-low hover:bg-surface-container-high'}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 transition-all
                  ${paymentMethod === method.label ? 'bg-primary/20 text-primary' : 'bg-surface-container text-on-surface-variant group-hover:text-on-surface'}`}>
                  {method.icon}
                </div>
                <span className="font-bold text-on-surface">{method.label}</span>
                <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center
                  ${paymentMethod === method.label ? 'border-primary bg-primary' : 'border-outline'}`}>
                  {paymentMethod === method.label && <motion.div initial={{scale:0}} animate={{scale:1}} className="w-2 h-2 bg-on-primary-container rounded-full" />}
                </div>
              </label>
            ))}
          </div>

          <button 
            onClick={handleConfirm}
            disabled={loading}
            className="btn-primary w-full !py-4 text-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <><Loader2 className="h-5 w-5 animate-spin" /> MEMPROSES...</>
            ) : (
              'KONFIRMASI BOOKING'
            )}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default CheckoutPage;
