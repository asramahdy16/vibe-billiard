import React from 'react';
import * as bookingApi from '../../api/bookingApi';
import toast from 'react-hot-toast';
import { Search, Loader2, ChevronDown, CalendarCheck, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import ScrollReveal from '../../components/ui/ScrollReveal';
import AnimatedCounter from '../../components/ui/AnimatedCounter';

const STATUS_CONFIG = {
  pending: { label: 'Pending', color: 'bg-primary/10 text-primary border-primary/20', icon: <AlertCircle className="w-3 h-3" /> },
  confirmed: { label: 'Dikonfirmasi', color: 'bg-tertiary/10 text-tertiary border-tertiary/20', icon: <CalendarCheck className="w-3 h-3" /> },
  in_progress: { label: 'Bermain', color: 'bg-secondary/10 text-secondary border-secondary/20', icon: <Clock className="w-3 h-3" /> },
  completed: { label: 'Selesai', color: 'bg-outline/10 text-on-surface-variant border-outline/20', icon: <CheckCircle2 className="w-3 h-3" /> },
  cancelled: { label: 'Dibatalkan', color: 'bg-error/10 text-error border-error/20', icon: <XCircle className="w-3 h-3" /> },
};

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Dikonfirmasi' },
  { value: 'in_progress', label: 'Bermain' },
  { value: 'completed', label: 'Selesai' },
  { value: 'cancelled', label: 'Dibatalkan' },
];

const ManageBookingsPage = () => {
  const [bookings, setBookings] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [updatingId, setUpdatingId] = React.useState(null);
  const [filterStatus, setFilterStatus] = React.useState('all');

  const fetchBookings = async () => {
    try {
      const data = await bookingApi.adminGetAllBookings();
      setBookings(data.data);
    } catch (error) {
      toast.error('Gagal mengambil data booking.');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      await bookingApi.adminUpdateBookingStatus(id, newStatus);
      toast.success('Status booking berhasil diubah.');
      fetchBookings();
    } catch (error) {
      const msg = error.response?.data?.message || 'Gagal mengubah status booking.';
      toast.error(msg);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredBookings = bookings.filter(b => {
    const matchSearch =
      (b.user?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.id.toString().includes(searchTerm) ||
      (b.table?.nama_meja || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'all' || b.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const statsSummary = [
    { label: 'Total Booking', value: bookings.length, color: 'text-on-surface' },
    { label: 'Pending', value: bookings.filter(b => b.status === 'pending').length, color: 'text-primary' },
    { label: 'Dikonfirmasi', value: bookings.filter(b => b.status === 'confirmed').length, color: 'text-tertiary' },
    { label: 'Bermain', value: bookings.filter(b => b.status === 'in_progress').length, color: 'text-secondary' },
    { label: 'Selesai', value: bookings.filter(b => b.status === 'completed').length, color: 'text-on-surface-variant' },
  ];

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return '-';
    return timeStr.substring(0, 5); // "08:00:00" -> "08:00"
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-on-surface mb-1">Kelola Booking</h1>
          <p className="text-on-surface-variant">Kelola dan ubah status booking pelanggan.</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Status Filter */}
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input-field !py-2.5 !pr-8 text-sm appearance-none cursor-pointer"
            >
              <option value="all">Semua Status</option>
              {STATUS_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant pointer-events-none" />
          </div>
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant" />
            <input
              type="text"
              placeholder="Cari ID / Nama / Meja..."
              className="input-field !pl-10 !py-2.5 w-64 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <ScrollReveal className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
        {statsSummary.map((s, i) => (
          <div key={i} className="card-elevated p-4 text-center">
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold mb-1">{s.label}</p>
            <AnimatedCounter value={s.value} className={`text-3xl font-black ${s.color}`} />
          </div>
        ))}
      </ScrollReveal>

      {/* Table */}
      <ScrollReveal delay={0.2} direction="up" className="card-elevated overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container text-on-surface-variant border-b border-outline-variant/10">
              <tr>
                {['ID', 'Pelanggan', 'Meja', 'Paket', 'Tanggal', 'Waktu', 'Total', 'Status', 'Ubah Status'].map(h => (
                  <th key={h} className="p-4 text-[10px] font-bold uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {filteredBookings.map((b) => {
                const statusCfg = STATUS_CONFIG[b.status] || STATUS_CONFIG.pending;
                const isUpdating = updatingId === b.id;

                return (
                  <tr key={b.id} className="hover:bg-surface-container-low transition-colors group">
                    <td className="p-4 font-mono text-sm font-bold text-on-surface">
                      #BK-{b.id.toString().padStart(4, '0')}
                    </td>
                    <td className="p-4 font-bold text-on-surface">{b.user?.name || 'Anonim'}</td>
                    <td className="p-4 text-on-surface">{b.table?.nama_meja || '-'}</td>
                    <td className="p-4 text-on-surface-variant text-sm">{b.package?.nama_paket || '-'}</td>
                    <td className="p-4 text-sm text-on-surface">{formatDate(b.tanggal)}</td>
                    <td className="p-4 text-sm text-on-surface-variant whitespace-nowrap">
                      {formatTime(b.waktu_mulai)} - {formatTime(b.waktu_selesai)}
                    </td>
                    <td className="p-4 font-black text-primary">
                      Rp {Number(b.total_harga || 0).toLocaleString('id-ID')}
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider border ${statusCfg.color}`}>
                        {statusCfg.icon}
                        {statusCfg.label}
                      </span>
                    </td>
                    <td className="p-4">
                      {isUpdating ? (
                        <Loader2 className="w-5 h-5 animate-spin text-primary" />
                      ) : (
                        <div className="relative">
                          <select
                            value={b.status}
                            onChange={(e) => handleStatusChange(b.id, e.target.value)}
                            className="input-field !py-1.5 !px-2.5 !pr-7 text-xs font-bold appearance-none cursor-pointer min-w-[130px]"
                            disabled={b.status === 'completed' || b.status === 'cancelled'}
                          >
                            {STATUS_OPTIONS.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-on-surface-variant pointer-events-none" />
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan="9" className="p-8 text-center text-on-surface-variant">
                    Tidak ada booking ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </ScrollReveal>
    </div>
  );
};

export default ManageBookingsPage;
