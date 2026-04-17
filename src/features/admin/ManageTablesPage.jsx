import React from 'react';
import * as tableApi from '../../api/tableApi';
import toast from 'react-hot-toast';
import { Loader2, Plus, Pencil, Trash2 } from 'lucide-react';

const ManageTablesPage = () => {
  const [tables, setTables] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const fetchTables = async () => {
    try {
      const data = await tableApi.adminGetTables();
      setTables(data.data);
    } catch (error) {
      toast.error('Gagal mengambil data meja.');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchTables();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus meja ini?')) {
      try {
        await tableApi.adminDeleteTable(id);
        toast.success('Meja berhasil dihapus.');
        fetchTables();
      } catch (error) {
        toast.error('Gagal menghapus meja.');
      }
    }
  };

  const statusConfig = {
    available: { bg: 'bg-tertiary/10', text: 'text-tertiary', border: 'border-tertiary/20', label: 'Tersedia' },
    booked:    { bg: 'bg-primary/10', text: 'text-primary', border: 'border-primary/20', label: 'Dibooking' },
    in_use:    { bg: 'bg-primary-container/10', text: 'text-primary-container', border: 'border-primary-container/20', label: 'Dipakai' },
    inactive:  { bg: 'bg-outline/10', text: 'text-outline', border: 'border-outline/20', label: 'Nonaktif' },
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-on-surface mb-1">Manajemen Meja</h1>
          <p className="text-on-surface-variant">Kelola semua meja billiard.</p>
        </div>
        <button className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="h-4 w-4" /> Tambah Meja
        </button>
      </div>

      {/* Cards Grid View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tables.map(t => {
          const sc = statusConfig[t.status] || statusConfig.available;
          return (
            <div key={t.id} className="card-elevated p-5 group hover:shadow-[0_10px_30px_-10px_rgba(0,40,93,0.3)] transition-all duration-500 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute -bottom-4 -right-4 text-8xl font-black text-on-surface/3 group-hover:text-on-surface/5 transition-opacity">
                {t.nama_meja.replace('Meja ', '').replace('VIP ', 'V')}
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-xl bg-surface-container flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                    🎱
                  </div>
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider border ${sc.bg} ${sc.text} ${sc.border}`}>
                    {sc.label}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-on-surface mb-1">{t.nama_meja}</h3>
                <p className="text-sm text-on-surface-variant mb-4">ID: #{t.id}</p>

                <div className="flex gap-2">
                  <button className="flex items-center gap-1 px-3 py-2 rounded-lg bg-surface-container text-on-surface-variant hover:bg-primary/10 hover:text-primary text-xs font-bold transition-all">
                    <Pencil className="h-3 w-3" /> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(t.id)}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg bg-surface-container text-on-surface-variant hover:bg-error/10 hover:text-error text-xs font-bold transition-all"
                  >
                    <Trash2 className="h-3 w-3" /> Hapus
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ManageTablesPage;
