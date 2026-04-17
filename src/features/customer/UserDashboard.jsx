import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import * as bookingApi from '../../api/bookingApi';
import { ArrowRight, CalendarCheck, Clock, TrendingUp, Zap, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const UserDashboard = () => {
  const { user } = useAuthStore();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const resp = await bookingApi.getMyBookings();
      setBookings(resp.data);
    } catch (error) {
      console.error(error);
      toast.error('Gagal memuat data dashboard.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Logic for Active Booking (first confirmed or in_progress)
  const activeBooking = bookings.find(b => b.status === 'confirmed' || b.status === 'in_progress');
  
  // Logic for Recent Bookings (top 3)
  const recentBookings = bookings.slice(0, 3);

  // Statistics Calculation
  const stats = {
    totalBookings: bookings.length,
    totalHours: bookings.reduce((acc, b) => acc + Number(b.durasi_jam || 0), 0),
    totalPaid: bookings.reduce((acc, b) => acc + Number(b.total_harga || 0), 0),
  };

  const formatDate = (dateString, short = false) => {
    if (!dateString) return '';
    const opt = short 
      ? { day: 'numeric', month: 'short', year: 'numeric' }
      : { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', opt);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-5 md:p-8 max-w-screen-xl mx-auto">
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-on-surface mb-1">
          Halo, {user?.name || 'User'}! 👋
        </h1>
        <p className="text-on-surface-variant">Siap bermain hari ini? Pesan mejamu sekarang.</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Link to="/booking" className="card-elevated p-5 group hover:shadow-[0_10px_30px_-10px_rgba(0,40,93,0.3)] transition-all duration-500 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
            <CalendarCheck className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-on-surface">Booking Baru</p>
            <p className="text-xs text-on-surface-variant">Pesan meja sekarang</p>
          </div>
          <ArrowRight className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
        </Link>

        <Link to="/my-bookings" className="card-elevated p-5 group hover:shadow-[0_10px_30px_-10px_rgba(0,40,93,0.3)] transition-all duration-500 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-tertiary/10 text-tertiary flex items-center justify-center group-hover:scale-110 transition-transform">
            <Clock className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-on-surface">Riwayat</p>
            <p className="text-xs text-on-surface-variant">Lihat semua booking</p>
          </div>
          <ArrowRight className="w-5 h-5 text-on-surface-variant group-hover:text-tertiary transition-colors" />
        </Link>

        <Link to="/profile" className="card-elevated p-5 group hover:shadow-[0_10px_30px_-10px_rgba(0,40,93,0.3)] transition-all duration-500 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
            <Zap className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-on-surface">Profil Saya</p>
            <p className="text-xs text-on-surface-variant">Edit data akun</p>
          </div>
          <ArrowRight className="w-5 h-5 text-on-surface-variant group-hover:text-secondary transition-colors" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Booking */}
        <div className="lg:col-span-1">
          <h2 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-4">Booking Aktif</h2>
          {activeBooking ? (
            <div className="card-elevated p-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-tertiary to-tertiary-container"></div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider border bg-tertiary/10 text-tertiary border-tertiary/20">
                  {activeBooking.status === 'confirmed' ? 'Dikonfirmasi' : 'Bermain'}
                </span>
                <span className="text-xs font-mono text-on-surface-variant">#BK-{activeBooking.id.toString().padStart(6, '0')}</span>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-2xl">🎱</div>
                <div>
                  <p className="font-bold text-lg text-on-surface">{activeBooking.table?.nama_meja || 'Meja'}</p>
                  <p className="text-sm text-on-surface-variant">{activeBooking.package?.nama_paket || 'Reguler'}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Tanggal</p>
                  <p className="text-sm font-bold text-on-surface">{formatDate(activeBooking.tanggal, true)}</p>
                </div>
                <div>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Waktu</p>
                  <p className="text-sm font-bold text-on-surface">{activeBooking.waktu_mulai} - {activeBooking.waktu_selesai}</p>
                </div>
              </div>
              <div className="pt-3 border-t border-outline-variant/10">
                <p className="text-xs text-on-surface-variant text-center">Tunjukkan tiket ini ke kasir saat datang</p>
              </div>
            </div>
          ) : (
            <div className="card-elevated p-8 text-center h-[260px] flex flex-col justify-center border border-dashed border-outline-variant/20">
              <CalendarCheck className="w-12 h-12 text-on-surface-variant/20 mx-auto mb-3" />
              <p className="text-on-surface-variant text-sm">Tidak ada booking aktif.</p>
              <Link to="/booking" className="btn-primary inline-block mt-4 !px-6 !py-2 text-sm self-center">Booking Sekarang</Link>
            </div>
          )}
        </div>

        {/* Statistik Singkat + Recent */}
        <div className="lg:col-span-2 space-y-6">
          {/* Mini Stats */}
          <div>
            <h2 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-4">Statistik Bermain</h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Total Booking', value: stats.totalBookings, icon: <CalendarCheck className="w-5 h-5" />, color: 'primary' },
                { label: 'Jam Bermain', value: `${stats.totalHours} Jam`, icon: <Clock className="w-5 h-5" />, color: 'tertiary' },
                { label: 'Total Bayar', value: `Rp ${stats.totalPaid.toLocaleString('id-ID')}`, icon: <TrendingUp className="w-5 h-5" />, color: 'secondary' },
              ].map((s, i) => (
                <div key={i} className="card-elevated p-4 text-center">
                  <div className={`w-10 h-10 rounded-xl bg-surface-container text-${s.color} flex items-center justify-center mx-auto mb-2`}>
                    {s.icon}
                  </div>
                  <p className="text-xl font-black text-on-surface">{s.value}</p>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Bookings */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Riwayat Terakhir</h2>
              <Link to="/my-bookings" className="text-primary text-xs font-bold hover:underline">Lihat Semua →</Link>
            </div>
            <div className="card-elevated overflow-hidden">
              <div className="divide-y divide-outline-variant/10">
                {recentBookings.map((bk, i) => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-lg">🎱</div>
                      <div>
                        <p className="font-bold text-sm text-on-surface">{bk.table?.nama_meja || 'Meja'}</p>
                        <p className="text-xs text-on-surface-variant">{formatDate(bk.tanggal, true)} · {bk.waktu_mulai} - {bk.waktu_selesai}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm text-primary">Rp {Number(bk.total_harga).toLocaleString('id-ID')}</p>
                      <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">{bk.package?.nama_paket || 'Reguler'}</p>
                    </div>
                  </div>
                ))}
                {recentBookings.length === 0 && (
                  <div className="p-8 text-center text-on-surface-variant text-sm italic">
                    Belum ada riwayat pemesanan.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
