import React, { useState, useEffect } from 'react';
import * as tableApi from '../../api/tableApi';
import toast from 'react-hot-toast';
import { Loader2, Plus, Pencil, Trash2, X } from 'lucide-react';
import ScrollReveal from '../../components/ui/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';

const ManageTablesPage = () => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nama_meja: '',
    status: 'available'
  });
  const [submitting, setSubmitting] = useState(false);

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

  useEffect(() => {
    fetchTables();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ nama_meja: '', status: 'available' });
    setIsModalOpen(true);
  };

  const openEditModal = (table) => {
    setEditingId(table.id);
    setFormData({ nama_meja: table.nama_meja, status: table.status });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nama_meja) {
      toast.error('Nama meja harus diisi');
      return;
    }

    setSubmitting(true);
    try {
      if (editingId) {
        await tableApi.adminUpdateTable(editingId, formData);
        toast.success('Meja berhasil diupdate');
      } else {
        await tableApi.adminCreateTable(formData);
        toast.success('Meja berhasil ditambahkan');
      }
      closeModal();
      fetchTables();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Terjadi kesalahan sistem');
    } finally {
      setSubmitting(false);
    }
  };

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
    <div className="p-6 md:p-8 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-on-surface mb-1">Manajemen Meja</h1>
          <p className="text-on-surface-variant">Kelola semua meja billiard.</p>
        </div>
        <button onClick={openAddModal} className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="h-4 w-4" /> Tambah Meja
        </button>
      </div>

      {/* Cards Grid View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
        {tables.map((t, idx) => {
          const sc = statusConfig[t.status] || statusConfig.available;
          return (
            <ScrollReveal delay={idx * 0.05} key={t.id} className="card-elevated p-5 group hover:shadow-[0_10px_30px_-10px_rgba(0,40,93,0.3)] transition-all duration-500 relative overflow-hidden flex flex-col h-full">
              {/* Background decoration */}
              <div className="absolute -bottom-4 -right-4 text-8xl font-black text-on-surface/3 group-hover:text-on-surface/5 transition-opacity pointer-events-none">
                {t.nama_meja.replace('Meja ', '').replace('VIP ', 'V')}
              </div>
              
              <div className="relative z-10 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-xl bg-surface-container flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-sm">
                    🎱
                  </div>
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider border shadow-sm ${sc.bg} ${sc.text} ${sc.border}`}>
                    {sc.label}
                  </span>
                </div>

                <div className="mb-4">
                  <h3 className="text-xl font-bold text-on-surface mb-1">{t.nama_meja}</h3>
                  <p className="text-sm text-on-surface-variant font-mono">ID: #{t.id.toString().padStart(3, '0')}</p>
                </div>

                <div className="flex gap-2 mt-auto">
                  <button onClick={() => openEditModal(t)} className="flex items-center justify-center flex-1 gap-1 px-3 py-2.5 rounded-lg bg-surface-container text-on-surface hover:bg-primary/10 hover:text-primary text-xs font-bold transition-all shadow-sm">
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(t.id)}
                    className="flex items-center justify-center bg-surface-container hover:bg-error/10 hover:text-error text-on-surface-variant px-3 py-2.5 rounded-lg transition-all shadow-sm"
                    title="Hapus Meja"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          );
        })}

        {tables.length === 0 && (
          <div className="col-span-full py-12 text-center text-on-surface-variant border border-dashed border-outline-variant/30 rounded-2xl">
            <p>Belum ada data meja.</p>
          </div>
        )}
      </div>

      {/* Modal / Dialog */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={closeModal}></motion.div>
            <motion.div initial={{opacity:0, scale:0.95, y:20}} animate={{opacity:1, scale:1, y:0}} exit={{opacity:0, scale:0.95, y:20}} className="relative w-full max-w-md card-elevated p-6 shadow-[0_20px_60px_-15px_rgba(0,40,93,0.3)]">
              <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-on-surface">
                {editingId ? 'Edit Meja' : 'Tambah Meja Baru'}
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Nama Meja</label>
                <input 
                  type="text" 
                  className="input-field"
                  placeholder="Contoh: Meja 01, Meja VIP"
                  value={formData.nama_meja}
                  onChange={(e) => setFormData({...formData, nama_meja: e.target.value})}
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Status Default</label>
                <select 
                  className="input-field"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="available">Tersedia (Available)</option>
                  <option value="inactive">Nonaktif (Inactive / Perbaikan)</option>
                </select>
                <p className="mt-2 text-xs text-on-surface-variant leading-relaxed">
                  Catatan: Status Dibooking atau Dipakai dikelola secara otomatis oleh sistem berdasarkan jadwal.
                </p>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={closeModal} className="btn-secondary flex-1">Batal</button>
                <button type="submit" disabled={submitting} className="btn-primary flex-1">
                  {submitting ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageTablesPage;
