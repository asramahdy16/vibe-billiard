import React from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { ArrowRight, CalendarCheck, Clock, TrendingUp, Zap } from 'lucide-react';

const mockActiveBooking = {
  id: 'BK-20260416-007',
  table: 'Meja 3',
  date: '16 April 2026',
  time: '19:00 - 21:00',
  package: 'Paket Reguler',
  status: 'confirmed',
};

const mockRecentBookings = [
  { id: 'BK-20260415-052', table: 'Meja 1', date: '15 Apr 2026', time: '10:00 - 12:00', package: 'Paket Hemat', total: 'Rp 50.000', status: 'completed' },
  { id: 'BK-20260414-033', table: 'Meja 6', date: '14 Apr 2026', time: '19:00 - 22:00', package: 'Paket Reguler', total: 'Rp 105.000', status: 'completed' },
  { id: 'BK-20260412-021', table: 'Meja 2', date: '12 Apr 2026', time: '14:00 - 16:00', package: 'Paket Reguler', total: 'Rp 70.000', status: 'completed' },
];

const UserDashboard = () => {
  const { user } = useAuthStore();

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
          {mockActiveBooking ? (
            <div className="card-elevated p-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-tertiary to-tertiary-container"></div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider border bg-tertiary/10 text-tertiary border-tertiary/20">
                  Dikonfirmasi
                </span>
                <span className="text-xs font-mono text-on-surface-variant">#{mockActiveBooking.id}</span>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-2xl">🎱</div>
                <div>
                  <p className="font-bold text-lg text-on-surface">{mockActiveBooking.table}</p>
                  <p className="text-sm text-on-surface-variant">{mockActiveBooking.package}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Tanggal</p>
                  <p className="text-sm font-bold text-on-surface">{mockActiveBooking.date}</p>
                </div>
                <div>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Waktu</p>
                  <p className="text-sm font-bold text-on-surface">{mockActiveBooking.time}</p>
                </div>
              </div>
              <div className="pt-3 border-t border-outline-variant/10">
                <p className="text-xs text-on-surface-variant text-center">Tunjukkan tiket ini ke kasir saat datang</p>
              </div>
            </div>
          ) : (
            <div className="card-elevated p-8 text-center">
              <CalendarCheck className="w-12 h-12 text-on-surface-variant/20 mx-auto mb-3" />
              <p className="text-on-surface-variant text-sm">Tidak ada booking aktif.</p>
              <Link to="/booking" className="btn-primary inline-block mt-4 !px-6 !py-2 text-sm">Booking Sekarang</Link>
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
                { label: 'Total Booking', value: '12', icon: <CalendarCheck className="w-5 h-5" />, color: 'primary' },
                { label: 'Jam Bermain', value: '28 jam', icon: <Clock className="w-5 h-5" />, color: 'tertiary' },
                { label: 'Total Bayar', value: 'Rp 840K', icon: <TrendingUp className="w-5 h-5" />, color: 'secondary' },
              ].map((s, i) => (
                <div key={i} className="card-elevated p-4 text-center">
                  <div className={`w-10 h-10 rounded-xl bg-${s.color}/10 text-${s.color} flex items-center justify-center mx-auto mb-2`}>
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
                {mockRecentBookings.map((bk, i) => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-lg">🎱</div>
                      <div>
                        <p className="font-bold text-sm text-on-surface">{bk.table}</p>
                        <p className="text-xs text-on-surface-variant">{bk.date} · {bk.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm text-primary">{bk.total}</p>
                      <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">{bk.package}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
