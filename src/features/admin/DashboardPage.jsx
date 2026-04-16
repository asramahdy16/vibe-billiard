import React from 'react';
import { Banknote, CalendarCheck, Clock, Users, TrendingUp, ArrowUpRight } from 'lucide-react';

const DashboardPage = () => {
  const stats = [
    { icon: <Banknote className="w-7 h-7" />, iconBg: 'bg-primary/10 text-primary', label: 'Pendapatan Hari Ini', value: 'Rp 1.250.000', change: '+12%' },
    { icon: <CalendarCheck className="w-7 h-7" />, iconBg: 'bg-tertiary/10 text-tertiary', label: 'Booking Hari Ini', value: '24 Pesanan', change: '+5%' },
    { icon: <Clock className="w-7 h-7" />, iconBg: 'bg-primary-container/10 text-primary-container', label: 'Meja Terpakai', value: '6 / 10', change: '' },
    { icon: <Users className="w-7 h-7" />, iconBg: 'bg-secondary/10 text-secondary', label: 'Pelanggan Aktif', value: '128', change: '+3%' },
  ];

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-black tracking-tight text-on-surface mb-1">Dashboard</h1>
        <p className="text-on-surface-variant">Overview bisnis hari ini.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="card-elevated p-5 group hover:shadow-[0_10px_30px_-10px_rgba(0,40,93,0.3)] transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/3 rounded-full blur-2xl -z-0 group-hover:bg-primary/5 transition-all"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${stat.iconBg} flex items-center justify-center`}>
                  {stat.icon}
                </div>
                {stat.change && (
                  <span className="flex items-center gap-1 text-xs font-bold text-tertiary bg-tertiary/10 px-2 py-1 rounded-full">
                    <TrendingUp className="w-3 h-3" /> {stat.change}
                  </span>
                )}
              </div>
              <p className="text-xs text-on-surface-variant uppercase tracking-widest font-bold mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-on-surface">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Bookings Table */}
      <div className="card-elevated overflow-hidden">
        <div className="p-6 border-b border-outline-variant/10 flex items-center justify-between">
          <h2 className="text-xl font-bold text-on-surface">Booking Terbaru</h2>
          <button className="text-primary text-sm font-bold hover:underline flex items-center gap-1">
            Lihat Semua <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container text-on-surface-variant border-b border-outline-variant/10">
              <tr>
                {['ID Booking', 'Pelanggan', 'Meja', 'Paket', 'Total', 'Status'].map(h => (
                  <th key={h} className="p-4 text-[10px] font-bold uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {[
                { id: 'BK-001', customer: 'Andi Pratama', table: 'Meja 1', pkg: 'Reguler', total: 'Rp 70.000', status: 'completed' },
                { id: 'BK-002', customer: 'Budi Santoso', table: 'Meja 3', pkg: 'Hemat', total: 'Rp 50.000', status: 'confirmed' },
                { id: 'BK-003', customer: 'Citra Dewi', table: 'Meja 6', pkg: 'Reguler', total: 'Rp 105.000', status: 'pending' },
                { id: 'BK-004', customer: 'Dian Saputra', table: 'Meja 2', pkg: 'Hemat', total: 'Rp 50.000', status: 'completed' },
                { id: 'BK-005', customer: 'Eka Wijaya', table: 'Meja 1', pkg: 'Reguler', total: 'Rp 35.000', status: 'in_progress' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-surface-container-low transition-colors">
                  <td className="p-4 font-mono text-sm text-on-surface-variant">#{row.id}</td>
                  <td className="p-4 font-bold text-on-surface">{row.customer}</td>
                  <td className="p-4 text-on-surface">{row.table}</td>
                  <td className="p-4 text-on-surface-variant">{row.pkg}</td>
                  <td className="p-4 font-bold text-primary">{row.total}</td>
                  <td className="p-4">
                    <span className={`text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-wider border
                      ${row.status === 'completed' ? 'bg-outline/10 text-on-surface-variant border-outline/20' :
                        row.status === 'confirmed' ? 'bg-tertiary/10 text-tertiary border-tertiary/20' :
                        row.status === 'in_progress' ? 'bg-primary-container/10 text-primary-container border-primary-container/20' :
                        'bg-primary/10 text-primary border-primary/20'}`}>
                      {row.status === 'completed' ? 'Selesai' : row.status === 'confirmed' ? 'Dikonfirmasi' : row.status === 'in_progress' ? 'Berlangsung' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
