import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as bookingApi from '../../api/bookingApi';
import { CalendarCheck, ArrowRight, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const MyBookingsPage = () => {
  const [bookings, setBookings] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      const data = await bookingApi.getMyBookings();
      setBookings(data.data);
    } catch (error) {
      toast.error('Gagal mengambil riwayat pemesanan.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm('Apakah kamu yakin ingin membatalkan booking ini?')) return;
    try {
      await bookingApi.cancelBooking(id);
      toast.success('Booking berhasil dibatalkan.');
      fetchBookings();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Gagal membatalkan booking.');
    }
  };

  const getStatusBadge = (status) => {
    const config = {
      pending:     { bg: 'bg-primary/10', text: 'text-primary', border: 'border-primary/20', label: 'MENUNGGU' },
      confirmed:   { bg: 'bg-tertiary/10', text: 'text-tertiary', border: 'border-tertiary/20', label: 'DIKONFIRMASI' },
      in_progress: { bg: 'bg-secondary/10', text: 'text-secondary', border: 'border-secondary/20', label: 'BERMAIN' },
      completed:   { bg: 'bg-outline/10', text: 'text-on-surface-variant', border: 'border-outline/20', label: 'SELESAI' },
      cancelled:   { bg: 'bg-error/10', text: 'text-error', border: 'border-error/20', label: 'BATAL' },
    };
    const c = config[status] || config.pending;
    return (
      <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border ${c.bg} ${c.text} ${c.border}`}>
        {c.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-on-surface-variant font-medium">Memuat riwayat pemesanan...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 lg:p-8 py-8 pb-24 md:pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-on-surface mb-2">Riwayat Pemesanan</h1>
          <p className="text-on-surface-variant">Semua booking yang pernah kamu buat.</p>
        </div>
        <Link to="/booking" className="btn-primary flex items-center gap-2 text-sm">
          Booking Baru <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="space-y-4">
        {bookings.map((bk) => (
          <div key={bk.id} className="card-elevated p-5 md:p-6 group hover:shadow-[0_10px_30px_-10px_rgba(0,40,93,0.3)] transition-all duration-500">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-outline-variant/10 pb-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">
                  🎱
                </div>
                <div>
                  <p className="text-on-surface-variant text-xs font-mono">#BK-{bk.id.toString().padStart(6, '0')}</p>
                  <h3 className="font-bold text-xl text-on-surface">{bk.table?.nama_meja || 'Meja'}</h3>
                </div>
              </div>
              <div>{getStatusBadge(bk.status)}</div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Tanggal', value: bk.tanggal },
                { label: 'Waktu', value: `${bk.waktu_mulai} - ${bk.waktu_selesai}` },
                { label: 'Paket', value: bk.package?.nama_paket || 'Reguler' },
                { label: 'Total', value: `Rp ${Number(bk.total_harga).toLocaleString('id-ID')}`, highlight: true },
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">{item.label}</p>
                  <p className={`font-bold ${item.highlight ? 'text-primary' : 'text-on-surface'}`}>{item.value}</p>
                </div>
              ))}
            </div>

            {bk.status === 'pending' && (
              <div className="mt-4 pt-4 border-t border-outline-variant/10 flex justify-end gap-3">
                <button onClick={() => handleCancel(bk.id)} className="btn-secondary !px-4 !py-2 text-xs hover:!bg-error/10 hover:!text-error hover:!border-error/20 transition-colors">Batalkan</button>
              </div>
            )}
          </div>
        ))}

        {bookings.length === 0 && (
          <div className="glass-panel rounded-2xl border border-outline-variant/10 text-center p-16">
            <CalendarCheck className="h-16 w-16 text-on-surface-variant/30 mx-auto mb-4" />
            <p className="text-on-surface-variant mb-4 text-lg">Belum ada riwayat pemesanan.</p>
            <Link to="/booking" className="btn-primary inline-block">Mulai Booking</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
