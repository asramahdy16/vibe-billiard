import React from 'react';
import { Search, CheckCircle } from 'lucide-react';

const mockTransactions = [
  { date: '16 Apr 2026', id: 'BK-001', customer: 'Andi Pratama', total: 'Rp 70.000', status: 'paid' },
  { date: '16 Apr 2026', id: 'BK-002', customer: 'Budi Santoso', total: 'Rp 50.000', status: 'pending' },
  { date: '16 Apr 2026', id: 'BK-003', customer: 'Citra Dewi', total: 'Rp 105.000', status: 'paid' },
  { date: '15 Apr 2026', id: 'BK-004', customer: 'Dian Saputra', total: 'Rp 50.000', status: 'pending' },
  { date: '15 Apr 2026', id: 'BK-005', customer: 'Eka Wijaya', total: 'Rp 35.000', status: 'paid' },
  { date: '14 Apr 2026', id: 'BK-006', customer: 'Fajar Ramadhan', total: 'Rp 70.000', status: 'pending' },
];

const TransactionsPage = () => {
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
          />
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Transaksi', value: '6', color: 'text-on-surface' },
          { label: 'Lunas', value: '3', color: 'text-tertiary' },
          { label: 'Pending', value: '3', color: 'text-primary' },
        ].map((s, i) => (
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
                {['Tanggal', 'ID Booking', 'Pelanggan', 'Total', 'Status', 'Aksi'].map(h => (
                  <th key={h} className="p-4 text-[10px] font-bold uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {mockTransactions.map((t, i) => (
                <tr key={i} className="hover:bg-surface-container-low transition-colors group">
                  <td className="p-4 text-sm text-on-surface-variant">{t.date}</td>
                  <td className="p-4 font-mono text-sm font-bold text-on-surface">#{t.id}</td>
                  <td className="p-4 font-bold text-on-surface">{t.customer}</td>
                  <td className="p-4 font-black text-primary">{t.total}</td>
                  <td className="p-4">
                    {t.status === 'paid' ? (
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
                    {t.status === 'pending' && (
                      <button className="btn-primary !px-3 !py-1.5 text-[10px] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <CheckCircle className="h-3 w-3" /> Konfirmasi
                      </button>
                    )}
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

export default TransactionsPage;
