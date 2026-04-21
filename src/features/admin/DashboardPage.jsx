import React from 'react';
import { Link } from 'react-router-dom';
import * as dashboardApi from '../../api/dashboardApi';
import * as bookingApi from '../../api/bookingApi';
import toast from 'react-hot-toast';
import { Loader2, Banknote, CalendarCheck, Clock, Users, TrendingUp, ArrowUpRight } from 'lucide-react';
import ScrollReveal from '../../components/ui/ScrollReveal';
import AnimatedCounter from '../../components/ui/AnimatedCounter';

const DashboardPage = () => {
  const [stats, setStats] = React.useState({
    total_bookings_today: 0,
    today_revenue: 0,
    tables_in_use: 0,
    pending_payments: 0
  });
  const [recentBookings, setRecentBookings] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const statsData = await dashboardApi.getDashboardStats();
        setStats(statsData.data);
        
        const bookingsData = await bookingApi.adminGetAllBookings();
        setRecentBookings(bookingsData.data.slice(0, 5));
      } catch (error) {
        toast.error('Gagal mengambil data dashboard.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statsItems = [
    { icon: <Banknote className="w-7 h-7" />, iconBg: 'bg-primary/10 text-primary', label: 'Pendapatan', value: stats.today_revenue, prefix: 'Rp ', suffix: '' },
    { icon: <CalendarCheck className="w-7 h-7" />, iconBg: 'bg-tertiary/10 text-tertiary', label: 'Booking Harian', value: stats.total_bookings_today, prefix: '', suffix: ' Psn' },
    { icon: <Clock className="w-7 h-7" />, iconBg: 'bg-primary-container/10 text-primary-container', label: 'Meja Terpakai', value: stats.tables_in_use, prefix: '', suffix: ' / 12' },
    { icon: <Users className="w-7 h-7" />, iconBg: 'bg-secondary/10 text-secondary', label: 'Tunggu Bayar', value: stats.pending_payments, prefix: '', suffix: ' Antrian' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-black tracking-tight text-on-surface mb-1">Dashboard</h1>
        <p className="text-on-surface-variant">Overview bisnis hari ini.</p>
      </div>

      {/* Stats Grid */}
      <ScrollReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {statsItems.map((stat, i) => (
          <div key={i} className="card-elevated p-5 group hover:shadow-[0_10px_30px_-10px_rgba(0,40,93,0.3)] transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/3 rounded-full blur-2xl -z-0 group-hover:bg-primary/5 transition-all"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                 <div className={`w-12 h-12 rounded-xl ${stat.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  {stat.icon}
                </div>
              </div>
              <p className="text-xs text-on-surface-variant uppercase tracking-widest font-bold mb-1">{stat.label}</p>
              <AnimatedCounter 
                value={stat.value} 
                prefix={stat.prefix} 
                suffix={stat.suffix}
                className="text-2xl font-black text-on-surface block truncate" 
              />
            </div>
          </div>
        ))}
      </ScrollReveal>

      {/* Recent Bookings Table */}
      <ScrollReveal delay={0.2} direction="up" className="card-elevated overflow-hidden">
        <div className="p-6 border-b border-outline-variant/10 flex items-center justify-between">
          <h2 className="text-xl font-bold text-on-surface">Booking Terbaru</h2>
          <Link to="/admin/transactions" className="text-primary text-sm font-bold hover:underline flex items-center gap-1">
            Lihat Semua <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container text-on-surface-variant border-b border-outline-variant/10">
              <tr>
                {['ID', 'Pelanggan', 'Meja', 'Paket', 'Total', 'Status'].map(h => (
                  <th key={h} className="p-4 text-[10px] font-bold uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {recentBookings.map((row) => (
                <tr key={row.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="p-4 font-mono text-sm text-on-surface-variant">#BK-{row.id.toString().padStart(4, '0')}</td>
                  <td className="p-4 font-bold text-on-surface">{row.user?.name || 'Anonim'}</td>
                  <td className="p-4 text-on-surface">{row.table?.nama_meja}</td>
                  <td className="p-4 text-on-surface-variant">{row.package?.nama_paket}</td>
                  <td className="p-4 font-bold text-primary">Rp {Number(row.total_harga).toLocaleString('id-ID')}</td>
                  <td className="p-4">
                    <span className={`text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-wider border
                      ${row.status === 'completed' ? 'bg-outline/10 text-on-surface-variant border-outline/20' :
                        row.status === 'confirmed' ? 'bg-tertiary/10 text-tertiary border-tertiary/20' :
                        row.status === 'in_progress' ? 'bg-secondary/10 text-secondary border-secondary/20' :
                        'bg-primary/10 text-primary border-primary/20'}`}>
                      {row.status === 'completed' ? 'Selesai' : row.status === 'confirmed' ? 'Dikonfirmasi' : row.status === 'in_progress' ? 'Bermain' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
              {recentBookings.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-on-surface-variant">Belum ada booking hari ini.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </ScrollReveal>
    </div>
  );
};

export default DashboardPage;
