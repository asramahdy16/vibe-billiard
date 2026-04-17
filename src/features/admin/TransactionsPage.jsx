import React from 'react';
import * as paymentApi from '../../api/paymentApi';
import toast from 'react-hot-toast';
import { Search, CheckCircle, Loader2 } from 'lucide-react';

const TransactionsPage = () => {
  const [payments, setPayments] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');

  const fetchPayments = async () => {
    try {
      const data = await paymentApi.adminGetAllPayments();
      setPayments(data.data);
    } catch (error) {
      toast.error('Gagal mengambil data transaksi.');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchPayments();
  }, []);

  const handleConfirm = async (id) => {
    try {
      await paymentApi.adminUpdatePaymentStatus(id, 'paid');
      toast.success('Pembayaran berhasil dikonfirmasi.');
      fetchPayments();
    } catch (error) {
      toast.error('Gagal mengonfirmasi pembayaran.');
    }
  };

  const filteredPayments = payments.filter(p => 
    p.booking?.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.booking_id.toString().includes(searchTerm)
  );

  const statsSummary = [
    { label: 'Total Transaksi', value: payments.length, color: 'text-on-surface' },
    { label: 'Lunas', value: payments.filter(p => p.status_bayar === 'paid').length, color: 'text-tertiary' },
    { label: 'Pending', value: payments.filter(p => p.status_bayar === 'unpaid').length, color: 'text-primary' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-on-surface mb-1">Transaksi</h1>
          <p className="text-on-surface-variant">Riwayat semua pembayaran booking.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant" />
          <input 
            type="text" 
            placeholder="Cari ID / Nama..." 
            className="input-field !pl-10 !py-2.5 w-64 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {statsSummary.map((s, i) => (
          <div key={i} className="card-elevated p-4 text-center">
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold mb-1">{s.label}</p>
            <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="card-elevated overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container text-on-surface-variant border-b border-outline-variant/10">
              <tr>
                {['ID', 'Pelanggan', 'Metode', 'Total', 'Status', 'Aksi'].map(h => (
                  <th key={h} className="p-4 text-[10px] font-bold uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {filteredPayments.map((t) => (
                <tr key={t.id} className="hover:bg-surface-container-low transition-colors group">
                  <td className="p-4 font-mono text-sm font-bold text-on-surface">#BK-{t.booking_id.toString().padStart(4, '0')}</td>
                  <td className="p-4 font-bold text-on-surface">{t.booking?.user?.name || 'Anonim'}</td>
                  <td className="p-4 text-sm text-on-surface-variant uppercase">{t.metode}</td>
                  <td className="p-4 font-black text-primary">Rp {Number(t.jumlah || 0).toLocaleString('id-ID')}</td>
                  <td className="p-4">
                    {t.status_bayar === 'paid' ? (
                      <span className="text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider border bg-tertiary/10 text-tertiary border-tertiary/20">
                        Lunas
                      </span>
                    ) : (
                      <span className="text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider border bg-primary/10 text-primary border-primary/20">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    {t.status_bayar === 'unpaid' && (
                      <button 
                        onClick={() => handleConfirm(t.id)}
                        className="btn-primary !px-3 !py-1.5 text-[10px] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <CheckCircle className="h-3 w-3" /> Konfirmasi
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filteredPayments.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-on-surface-variant">Tidak ada transaksi ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
